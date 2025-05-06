import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/CharityDashboard.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";

export default function CharityDashboard() {
  const [donations, setDonations] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/donations");
        if (!response.ok) throw new Error("Failed to fetch donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, [id]);

  const handleLogout = () => {
    // localStorage.clear();
    // navigate("/login");

    dispatch(setUser(null));
    localStorage.removeItem('user');
    navigate('/login');

  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const anonymousDonations = donations
    .filter((d) => d.donor_name === "Anonymous")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Tuinue Wasichana</h2>
        <nav className="sidebar-nav">
          <Link to={`/charity/${id}`} className="nav-button">Dashboard</Link>
          <Link to={`/charity/${id}/beneficiaries`} className="nav-button">Beneficiaries</Link>
          <Link to={`/charity/${id}/inventory`} className="nav-button">Inventory</Link>
          <Link to={`/charity/${id}/stories`} className="nav-button">Stories</Link>
        </nav>

        {/* Logout Button */}
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h1>Charity Dashboard</h1>
        </header>

        <section className="summary-cards">
          <div className="card">
            <h3>Donations</h3>
            <p className="amount">KSh {(totalDonations - anonymousDonations).toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Anonymous Donations</h3>
            <p className="amount">KSh {anonymousDonations.toLocaleString()}</p>
          </div>
          <div className="card">
            <h3>Total Donations</h3>
            <p className="amount">KSh {totalDonations.toLocaleString()}</p>
          </div>
        </section>

        <section className="donors-list">
          <div className="card">
            <h2>Donors</h2>
            <ul>
              {donations.map((donation) => (
                <li key={donation.id} className="donor-item">
                  <span>{donation.donor_name}</span>
                  <span>KSh {donation.amount.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}