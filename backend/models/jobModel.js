const db = require("../config/db");

// ✅ Fetch all jobs
const getAllJobs = async () => {
  return await db("jobs").select("*").orderBy("applied_date", "desc");
};

// ✅ Fetch jobs for a specific user
const getJobsByUser = async (userId) => {
  return await db("jobs").where({ user_id: userId }).orderBy("applied_date", "desc");
};

// ✅ Fetch a single job by ID
const getJobById = async (id) => {
  return await db("jobs").where({ id }).first();
};

// ✅ Create a new job application
const addJobApplication = async (userId, title, company, status, appliedDate, notes) => {
  return await db("jobs").insert({ user_id: userId, title, company, status, applied_date: appliedDate, notes }).returning("*");
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

module.exports = { getAllJobs, getJobsByUser, getJobById, addJobApplication, updateJobApplication, deleteJob };
