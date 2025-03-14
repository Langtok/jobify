const db = require("../config/db");

// ✅ Create a new user (Ensuring timestamps are set)
const createUser = async (name, email, hashedPassword) => {
  try {
    const [user] = await db("users")
      .insert({
        name,
        email,
        encrypted_password: hashedPassword, // ✅ Use encrypted_password column
        created_at: new Date(),  // ✅ Ensure timestamps are set
        updated_at: new Date()
      })
      .returning(["id", "name", "email", "created_at"]);

    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database error while creating user");
  }
};

// ✅ Get user by ID (Exclude password for security)
const getUserById = async (id) => {
  try {
    const user = await db("users")
      .where({ id })
      .select("id", "name", "email")
      .first();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Database error while fetching user by ID");
  }
};

// ✅ Get user by email (Include encrypted_password for authentication)
const getUserByEmail = async (email) => {
  try {
    const user = await db("users")
      .where({ email })
      .select("id", "name", "email", "encrypted_password as password")
      .first();
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Database error while fetching user by email");
  }
};

// ✅ Update user details (Ensure proper return structure)
const updateUser = async (id, name, email) => {
  try {
    const [updatedUser] = await db("users")
      .where({ id })
      .update({ name, email, updated_at: new Date() }) // ✅ Update timestamp
      .returning(["id", "name", "email"]);
    return updatedUser || null;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Database error while updating user");
  }
};

// ✅ Delete a user (Return confirmation message)
const deleteUser = async (id) => {
  try {
    const deleted = await db("users").where({ id }).del();
    return deleted ? { message: "User deleted successfully" } : null;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Database error while deleting user");
  }
};

module.exports = { createUser, getUserById, getUserByEmail, updateUser, deleteUser };
