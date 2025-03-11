const express = require("express"); 
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes"); // ✅ Add this!
require("dotenv").config();

const app = express();

// ✅ Proper CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend requests
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Allow authentication headers
}));

app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/resume", resumeRoutes); // ✅ Register Resume API

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
