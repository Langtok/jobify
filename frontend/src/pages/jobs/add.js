import { useState } from "react";
import { useRouter } from "next/router";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: Please log in to add a job.");

      const response = await fetch("https://jobify-gj12.onrender.com/api/jobs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, company, status, appliedDate, notes }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add job");

      alert("✅ Job added successfully!");
      router.push("/list");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Job</h2>

        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Job Title */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              placeholder="Enter job title"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Company</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          {/* Applied Date */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Applied Date</label>
            <input
              type="date"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={appliedDate}
              onChange={(e) => setAppliedDate(e.target.value)}
              required
            />
          </div>

          {/* Status Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Status</label>
            <select
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Applied">Applied</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Offer Received">Offer Received</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Notes</label>
            <textarea
              placeholder="Additional notes (optional)"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg rounded-md hover:bg-blue-700 transition"
          >
            Add Job
          </button>
        </form>

        {/* Back to Jobs */}
        <button
          onClick={() => router.push("/jobs")}
          className="w-full mt-4 bg-gray-600 text-white py-3 text-lg rounded-md hover:bg-gray-700 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
