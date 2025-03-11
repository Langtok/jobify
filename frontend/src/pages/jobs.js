import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("/mockJobs.json"); // ✅ Always fetch fresh data
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();

      // ✅ Save new data in localStorage
      localStorage.setItem("jobs", JSON.stringify(data));
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading job applications...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Job Listings</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No job applications available.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition hover:shadow-xl cursor-pointer"
              onClick={() => router.push(`/jobs/${job.id}`)}
            >
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
              <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>

              {/* ✅ Match Score */}
              <div className="mt-4 flex items-center">
                <span className={`px-3 py-1 text-white text-sm font-bold rounded-full ${job.matchScore >= 80 ? "bg-green-600" : job.matchScore >= 50 ? "bg-yellow-500" : "bg-red-500"}`}>
                  Match Score: {job.matchScore}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
