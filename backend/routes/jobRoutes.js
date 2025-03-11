const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  addJobApplication,
  getJobsByUser,
  getJobById,
  updateJobApplication,
  deleteJob
} = require("../models/jobModel");

const router = express.Router();

// ✅ Create a job application
router.post("/add", authMiddleware, async (req, res) => {
  const { title, company, status, appliedDate, notes } = req.body;
  if (!title || !company || !status) {
    return res.status(400).json({ message: "Title, company, and status are required." });
  }

  try {
    const job = await addJobApplication(req.user.userId, title, company, status, appliedDate, notes);
    res.status(201).json({ message: "Job added successfully", job });
  } catch (err) {
    console.error("Error adding job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all jobs for a user
router.get("/my-jobs", authMiddleware, async (req, res) => {
  try {
    const jobs = await getJobsByUser(req.user.userId);
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err);
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
    console.error("Error fetching job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update a job application
router.put("/update/:id", authMiddleware, async (req, res) => {
  const { title, company, status, appliedDate, notes } = req.body;

  try {
    const job = await getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user_id !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized update request" });
    }

    const updatedJob = await updateJobApplication(req.params.id, title, company, status, appliedDate, notes);
    res.json({ message: "Job updated successfully", job: updatedJob });
  } catch (err) {
    console.error("Error updating job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Delete a job application
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const job = await getJobById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.user_id !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized delete request" });
    }

    await deleteJob(req.params.id);
    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all job applications (Public)
router.get("/", async (req, res) => {
  try {
    const jobs = await getJobsByUser(); // Modify this function to fetch all jobs, not just user-specific ones
    res.json(jobs);
  } catch (err) {
    console.error("Error fetching all jobs:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
