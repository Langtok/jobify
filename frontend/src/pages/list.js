import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchJobsFromDB();
  }, []);

  const fetchJobsFromDB = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in.");
  
      const response = await fetch("https://jobify-gj12.onrender.com/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch job applications: ${errorMessage}`);
      }
  
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  if (loading) return <p className="text-center mt-10 text-lg">Loading applications...</p>;
  if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Job Applications</h1>

      {jobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No job applications found.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 cursor-pointer hover:shadow-xl transition"
              onClick={() => router.push(`/jobs/view/${job.id}`)} // ✅ Redirect to new job details page
            >
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600"><strong>Status:</strong> {job.status}</p>
              <p className="text-gray-600"><strong>Applied Date:</strong> {job.appliedDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
