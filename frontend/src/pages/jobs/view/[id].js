import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";

export default function JobView() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Wrap fetchJobDetails in useCallback to fix the warning
  const fetchJobDetails = useCallback(async () => {
    try {
      if (!id) return;

      const token = localStorage.getItem("token"); // ✅ Fetch user token for authentication
      if (!token) throw new Error("Unauthorized: Please log in.");

      const response = await fetch(`https://jobify-gj12.onrender.com/api/jobs/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch job details.");

      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.error("Error fetching job details:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]); // ✅ id is now a dependency for fetchJobDetails

  // ✅ Now, useEffect won't trigger unnecessary re-renders
  useEffect(() => {
    fetchJobDetails();
  }, [fetchJobDetails]);

  // ✅ Handle Delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in.");

      const response = await fetch(`https://jobify-gj12.onrender.com/api/jobs/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ensure authentication
        },
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Delete Error:", data);
        throw new Error(data.message || "Failed to delete job.");
      }

      alert("✅ Job application deleted successfully.");
      router.push("/list"); // ✅ Redirect after deletion
    } catch (error) {
      console.error("Delete Job Error:", error);
      alert(`❌ ${error.message}`);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading job details...</p>;
  if (error) return <p className="text-center mt-10 text-lg text-red-500">{error}</p>;
  if (!job) return <p className="text-center mt-10 text-lg">Job not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-gray-600"><strong>Company:</strong> {job.company}</p>
        <p className="text-gray-600"><strong>Status:</strong> {job.status}</p>
        <p className="text-gray-600"><strong>Applied Date:</strong> {job.appliedDate}</p>

        {/* ✅ Delete Button */}
        <button
          className="mt-6 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition w-full"
          onClick={handleDelete}
        >
          Delete Job
        </button>

        <button
          className="mt-4 bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition w-full"
          onClick={() => router.push("/list")}
        >
          Back to Applications
        </button>
      </div>
    </div>
  );
}
