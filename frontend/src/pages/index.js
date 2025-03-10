import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
      <h1 className="text-5xl font-extrabold mb-4">🚀 Jobify - Your Job Tracker</h1>
      <p className="text-lg mb-6 max-w-2xl">
        Manage your job applications, get AI-powered resume feedback, and discover personalized job recommendations.
      </p>

      <div className="flex space-x-4">
        <Link href="/login">
          <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-700 transition">
            Register
          </button>
        </Link>
      </div>

      <div className="mt-12">
        <p className="text-sm opacity-80">© {new Date().getFullYear()} Jobify. All rights reserved.</p>
      </div>
    </div>
  );
}
