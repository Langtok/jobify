const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv"); // Load environment variables
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config(); // Load environment variables from .env

const app = express();

// ✅ Dynamic CORS configuration
const allowedOrigins = [
  "http://localhost:3000",
  "https://jobify-u8po.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.json({ message: "🚀 Jobify API is running successfully!" });
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
