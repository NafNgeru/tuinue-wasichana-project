import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import { clearUser } from '../store/authSlice';
//import { apiFetch } from '../utils/api';

const DonorDashboard = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    apiFetch('/api/donor/charities')
      .then((data) => {
        setCharities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load charities. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleDonateClick = (charityId) => {
    navigate(`/donate/${charityId}`);
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/donor/logout', { method: 'POST' });
      dispatch(clearUser());
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div>
      <header>
        <h1>Tuinue Wasichana</h1>
        <button onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
      </header>
      <div>
        <aside>
          <h2>Welcome, {user?.full_name}</h2>
          <nav>
            <button onClick={() => navigate('/donor-dashboard')} aria-label="Home">
              Home
            </button>
            <button onClick={() => navigate('/donation-history')} aria-label="Donation History">
              Donation History
            </button>
            <button onClick={() => navigate('/beneficiary-stories')} aria-label="Beneficiary Stories">
              Beneficiary Stories
            </button>
            <button onClick={() => navigate('/payments')} aria-label="Donations & Payments">
              Donations & Payments
            </button>
            <button onClick={() => navigate('/settings')} aria-label="Settings">
              Settings
            </button>
          </nav>
        </aside>
        <main>
          <h2>Choose a Charity to Support</h2>
          {loading ? (
            <p>Loading charities...</p>
          ) : error ? (
            <p>{error}</p>
          ) : charities.length === 0 ? (
            <p>No charities available.</p>
          ) : (
            <div>
              {charities.map((charity) => (
                <div key={charity.id}>
                  <img
                    src={charity.image_url || 'https://via.placeholder.com/150'}
                    alt={`Logo of ${charity.name}`}
                  />
                  <h3>{charity.name}</h3>
                  <p>{charity.description}</p>
                  <button
                    onClick={() => handleDonateClick(charity.id)}
                    aria-label={`Donate to ${charity.name}`}
                  >
                    Donate Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>      
    </div>
  );
};

export default DonorDashboard;

















