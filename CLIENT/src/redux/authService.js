import axios from "axios";

// Register user
const register = async (userData) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/register",
    userData
  );
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    userData
  );
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }
  return res.data;
};
//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
