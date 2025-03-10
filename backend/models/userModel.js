const db = require("../config/db");

// ✅ Create a new user
const createUser = async (name, email, hashedPassword) => {
  return await db("users").insert({ name, email, password: hashedPassword }).returning(["id", "name", "email"]);
};

// ✅ Get user by ID
const getUserById = async (id) => {
  return await db("users").where({ id }).first();
};

// ✅ Get user by email
const getUserByEmail = async (email) => {
  return await db("users").where({ email }).first();
};

// ✅ Update user details
const updateUser = async (id, name, email) => {
  const result = await db("users")
    .where({ id })
    .update({ name, email })
    .returning(["id", "name", "email"]);
  return result.length ? result[0] : null;
};

// ✅ Delete a user
const deleteUser = async (id) => {
  return await db("users").where({ id }).del();
};

module.exports = { createUser, getUserById, getUserByEmail, updateUser, deleteUser };
