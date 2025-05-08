import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../features/auth/authSlice";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
//import { clearUser } from '../store/authSlice';
//import { apiFetch } from '../utils/api';


function CharityCard({charity}){
    const navigate = useNavigate();
    const [favorites, setFavorite] = useState([]);
    const { id } = useParams();

    const toggleFavorite = (charity) => {
        setFavorite(prev => {
            const exists = prev.find(fav => fav.id === charity.id);
            return exists
            ? prev.filter(fav => fav.id !== charity.id) : [...prev, charity];
        })
    }

    const isFavorite = (charityId) => {
        return favorites.some(fav => fav.id === charityId); //.some() returns a boolean value true or false when checking if an item is favorite or not
    }

    const favorited = isFavorite(charity.id);

    const handleDonateClick = (charityId) => {
      navigate(`/donor/${id}/donate/${charityId}`);
    };

    return(
    <div className="menu-card">
      <img className="item-image" alt="charity" src={charity.image} />
      <h2 className="item-title">{charity.full_name}</h2>
      <div className="card-buttons">
      <button 
      onClick={() => handleDonateClick(charity.id)}
      aria-label={`Donate to ${charity.full_name}`} >
        Donate Now
       </button>
      <button className="view" onClick={() => navigate(`/charity-details/${charity.id}/`)}>View</button>
      <button className="favorite" onClick={() => toggleFavorite(charity)}>
        {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      </button>
      </div>
    </div>
    );
}



const DonorDashboard = () => {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://127.0.0.1:5000/charities/')
      .then((res) => res.json())
      .then((data) => {
        setCharities(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load charities. Please try again.');
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      // await fetch('/api/donor/logout', { method: 'POST' });
      dispatch(logout());
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
            <button onClick={() => navigate(`/donor/${id}`)} aria-label="Home">
              Home
            </button>
            <button onClick={() => navigate(`/donor/${id}/donation-history`)} aria-label="Donation History">
              Donation History
            </button>
            <button onClick={() => navigate(`/donor/${id}/beneficiary-stories`)} aria-label="Beneficiary Stories">
              Beneficiary Stories
            </button>
            <button onClick={() => navigate(`/donor/${id}/payments`)} aria-label="Donations & Payments">
              Donations & Payments
            </button>
            <button onClick={() => navigate(`/donor/${id}/settings`)} aria-label="Settings">
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
            <div className="menu-grid">
            {charities.map(charity => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
          </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DonorDashboard;