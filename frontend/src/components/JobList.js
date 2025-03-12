import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("https://jobify-gj12.onrender.com/api/jobs/recommendations"); // ✅ Replace with actual API
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Get match score color based on percentage
  const getScoreColor = (score) => {
    if (score >= 80) return "bg-green-500"; // High match
    if (score >= 50) return "bg-yellow-500"; // Medium match
    return "bg-red-500"; // Low match
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading job recommendations...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Recommended Jobs</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No job recommendations available.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition cursor-pointer"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>

              {/* ✅ Match Score Visualization */}
              <div className="mt-4">
                <p className="text-gray-700"><strong>Match Score:</strong> {job.matchScore}%</p>
                <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
                  <div
                    className={`h-full rounded-full ${getScoreColor(job.matchScore)}`}
                    style={{ width: `${job.matchScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
