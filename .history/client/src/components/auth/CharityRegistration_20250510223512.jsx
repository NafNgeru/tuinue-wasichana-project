import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/logo.svg";

const CharityRegistration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    userType: userType || "individual",
  });
  const [message, setMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: userType || "individual" }));
  }, [userType]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "username") {
      setUsernameAvailable(true);
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await api.get(
        `http://localhost:5000/auth/check-username/${username}`
      );
      setUsernameAvailable(response.data.available);
      return response.data.available;
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usernameAvailable) {
      setMessage("Username already taken.");
      return;
    }
    const isAvailable = await checkUsername(formData.username);
    if (!isAvailable) {
      setMessage("Username already taken.");
      return;
    }

    try {
      await api.post("http://localhost:5000/auth/register_charity", formData);
      setMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        userType: userType || "individual",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side: Form */}
      <div className="w-1/2 flex items-center justify-center bg-white p-6 md:p-8">
        <div className="w-full max-w-md">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
            Register Charity Account
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
            <div>
              <label className="block text-sm text-gray-700">
                Charity Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm ${
                  usernameAvailable ? "border-gray-300" : "border-red-500"
                }`}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition text-sm"
            >
              Proceed
            </button>

            {message && (
              <p
                className={`text-center text-sm font-medium ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-4 md:mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-700 font-medium cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      {/* Right Side: Logo and Description */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-[#e9efff] text-center p-6 md:p-12">
        <img
          src={Logo}
          alt="Logo"
          className="w-16 h-16 md:w-24 md:h-24 mb-4 md:mb-6"
        />
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
          Take charge of your mission
        </h2>
        <p className="text-gray-700 max-w-md text-sm md:text-base">
          Join <strong>Tuinue WasichanaCCI</strong> and empower your charity to
          receive donations, grow supporters, and create a lasting impact.
          Secure. Reliable. Purpose-driven.
        </p>
      </div>
    </div>
  );
};

export default CharityRegistration;
