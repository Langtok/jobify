import { useRouter } from "next/router";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [missingSkills, setMissingSkills] = useState([]);
  const [applied, setApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState("Not Applied");
  const [saved, setSaved] = useState(false);

  // ✅ Fix: Wrap userSkills in useMemo to ensure it remains stable across renders
  const userSkills = useMemo(() => ["React", "JavaScript", "Tailwind CSS"], []);

  // ✅ Wrapped fetchJobDetails in useCallback
  const fetchJobDetails = useCallback(async () => {
    try {
      const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
      const foundJob = storedJobs.find((j) => j.id === parseInt(id));
  
      if (!foundJob) throw new Error("Job not found");
  
      const missing = (foundJob.requiredSkills || []).filter(
        (skill) => !userSkills.includes(skill)
      );
      setMissingSkills(missing);
      setJob(foundJob);
  
      // Check if already applied
      const storedApplications =
        JSON.parse(localStorage.getItem("applications")) || [];
      const appliedJob = storedApplications.find((app) => app.id === foundJob.id);
      if (appliedJob) {
        setApplied(true);
        setApplicationStatus("Pending Review");
      }
  
      // Check if job is saved
      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setSaved(savedJobs.some((savedJob) => savedJob.id === foundJob.id));
    } catch (error) {
      console.error("Error fetching job details:", error);
      toast.error(error.message || "Failed to load job details.");
    } finally {
      setLoading(false);
    }
  }, [id, userSkills]); // ✅ Now userSkills is stable across renders

  useEffect(() => {
    if (id) fetchJobDetails();
  }, [id, fetchJobDetails]);

  const handleApply = () => {
    if (!job) return;

    if (missingSkills.length > 0) {
      toast.warning(
        `You're missing some skills: ${missingSkills.join(", ")}.`
      );
      return;
    }

    if (confirm("Are you sure you want to apply for this job?")) {
      toast.success("✅ Application submitted successfully!");

      const storedApplications =
        JSON.parse(localStorage.getItem("applications")) || [];
      const updatedApplications = [
        ...storedApplications,
        { ...job, status: "Pending Review" },
      ];
      localStorage.setItem("applications", JSON.stringify(updatedApplications));

      setApplied(true);
      setApplicationStatus("Pending Review");
    }
  };

  const handleWithdraw = () => {
    if (confirm("Are you sure you want to withdraw your application?")) {
      const storedApplications =
        JSON.parse(localStorage.getItem("applications")) || [];
      const updatedApplications = storedApplications.filter(
        (app) => app.id !== job.id
      );
      localStorage.setItem("applications", JSON.stringify(updatedApplications));

      setApplied(false);
      setApplicationStatus("Not Applied");
      toast.info("❌ Application withdrawn.");
    }
  };

  const handleSave = () => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    if (!saved) {
      localStorage.setItem("savedJobs", JSON.stringify([...savedJobs, job]));
      setSaved(true);
      toast.success("⭐ Job saved for later!");
    } else {
      const updatedSavedJobs = savedJobs.filter(
        (savedJob) => savedJob.id !== job.id
      );
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setSaved(false);
      toast.warning("⚠ Job removed from saved list.");
    }
  };

  const statusOptions = ["Applied", "Interview Scheduled", "Offer Received", "Rejected"];
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setApplicationStatus(newStatus);

    const storedApplications =
      JSON.parse(localStorage.getItem("applications")) || [];
    const updatedApplications = storedApplications.map((app) =>
      app.id === job.id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem("applications", JSON.stringify(updatedApplications));

    toast.info(`✅ Application status updated to: ${newStatus}`);
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

        {applied && (
          <div className="mt-4">
            <strong className="text-gray-700">Application Status:</strong>
            <select
              value={applicationStatus}
              onChange={handleStatusChange}
              className="ml-2 p-2 border rounded-md bg-white text-gray-800"
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        )}

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

        {applied ? (
          <button 
            className="mt-6 bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition w-full"
            onClick={handleWithdraw}
          >
            Withdraw Application
          </button>
        ) : (
          <button 
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition w-full"
            onClick={handleApply}
          >
            Apply Now
          </button>
        )}

        <button 
          className={`mt-4 text-white py-2 px-6 rounded-md transition w-full 
            ${saved ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
          onClick={handleSave}
        >
          {saved ? "⭐ Saved" : "Save for Later"}
        </button>

        {missingSkills.length > 0 && (
          <div className="mt-6 bg-yellow-100 p-4 rounded-md border border-yellow-400">
            <h3 className="text-yellow-700 font-bold">📚 Suggested Learning Resources</h3>
            <ul className="list-disc ml-5 mt-2">
              {missingSkills.map((skill, index) => (
                <li key={index}>
                  <a 
                    href={`https://www.udemy.com/courses/search/?q=${skill}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Learn {skill} on Udemy
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

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
