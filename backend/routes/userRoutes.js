const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { getUserById, getUserByEmail, updateUser, deleteUser, createUser } = require("../models/userModel");

const router = express.Router();

// ✅ Create a new user (For testing purposes, not for real registration)
router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await createUser(name, email, password);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user profile by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get user by email
router.get("/email/:email", authMiddleware, async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update user profile
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await updateUser(req.params.id, name, email);
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete user account
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
