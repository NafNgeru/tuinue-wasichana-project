import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Admin.css';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import back1 from '../../assets/images/back1.jpeg';
import back2 from '../../assets/images/back2.jpeg';
import back3 from '../../assets/images/back3.jpg';
import back4 from '../../assets/images/back4.jpg';

const AdminDashboard = () => {
  const [pendingCount, setPendingCount] = useState(0);
  const [charities, setCharities] = useState([]);

  const fetchPendingCount = async () => {
    try {
      const response = await axios.get('http://localhost:5000/admin/pending');
      setPendingCount(response.data.length);
    } catch (error) {
      console.error('Error fetching pending charities:', error);
    }
  };

  const fetchCharities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/charities/');
      setCharities(response.data);
    } catch (error) {
      console.error('Error fetching charities:', error);
    }
  };

  const fetchData = () => {
    fetchPendingCount();
    fetchCharities();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="admin-dashboard" style={{ minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <BackgroundSlideshow />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="text-center font-bold text-black text-3xl mb-4 bg-white bg-opacity-30 p-4 rounded">Welcome to the admin dashboard</h1>
        <nav className="admin-nav text-center mb-6">
          <ul className="inline-flex space-x-6 justify-center">
            <li>
              <Link
                to="/admin/charity-approval"
                className="bg-white bg-opacity-30 px-4 py-2 rounded shadow hover:bg-opacity-50 transition"
              >
                Charity Approvals
              </Link>
            </li>
            <li>
              <Link
                to="/admin/delete-charity"
                className="bg-white bg-opacity-30 px-4 py-2 rounded shadow hover:bg-opacity-50 transition"
              >
                Delete Charity
              </Link>
            </li>
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
      <Footer />
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