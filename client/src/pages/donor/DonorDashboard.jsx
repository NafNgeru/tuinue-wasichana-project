import React from 'react';
import { useNavigate } from 'react-router-dom';
import './DonorDashboard.css'; 

const DashboardPage = () => {
  return (
    <section>
      <h1>Donor Dashboard</h1>
      <p>Welcome to your donor dashboard.</p>
    </section>
  );
};


const charities = [
  {id: 1, name:'Woman Kind Kenya', image: '/images/woman-kind.jpg'},
  { id: 2, name: 'Power of Pads', image: '/images/power-of-pads.jpg' },
  { id: 3, name: 'Joyful Women', image: '/images/joyful-women.jpg' },
  { id: 4, name: 'WeeTracker', image: '/images/weetracker.jpg' }
];

const DonorDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <button onClick={() => navigate('/payment')}>Donations & Payments</button>
        <button onClick={() => navigate('/donations')}>Donations History</button>
        <button onClick={() => navigate('/stories')}>Beneficiary Stories</button>
        <button onClick={() => navigate('/settings')}>Settings</button>
      </aside>

      <main className = "dashboard-main">
        <h2> Donor's Dashboard </h2>
        <div className="charity-grid">
          {charities.map(charity => (
            <div key={charity.id} className="charity-card">
              <img src={charity.image} alt={charity.name} />
              <p>{charity.name} </p>
              <button className="donate-btn"> Donate </button>
          </div>    

          ))}
        </div>
      </main>
      <footer className="footer">
        <div>
        <p><i className="fas fa-envelope"></i> tuinuewasichana@gmail.co.ke</p>
        <p><i className="fas fa-phone"></i> +254712345678</p>
        </div>
        <div className="Socials">
        <p><i className="fas fa-facebooks"></i> Tuinue Wasichana</p>
        <p><i className="fas fa-twitter"></i> Tuinue Wasichana</p>
        </div>
      </footer>
    </div>
  );
};
     

//export default DonorDashboard;

















export default DashboardPage;

