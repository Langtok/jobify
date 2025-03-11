import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [resumeFeedback, setResumeFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchJobs();
    fetchRecommendations();
    fetchResumeFeedback();
  }, []);

  // ✅ Fetch Tracked Job Applications
  const fetchJobs = async () => {
    try {
      const response = await fetch("/mockJobs.json"); // Mock job applications
      if (!response.ok) throw new Error("Failed to fetch jobs");

      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Job Recommendations
  const fetchRecommendations = async () => {
    try {
      const response = await fetch("/mockJobs.json"); // Mock recommendations
      if (!response.ok) throw new Error("Failed to fetch recommendations");

      const data = await response.json();
      setRecommendations(data.slice(0, 3)); // Show top 3 recommendations
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // ✅ Fetch Resume Feedback
  const fetchResumeFeedback = async () => {
    const sampleFeedback = [
      "✔ Use more action verbs.",
      "✔ Format bullet points better.",
      "✔ Include industry-specific keywords.",
      "✔ Use a clear font and structure.",
      "✔ Keep it within 1-2 pages."
    ];
    setResumeFeedback(sampleFeedback.slice(0, 3));
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading dashboard...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-6 md:px-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">📊 Job Tracker Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        
        {/* ✅ Tracked Job Applications */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📌 Tracked Applications</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-600 text-lg">No job applications yet.</p>
          ) : (
            <div className="space-y-3">
              {jobs.map((job) => (
                <div key={job.id} className="p-3 rounded-lg bg-gray-100 shadow-sm">
                  <p className="text-lg font-medium text-gray-800">{job.title}</p>
                  <p className="text-sm text-gray-600">📍 {job.company} • 🏷 {job.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Resume Feedback Section */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">📄 Resume Feedback</h2>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            {resumeFeedback.map((feedback, index) => (
              <li key={index} className="text-lg">{feedback}</li>
            ))}
          </ul>
        </div>

        {/* ✅ Job Recommendations */}
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">💼 Recommended Jobs</h2>
          {recommendations.length === 0 ? (
            <p className="text-gray-600 text-lg">No recommendations available.</p>
          ) : (
            <div className="space-y-3">
              {recommendations.map((job) => (
                <div
                  key={job.id}
                  className="p-3 rounded-lg bg-gray-100 shadow-sm cursor-pointer hover:bg-gray-200 transition"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                >
                  <p className="text-lg font-medium text-gray-800">{job.title}</p>
                  <p className="text-sm text-gray-600">🏢 {job.company} • 🎯 {job.matchScore}% Match</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
