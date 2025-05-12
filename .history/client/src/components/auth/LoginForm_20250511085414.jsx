import React, { useState, useRef, useEffect } from "react";
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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
            style={{
              marginTop: "30px",

              display: "flex",

              justifyContent: "center",
            }}
          ></div>
          {/* Register With Us Dropdown */}
          <div
            className="relative mt-8"
            ref={dropdownRef}
            style={{ width: "80%" }}
          >
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-md font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-green-300 transition-all flex items-center justify-center w-full"
            >
              Register
            </button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  marginTop: "0.5rem",
                  backgroundColor: "white",
                  border: "1px solid #e0e0e0",
                  borderRadius: "0.375rem",
                  boxShadow:
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  left: "0",
                  zIndex: "20",
                  width: "100%",
                }}
              >
                <button
                  onClick={() => navigate("/register/donor")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.25rem",
                    color: "#4a5568",
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f7fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Register Individual Donor
                </button>
                <button
                  onClick={() => navigate("/register/donor")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.25rem",
                    color: "#4a5568",
                    backgroundColor: "transparent",
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f7fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Register Organization Donor
                </button>
                <button
                  onClick={() => navigate("/register/charity")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.25rem",
                    color: "#4a5568",
                    backgroundColor: "transparent",
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f7fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Register Individual Charity
                </button>
                <button
                  onClick={() => navigate("/register/charity")}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.75rem 1.25rem",
                    color: "#4a5568",
                    backgroundColor: "transparent",
                    border: "none",
                    borderTop: "1px solid #e0e0e0",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f7fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Register Organization Charity
                </button>
              </div>
            )}
          </div>
          <div className="mt-6" style={{ width: "80%" }}>
            <div
              style={{
                marginTop: "30px",

                display: "flex",

                justifyContent: "center",
              }}
            ></div>
            <button
              onClick={() => navigate("/reset-password")}
              className="bg-yellow-600 text-white py-2 rounded-md font-semibold hover:bg-yellow-700 transition font-sans w-full"
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
