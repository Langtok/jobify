import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function EditJob() {
  const router = useRouter();
  const { id } = router.query; // Get job ID from URL
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!response.ok) throw new Error("Failed to fetch job details");

        const data = await response.json();
        setTitle(data.title);
        setCompany(data.company);
        setStatus(data.status);
        setAppliedDate(data.applied_date);
        setNotes(data.notes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:5000/api/jobs/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, company, status, appliedDate, notes }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update job");

      router.push("/jobs"); // Redirect back to job listings
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading job details...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Job</h2>

        {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Editable Fields */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Job Title</label>
            <input
              type="text"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">Company</label>
            <input
              type="text"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

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

          <div>
            <label className="block text-lg font-medium text-gray-700">Notes</label>
            <textarea
              placeholder="Additional notes (optional)"
              className="w-full p-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 text-lg rounded-md hover:bg-blue-700 transition"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}
