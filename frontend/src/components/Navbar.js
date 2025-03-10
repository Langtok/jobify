import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-bold">Job Tracker</h1>
        <div>
          <Link href="/dashboard" className="mr-4">Dashboard</Link>
          <Link href="/jobs" className="mr-4">Jobs</Link>
          <Link href="/login" className="mr-4">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
