const express = require("express");
const router = express.Router();

// ✅ Mock AI Resume Feedback API
router.post("/analyze", async (req, res) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required." });
    }

    // ✅ Simulated AI suggestions
    const suggestions = [
      "Use more action verbs",
      "Format bullet points better",
      "Include industry keywords",
      "Use a clear font and structure",
      "Keep it within 1-2 pages"
    ];

    const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 3);

    res.json({ message: "Resume analyzed successfully", suggestions: randomSuggestions });
  } catch (error) {
    console.error("Error processing resume:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
