import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PublicRoutes from "./routes/PublicRoutes";
import DonorRoutes from "./routes/DonorRoutes";
import CharityRoutes from "./routes/CharityRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      dispatch(setUser(JSON.parse(savedUser)));
    }
  }, [dispatch]);

  console.log("Logged in user:", user); // Array of routes where you want to hide the Navbar and Footer

  const hideLayoutOnRoutes = [
    "/register/donor",
    "/register/charity",
    "/login",
    "/reset-password",
  ];
  const shouldShowLayout = !hideLayoutOnRoutes.includes(location.pathname);

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AbaxFrGNcf9YrEXuPFwJbcGFs7eaN3ogpe6v2bWOf0HtAdPiXRTVgOWC0mgZjvjl1YOWntuKVurmzsfT",
        Currency: "USD",
      }}
    >
           {" "}
      <Router>
               {" "}
        <div className="app-container">
                    {shouldShowLayout && <Navbar />}         {" "}
          <main className="app-main">
                       {" "}
            <Routes>
                            <Route path="/*" element={<PublicRoutes />} />     
                     {" "}
              {user && user.role === "donor" && (
                <Route path="/donor/*" element={<DonorRoutes />} />
              )}
                           {" "}
              {user && user.role === "charity" && (
                <Route path="/charity/*" element={<CharityRoutes />} />
              )}
                           {" "}
              {user && user.role === "admin" && (
                <Route path="/admin/*" element={<AdminRoutes />} />
              )}
                           {" "}
              <Route path="*" element={<Navigate to="/" replace />} />{" "}
            </Routes>{" "}
          </main>
          {shouldShowLayout && <Footer />}{" "}
        </div>{" "}
      </Router>{" "}
    </PayPalScriptProvider>
  );
};

export default App;
