import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function JobApplications() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState(""); // ✅ Filter
  const [sortOrder, setSortOrder] = useState("desc"); // ✅ Sorting
  const router = useRouter();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const storedApplications = JSON.parse(localStorage.getItem("applications")) || [];
    setJobs(storedApplications);
    setLoading(false);
  };

  // ✅ Apply filters
  const filteredJobs = jobs
    .filter((job) => (filterStatus ? job.status === filterStatus : true))
    .sort((a, b) => (sortOrder === "desc" ? new Date(b.appliedDate) - new Date(a.appliedDate) : new Date(a.appliedDate) - new Date(b.appliedDate)));

  if (loading) return <p className="text-center mt-10 text-lg">Loading applications...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Job Applications</h1>

      {/* ✅ Filters & Sorting */}
      <div className="flex space-x-4 mb-6">
        <select
          className="p-3 border rounded-md bg-white text-gray-900"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview Scheduled">Interview Scheduled</option>
          <option value="Offer Received">Offer Received</option>
          <option value="Rejected">Rejected</option>
        </select>

        <select
          className="p-3 border rounded-md bg-white text-gray-900"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="text-gray-600 text-lg">No job applications found.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
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
