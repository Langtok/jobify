import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Mock user skills (Can be dynamic in the future)
  const userSkills = ["React", "JavaScript", "Tailwind CSS"]; 

  useEffect(() => {
    if (id) {
      fetchJobDetails();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const foundJob = storedJobs.find((j) => j.id === parseInt(id));

      if (!foundJob) throw new Error("Job not found");
      setJob(foundJob);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Apply Now (Checks for missing skills)
  const handleApply = () => {
    if (!job) return;

    const missingSkills = job.requiredSkills.filter(skill => !userSkills.includes(skill));

    if (missingSkills.length > 0) {
      alert(`You are missing some skills for this job:\n${missingSkills.join(", ")}\nConsider upskilling!`);
    } else {
      alert("✅ Application submitted successfully! (Mock action)");
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading job details...</p>;
  if (!job) return <p className="text-center mt-10 text-lg">Job not found</p>;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-gray-600 text-lg mt-2"><strong>Company:</strong> {job.company}</p>
        <p className="text-gray-600"><strong>Location:</strong> {job.location}</p>
        <p className="text-gray-600"><strong>Salary:</strong> {job.salary}</p>
        <p className="text-gray-600"><strong>Applied Date:</strong> {job.appliedDate}</p>
        <p className="text-gray-600"><strong>Notes:</strong> {job.notes}</p>

        {/* ✅ Required Skills */}
        <div className="mt-4">
          <strong className="text-gray-700">Required Skills:</strong>
          <div className="flex flex-wrap mt-2">
            {job.requiredSkills.map((skill, index) => (
              <span key={index} className={`px-3 py-1 rounded-full text-sm font-medium mr-2 mt-1 
                ${userSkills.includes(skill) ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* ✅ Match Score */}
        <div className="mt-4 flex items-center">
          <span className={`px-3 py-1 text-white text-sm font-bold rounded-full ${job.matchScore >= 80 ? "bg-green-600" : job.matchScore >= 50 ? "bg-yellow-500" : "bg-red-500"}`}>
            Match Score: {job.matchScore}%
          </span>
        </div>

        {/* ✅ Apply Now Button */}
        <button 
          className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition w-full"
          onClick={handleApply}
        >
          Apply Now
        </button>

        <button 
          className="mt-4 bg-gray-700 text-white py-2 px-6 rounded-md hover:bg-gray-800 transition w-full"
          onClick={() => router.push("/jobs")}
        >
          Back to Jobs
        </button>
      </div>
    </div>
  );
}
