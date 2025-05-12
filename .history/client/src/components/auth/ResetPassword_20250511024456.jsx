import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg"; // Assuming you want to use the same logo

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for reset password logic
    setMessage(
      "If this email is registered, you will receive reset instructions."
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-blue-100 font-sans">
      {/* Left Side: Promotional Content (You can customize this for reset password) */}
      <div className="w-1/2 flex flex-col justify-center items-center p-16 bg-gradient-to-br from-blue-100 to-blue-300">
        <img
          src={Logo}
          alt="Logo"
          className="mb-8"
          style={{ width: "400px", height: "400px" }}
        />
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center font-semibold">
          Trouble Logging In?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 text-center">
          Enter your registered email address below, and we'll send you
          instructions on how to reset your password and regain access to your
          account.
        </p>
      </div>

      {/* Right Side: Reset Password Form within a Card */}
      <div className="w-1/2 flex justify-center items-center bg-blue-100">
        <div
          className="bg-white shadow-md rounded-lg p-10 w-full flex flex-col items-center text-center"
          style={{ maxWidth: "700px", minHeight: "400px" }} // Adjust minHeight as needed
        >
          <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
            Reset Password
          </h3>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            style={{ width: "80%" }}
          >
            <div className="w-full flex flex-col">
              <label className="text-sm text-gray-700 w-full text-left">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              Send Reset Instructions
            </button>
          </form>
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          ></div>
          <div className="mt-6">
            <button
              onClick={() => navigate("/login")}
              className="bg-gray-600 text-white py-2 rounded-md font-semibold hover:bg-gray-700 transition font-sans"
            >
              Back to Login
            </button>
          </div>
          {message && (
            <p className="mt-4 text-green-600 text-center font-sans">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
