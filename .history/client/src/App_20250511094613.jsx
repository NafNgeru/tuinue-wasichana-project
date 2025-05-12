import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PublicRoutes from "./routes/PublicRoutes";
import DonorRoutes from "./routes/DonorRoutes";
import CharityRoutes from "./routes/CharityRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { useSelector } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  console.log("Logged in user:", user);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AbaxFrGNcf9YrEXuPFwJbcGFs7eaN3ogpe6v2bWOf0HtAdPiXRTVgOWC0mgZjvjl1YOWntuKVurmzsfT",
        Currency: "USD",
      }}
    >
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="app-main">
            <Routes>
              <Route path="/*" element={<PublicRoutes />} />
              {user && user.role === "donor" && (
                <Route path="/donor/*" element={<DonorRoutes />} />
              )}
              {user && user.role === "charity" && (
                <Route path="/charity/*" element={<CharityRoutes />} />
              )}
              {user && user.role === "admin" && (
                <Route path="/admin/*" element={<AdminRoutes />} />
              )}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
