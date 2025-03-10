const db = require("../config/db");

// ✅ Create a new job application
const addJobApplication = async (userId, title, company, status, appliedDate, notes) => {
  return await db("jobs").insert({ user_id: userId, title, company, status, applied_date: appliedDate, notes }).returning("*");
};

// ✅ Get all jobs for a user
const getJobsByUser = async (userId) => {
  return await db("jobs").where({ user_id: userId }).orderBy("applied_date", "desc");
};

// ✅ Get a job by ID
const getJobById = async (id) => {
  return await db("jobs").where({ id }).first();
};

// ✅ Update a job application
const updateJobApplication = async (id, status, notes) => {
  const result = await db("jobs").where({ id }).update({ status, notes }).returning("*");
  return result.length ? result[0] : null;
};

// ✅ Delete a job application
const deleteJob = async (id) => {
  return await db("jobs").where({ id }).del();
};

module.exports = { addJobApplication, getJobsByUser, getJobById, updateJobApplication, deleteJob };
