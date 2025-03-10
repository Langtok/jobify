const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { addJobApplication, getJobsByUser, getJobById, updateJobApplication, deleteJob } = require("../models/jobModel");

const router = express.Router();

// ✅ Create a new job application
router.post("/add", authMiddleware, async (req, res) => {
  const { title, company, status, appliedDate, notes } = req.body;
  try {
    const job = await addJobApplication(req.user.userId, title, company, status, appliedDate, notes);
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all jobs for a user
router.get("/my-jobs", authMiddleware, async (req, res) => {
  try {
    const jobs = await getJobsByUser(req.user.userId);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get a job by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a job application
router.put("/update/:id", authMiddleware, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const updatedJob = await updateJobApplication(req.params.id, status, notes);
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.json(updatedJob);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a job application
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await deleteJob(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Job not found" });
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
