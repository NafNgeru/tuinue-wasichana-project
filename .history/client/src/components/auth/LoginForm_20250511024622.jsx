import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../services/api";
import { setUser } from "../../features/auth/authSlice";
import Logo from "../../assets/logo.svg"; // Assuming you want to use the same logo

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login check
    if (formData.username === "admin" && formData.password === "admin") {
      dispatch(setUser({ username: "admin", role: "admin" }));
      navigate("/admin");
      return;
    }

    try {
      const response = await api.post(
        "http://localhost:5000/auth/login",
        formData
      );
      // Assuming response contains user role and token
      const user = response.data;
      const { role } = user;
      dispatch(setUser(user));
      localStorage.setItem("user", JSON.stringify(user));

      if (role === "donor") {
        navigate(`/donor/${user.donor.id}`);
      } else if (role === "charity") {
        navigate(`/charity/${user.charity.id}`);
      } else if (role === "admin") {
        navigate("/admin");
      } else {
        setMessage("Unknown user role");
      }
    } catch {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-blue-100 font-sans">
      {/* Left Side: Promotional Content (You can customize this for login) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-16 bg-gradient-to-br from-blue-100 to-blue-300">
        <img
          src={Logo}
          alt="Logo"
          className="mb-8"
          style={{ width: "400px", height: "400px" }}
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center font-semibold">
          Welcome Back to Our Community
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Log in to access your account and continue making a difference. Join
          us in our mission to create positive change.
        </p>
      </div>

      {/* Right Side: Login Form within a Card */}
      <div className="w-1/2 flex justify-center items-center bg-blue-100">
        <div
          className="bg-white shadow-md rounded-lg p-10 w-full flex flex-col items-center text-center"
          style={{ maxWidth: "700px", minHeight: "500px" }} // Adjust minHeight as needed
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Login
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            style={{ width: "80%" }}
          >
            <div className="w-full flex flex-col">
              <label className="text-sm text-gray-700 w-full text-left">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                minLength={3}
                className="mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-sm text-gray-700 w-full text-left">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900"
              />
            </div>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition font-sans"
            >
              Login
            </button>
          </form>
          <div
            className="flex justify-between mt-8"
            style={{ width: "80%", gap: "10px" }}
          >
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
            <button
              onClick={() => navigate("/register")}
              className="bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition font-sans"
              style={{ width: "48%" }}
            >
              Register
            </button>
            <div
              style={{
                marginTop: "30px",
                display: "flex",
                justifyContent: "center",
              }}
            ></div>
            <button
              onClick={() => navigate("/reset-password")}
              className="bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition font-sans"
              style={{ width: "48%" }}
            >
              Forget Password
            </button>
          </div>
          {message && (
            <p className="mt-4 text-red-600 text-center font-sans">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
