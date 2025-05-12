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
      setMessage("Username already taken. Please try another.");
      return;
    }
    const isAvailable = await checkUsername(formData.username);
    if (!isAvailable) {
      setMessage("Username already taken. Please try another.");
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
    <div className="flex h-screen overflow-hidden bg-blue-100 font-sans">
      {/* Left Side: Promotional Content */}
      <div className="w-1/2 flex flex-col justify-center items-center p-16 bg-gradient-to-br from-blue-100 to-blue-300">
        <img
          src={Logo}
          alt="Logo"
          className="mb-8"
          style={{ width: "300px", height: "300px" }}
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center font-semibold">
          Take charge of your well-being with Afyangu
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Afyangu simplifies medical record management, insurance tracking, and
          health monitoring. Seamlessly organize your healthcare data,
          appointments, and insurance covers with our user-friendly platform.
        </p>
      </div>

      {/* Right Side: Registration Form within a Card (Centered Content) */}
      <div className="w-1/2 flex justify-center items-center bg-blue-100">
        <div
          className="bg-white shadow-md rounded-lg p-10 w-full flex flex-col items-center" // items-center is already here
          style={{ maxWidth: "600px", maxHeight: "fit-content" }}
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Register to create a Charity Account
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5 w-4/5 mx-auto">
            {/* Form fields remain the same */}
            <div>
              <label className="text-sm text-gray-700">Charity Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className={`w-full mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans ${
                  usernameAvailable ? "border-gray-300" : "border-red-500"
                }`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full mt-1 px-6 py-3 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans"
              />
            </div>

            <button
              type="submit"
              style={{ marginTop: "30px" }}
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition font-sans"
            >
              Proceed
            </button>

            {message && (
              <p
                className={`text-center text-sm font-medium font-sans ${
                  message.includes("successful")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>

          <p className="mt-6 text-sm text-gray-600 font-sans text-center">
            {" "}
            {/* Added text-center here */}
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-700 font-medium cursor-pointer hover:underline font-sans"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharityRegistration;
