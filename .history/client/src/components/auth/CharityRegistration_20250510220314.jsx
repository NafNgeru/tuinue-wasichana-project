import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

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
      console.error("Error checking:", error);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-8">
        <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
          {formData.userType === "organization"
            ? "Charity Organization"
            : "Individual Charity"}{" "}
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: "Charity Name", name: "name", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Username", name: "username", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "Phone Number", name: "phone", type: "tel" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 mb-1">{label}:</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
                className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  name === "username" && !usernameAvailable
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="w-full mt-4 text-blue-600 font-medium hover:underline text-center"
        >
          Already have an account? Login
        </button>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CharityRegistration;
