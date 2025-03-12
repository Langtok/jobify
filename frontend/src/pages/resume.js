import { useState } from "react";

export default function ResumeAnalysis() {
  const [resumeText, setResumeText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Load Sample Resume
  const loadSampleResume = async () => {
    try {
      const response = await fetch("/sampleResume.txt"); // Fetch local sample
      if (!response.ok) throw new Error("Failed to load sample resume");
      const text = await response.text();
      setResumeText(text);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnalyze = async () => {
    if (!resumeText) {
      setError("Please paste your resume text.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("https://jobify-gj12.onrender.com/api/resume/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText }),
      });
  
      // ✅ Check if response is actually JSON
      const text = await response.text();
      console.log("Raw Response:", text); // 🔍 Log raw response
  
      try {
        const data = JSON.parse(text); // ✅ Parse JSON safely
        if (!response.ok) throw new Error(data.message || "Analysis failed");
        setSuggestions(data.suggestions);
      } catch (jsonError) {
        throw new Error("Invalid JSON response from server.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">AI Resume Analysis</h1>

      <textarea
        className="w-full max-w-3xl p-4 text-lg border border-gray-500 bg-white text-gray-900 rounded-md focus:ring-2 focus:ring-blue-500"
        rows="10"
        placeholder="Paste your resume text here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
      />

      <div className="mt-4 flex space-x-4">
        <button
          className="bg-blue-600 text-white py-3 px-6 text-lg rounded-md hover:bg-blue-700 transition"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>

        <button
          className="bg-gray-600 text-white py-3 px-6 text-lg rounded-md hover:bg-gray-700 transition"
          onClick={loadSampleResume}
        >
          Load Sample Resume
        </button>
      </div>

      {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

      {suggestions.length > 0 && (
        <div className="bg-white p-6 mt-6 rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-800">Suggestions</h2>
          <ul className="list-disc list-inside mt-2 text-gray-700">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="mt-2">{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
