import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';
import { api } from "../../api";;
import back1 from '../../assets/images/back1.jpeg';
import back2 from '../../assets/images/back2.jpeg';
import back3 from '../../assets/images/back3.jpg';
import back4 from '../../assets/images/back4.jpg';

const AdminDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [charities, setCharities] = useState([]);

  const fetchCharities = async () => {
    try {
      const data = await api('/charities/');
      setCharities(data);
    } catch (error) {
      console.error('Error fetching charities:', error);
    }
  };

  const fetchData = () => {
    fetchCharities();
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const data = await api("/admin/pending");
        setPendingCount(data.length);
      } catch (error) {
        console.error("Error fetching pending count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingCount();
  }, []);

  return (
    <section className="admin-dashboard" style={{ minHeight: '100vh', position: 'relative' }}>
      <BackgroundSlideshow />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1>Admin Dashboard</h1>
        <p><strong>Welcome to the admin dashboard.</strong></p>
        <nav className="admin-nav">
          <ul>
            <li><Link to="/admin/charity-approval">Charity Approvals</Link></li>
            <li><Link to="/admin/delete-charity">Delete Charity</Link></li>
          </ul>
        </nav>
        <div className="dashboard-widgets">
          <div className="widget">
            <h2>Pending Approvals</h2>
            <p>Number of charities awaiting approval: {pendingCount}</p>
          </div>
          <div className="widget">
            <h2>Number of Approved Charities</h2>
            <p>{charities.length}</p>
            <button
              onClick={fetchData}
              className="bg-blue-600 text-black px-3 py-1 rounded hover:bg-blue-700 mb-2"
            >
              Refresh
            </button>
            <ul>
              {charities.map((charity) => (
                <li key={charity.id}>
                  <strong>{charity.full_name}</strong>: {charity.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const BackgroundSlideshow = () => {
  const images = [back1, back2, back3, back4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(images.length - 1);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((currentIndex + 1) % images.length);
      setFade(false);
      setTimeout(() => setFade(true), 50);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  const baseStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 1s ease-in-out',
    zIndex: 0,
  };

  return (
    <>
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[prevIndex]})`,
          opacity: fade ? 0 : 1,
        }}
      />
      <div
        style={{
          ...baseStyle,
          backgroundImage: `url(${images[currentIndex]})`,
          opacity: fade ? 1 : 0,
        }}
      />
    </>
  );
};

export default AdminDashboard;