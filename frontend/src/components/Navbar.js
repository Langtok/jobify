import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ Function to check if user is logged in
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setUser(token ? true : false);
  };

  useEffect(() => {
    checkAuth(); // Check on initial load
    router.events.on("routeChangeComplete", checkAuth); // Update on route change

    return () => {
      router.events.off("routeChangeComplete", checkAuth);
    };
  }, [router.events]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false); // Immediately update UI
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Job Tracker</h1>

        <div className="flex space-x-4">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/jobs" className="hover:underline">Jobs</Link>

          {user ? (
            <>
              <Link href="/jobs/add" className="bg-green-500 px-4 py-2 rounded hover:bg-green-700 transition">
                + Add Job
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">Login</Link>
              <Link href="/register" className="hover:underline">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
