import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api";
import Logo from "../../assets/logo.svg";

const CharityRegistration = () => {
  const { userType } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    description: "",
    logo: null,
    userType: userType || "individual",
  });
  const [message, setMessage] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, userType: userType || "individual" }));
  }, [userType]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo") {
      setFormData({ ...formData, logo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (name === "username") {
      setUsernameAvailable(true);
    }
  };

  const checkUsername = async (username) => {
    try {
      const response = await api(
        `/auth/check-username/${username}`
      );
      setUsernameAvailable(response.available);
      return response.available;
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(false);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
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
      const data = new FormData();
      data.append("user_id", formData.username);
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("userType", formData.userType);
      if (formData.logo) {
        data.append("logo", formData.logo);
      }

      await api("/auth/apply", {
        method: "POST",
        body: data,
        isForm: true,
      });
      setMessage("Application submitted successfully! Await admin approval.");
      setFormData({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
        description: "",
        logo: null,
        userType: userType || "individual",
      });
      setTimeout(() => navigate("/login"), 3000);
    } catch {
      setMessage("Application failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-blue-100 font-sans">
      <div className="w-1/2 flex flex-col justify-center items-center p-13 bg-gradient-to-br from-blue-100 to-blue-300">
        {" "}
        <img
          src={Logo}
          alt="Logo"
          className="mb-6" // Increased margin
          style={{ width: "300px", height: "300px" }}
        />
        <h2 className="text-xl font-bold text-blue-700 mb-4 text-center font-semibold">
          {" "}
          Empowering Girls with Tuinue Wasichana
        </h2>
        <p className="text-gray-700 text-md leading-relaxed mb-5 text-center text-sm">
          {" "}
          Tuinue Wasichana is dedicated to uplifting and empowering girls. Join
          us in creating a brighter future by supporting their education,
          health, and well-being through our impactful initiatives and community
          engagement.
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center bg-blue-100">
        <div
          className="bg-white shadow-md rounded-lg p-7 w-full flex flex-col items-center text-center"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
            {" "}
            Apply to create a Charity Account
          </h3>
          <p className="text-gray-600 text-xs mb-3 text-left">
            Enter your details below to apply for charity account approval
          </p>
          <div className="w-4/5">
            <form
              onSubmit={handleSubmit}
              className="space-y-2.5"
              style={{ margin: "0 auto" }}
            >
              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Charity Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className={`mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans ${
                    usernameAvailable ? "border-gray-300" : "border-red-500"
                  } text-gray-900 text-xs`}
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 resize-none text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Upload Logo
                </label>
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleChange}
                  className="mt-1 text-xs"
                  style={{ width: "90%" }}
                />
              </div>

              <div className="w-full flex flex-col items-center">
                <label className="text-xs text-gray-700 w-full text-left">
                  Apply as
                </label>
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="mt-1 px-3.5 py-2.5 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none bg-transparent font-sans text-gray-900 text-xs"
                  style={{ width: "90%" }}
                >
                  <option value="individual">Individual</option>
                  <option value="organization">Organization</option>
                </select>
              </div>

              <div
                style={{
                  marginTop: "17.5px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition font-sans text-xs"
                >
                  Proceed
                </button>
              </div>
            </form>

            <p className="mt-3.5 text-xs text-gray-600 font-sans text-center">
              {" "}
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
    </div>
  );
};

export default CharityRegistration;
