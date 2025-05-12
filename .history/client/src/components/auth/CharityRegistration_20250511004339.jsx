import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Logo from "../../assets/logo.svg"; // Your imported logo

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
    idType: "National ID",
    idNumber: "",
    firstName: "",
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
      await api.post("http://localhost:5000/auth/register_charity", {
        name: formData.name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        phone: formData.phone,
        userType: formData.userType,
        idType: formData.idType,
        idNumber: formData.idNumber,
        firstName: formData.firstName,
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
    <div className="flex h-screen overflow-hidden bg-blue-100">
      {/* Left Side: Promotional Content */}
      <div className="w-1/2 flex flex-col justify-center items-center p-16 bg-gradient-to-br from-blue-100 to-blue-300">
        <img
          src={Logo}
          alt="Logo"
          className="mb-8"
          style={{ width: "300px", height: "300px" }}
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Take charge of your well-being with Afyangu
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Afyangu simplifies medical record management, insurance tracking, and
          health monitoring. Seamlessly organize your healthcare data,
          appointments, and insurance covers with our user-friendly platform.
        </p>
      </div>

      {/* Right Side: Registration Form within a Card (Transparent Text Example) */}
      <div className="w-1/2 flex justify-center items-center bg-blue-100">
        <div
          className="bg-white shadow-md rounded-lg p-10 w-full"
          style={{ maxWidth: "600px", maxHeight: "fit-content" }}
        >
          <h2
            className="text-3xl font-semibold text-gray-800 mb-8 text-center"
            style={{ color: "transparent" }} // Transparent heading
          >
            Register with Afyangu
          </h2>
          <p
            className="text-gray-600 text-lg mb-10 text-center"
            style={{ color: "transparent" }} // Transparent paragraph
          >
            Enter your details below to create your account
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="idType"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                Select ID Type
              </label>
              <select
                id="idType"
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                style={{ color: "transparent" }} // Transparent select text
              >
                <option style={{ color: "black" }}>National ID</option>{" "}
                {/* Option text needs explicit color */}
                {/* Add other ID types as needed */}
              </select>
            </div>
            <div>
              <label
                htmlFor="idNumber"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                ID Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="idNumber"
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                required
                style={{ color: "transparent" }} // Transparent input text
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ color: "transparent" }} // Transparent input text
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ color: "transparent" }} // Transparent input text
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                Username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm ${
                  usernameAvailable ? "border-gray-300" : "border-red-500"
                }`}
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                style={{ color: "transparent" }} // Transparent input text
              />
              {!usernameAvailable && (
                <p
                  className="text-red-500 text-xs italic mt-1"
                  style={{ color: "transparent" }}
                >
                  Username is already taken.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={{ color: "transparent" }} // Transparent input text
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-gray-700 text-sm font-bold mb-2"
                style={{ color: "transparent" }}
              >
                Phone Number
              </label>
              <div className="flex">
                <span
                  className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm"
                  style={{ color: "transparent" }}
                >
                  +254
                </span>
                <input
                  className="shadow appearance-none border rounded-r-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{ color: "transparent" }} // Transparent input text
                />
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded focus:outline-none focus:shadow-outline w-full text-lg transition duration-300"
                type="submit"
                style={{ color: "transparent" }} // Transparent button text
              >
                Register
              </button>
              <p
                className="text-gray-600 text-sm mt-0 text-center"
                style={{ color: "transparent" }}
              >
                Already have an account?
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 hover:underline cursor-pointer ml-1"
                  style={{ color: "transparent" }} // Transparent link text
                >
                  Sign In
                </span>
              </p>
            </div>
          </form>
          {message && (
            <p
              className={`text-center text-lg font-medium mt-8 ${
                message.includes("successful")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
              style={{ color: "transparent" }} // Transparent message
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharityRegistration;
