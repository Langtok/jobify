import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar"; // ✅ Use separate Navbar component

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar /> {/* ✅ Use Navbar here instead of manually writing it */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
