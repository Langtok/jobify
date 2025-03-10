const API_URL = "http://localhost:5000/api/auth"; // Replace with backend URL if deployed

// ✅ Register User
export const registerUser = async (name, email, password) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Registration failed");
  return data;
};

// ✅ Login User
export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Login failed");
  localStorage.setItem("token", data.token); // Store JWT token
  return data;
};

// ✅ Get Current User (Protected Route)
export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();
  if (!response.ok) return null;
  return data;
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem("token"); // Remove token
};
