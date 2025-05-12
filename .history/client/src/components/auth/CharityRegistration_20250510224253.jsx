import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/logo.svg"; // You might need a different logo for this style

const CharityRegistration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", // Assuming "Charity Name" maps to a general "Name" field
    email: "",
    username: "",
    password: "",
    phone: "",
    userType: userType || "individual",
    idType: "National ID", // Added a state for ID Type, assuming it's relevant
    idNumber: "", // Added a state for ID Number
    firstName: "", // Assuming "First Name" is needed
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
      // Adjust the API call to match the expected registration fields
      await api.post("http://localhost:5000/auth/register_charity", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
        userType: formData.userType,
        // Include other relevant fields based on your backend expectations
      });
      setMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        userType: userType || "individual",
        idType: "National ID",
        idNumber: "",
        firstName: "",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Side: Promotional Content */}
      <div className="w-1/2 flex flex-col justify-center items-start p-16">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">
          Take charge of your well-being with Afyangu
        </h2>
        <p className="text-gray-700 text-lg mb-8">
          Afyangu simplifies medical record management, insurance tracking, and
          health monitoring. Seamlessly organize your healthcare data,
          appointments, and insurance covers with our user-friendly platform.
        </p>
        {/* You might want to add the image here as well, using Tailwind's background image or an <img> tag */}
      </div>

      {/* Right Side: Registration Form */}
      <div className="w-1/2 flex flex-col justify-start items-center bg-white p-12 md:p-16">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Register to create an account with Afyangu
        </h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter your details below to be authenticated
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div>
            <label
              htmlFor="idType"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select ID Type
            </label>
            <select
              id="idType"
              name="idType"
              value={formData.idType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            >
              <option>National ID</option>
              {/* Add other ID types as needed */}
            </select>
          </div>
          <div>
            <label
              htmlFor="idNumber"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              ID Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="idNumber"
              type="text"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="firstName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                +254 {/* This should ideally be a country code selector */}
              </span>
              <input
                className="shadow appearance-none border rounded-r-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full text-sm"
            type="submit"
          >
            Proceed
          </button>
        </form>
        <p className="text-gray-600 text-xs mt-4">
          Do you have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:underline cursor-pointer ml-1"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default CharityRegistration;
