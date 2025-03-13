const express = require("express");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");
const { 
  getUserById, 
  getUserByEmail, 
  updateUser, 
  deleteUser, 
  createUser 
} = require("../models/userModel");

const router = express.Router();

// ✅ Create a new user (For testing, should not be exposed in production)
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await createUser(name, email, hashedPassword);
    res.status(201).json({ 
      message: "User created successfully", 
      user: { id: newUser.id, name: newUser.name, email: newUser.email } 
    });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get user profile by ID (Protected)
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ message: "Unauthorized access." });
    }

    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Get user by email (Protected)
router.get("/email/:email", authMiddleware, async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ id: user.id, name: user.name, email: user.email });
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Update user profile (Protected)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (req.user.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ message: "Unauthorized update request." });
    }

    const updatedUser = await updateUser(req.params.id, name, email);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ✅ Delete user account (Protected)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ message: "Unauthorized delete request." });
    }

    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
