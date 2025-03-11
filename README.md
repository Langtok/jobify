AI-Powered Job Application Tracker 🚀
A full-stack web application to help users track their job applications, receive AI-generated resume feedback, and get job recommendations.

📌 Features
1️⃣ User Authentication (JWT-based)
✔ Register, login, and logout functionality
✔ Secure JWT-based authentication
✔ Protected routes for job applications

2️⃣ Job Application Tracking
✔ Users can add, edit, and delete job applications
✔ Status tracking: Applied, Interview Scheduled, Offer Received, Rejected
✔ Save jobs for later

3️⃣ AI Resume Feedback (Mock API)
✔ Mock API generates resume improvement suggestions
✔ Simulates machine learning API response

4️⃣ Job Recommendations (Mock API / Job Board API)
✔ Fetches job listings based on user skills
✔ Displays job match scores (0-100%)

5️⃣ Clean & Responsive UI
✔ Built with Next.js & Tailwind CSS
✔ Fully responsive and mobile-friendly

🛠️ Tech Stack
Frontend:
Next.js (React Framework)
Tailwind CSS (Styling)
React Router (Navigation)
Backend:
Node.js + Express.js
JWT Authentication
MongoDB / PostgreSQL
🚀 Getting Started
1️⃣ Clone the Repository

$> git clone https://github.com/your-username/job-tracker.git
$> cd job-tracker
2️⃣ Install Dependencies

$> npm install  # Install backend dependencies
$> cd frontend && npm install  # Install frontend dependencies
3️⃣ Setup Environment Variables
Create a .env file in the backend root directory:

PORT=5000
MONGO_URI=your_database_url
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
Create a .env.local file in the frontend directory:

NEXT_PUBLIC_API_URL=http://localhost:5000/api
4️⃣ Start the Backend Server and Frontend

$> cd frontend
$> npm run dev
Backend runs at http://localhost:5000
Frontend runs at http://localhost:3000

📌 API Endpoints
1️⃣ Authentication
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT
2️⃣ Job Applications
Method	Endpoint	Description
POST	/api/jobs/add	Add a new job application
GET	/api/jobs/my-jobs	Get all jobs for logged-in user
GET	/api/jobs/:id	Get job details by ID
PUT	/api/jobs/update/:id	Update a job application
DELETE	/api/jobs/delete/:id	Delete a job application
3️⃣ Resume Feedback (Mock API)
Method	Endpoint	Description
POST	/api/resume/analyze	Get AI-powered feedback


🚀 Deployment
Frontend: Vercel (https://your-project.vercel.app)
Backend: Render/Heroku (https://your-api-url.com)
Database: MongoDB Atlas / PostgreSQL
📜 License
This project is MIT Licensed. Feel free to use and modify it.

👨‍💻 Author
Your Name

GitHub: @langtok