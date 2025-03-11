import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedSavedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedSavedJobs);
  }, []);

  // ✅ Remove job from saved list
  const handleRemove = (id) => {
    if (confirm("Are you sure you want to remove this job from your saved list?")) {
      const updatedSavedJobs = savedJobs.filter(job => job.id !== id);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setSavedJobs(updatedSavedJobs);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No saved jobs yet.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {savedJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800">{job.title}</h2>
              <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
              <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>

              <div className="flex space-x-4 mt-4">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleRemove(job.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
