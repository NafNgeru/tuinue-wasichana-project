import { useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../features/auth/authSlice";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CharityCard = ({ charity, handleDonateClick, toggleFavorite, favorited }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 w-[300px]">
      <img className="w-full h-40 object-cover rounded-xl mb-4" alt="charity" src={
    charity.image.startsWith("http")
      ? charity.image
      : `http://127.0.0.1:5000/${charity.image}`} />
      <h3 className="text-xl font-bold text-gray-800 mb-2">{charity.full_name}</h3>
      <p className="text-gray-600 text-sm mb-4">
        {charity.description || 'No description available.'}
      </p>
      <div className="flex justify-between items-center">
        <button
          className="bg-[#445d82] text-white px-4 py-2 rounded-xl hover:bg-orange-400"
          onClick={() => handleDonateClick(charity.id)}
        >
          Donate Now
        </button>
        <button
          className="text-[#445d82] hover:text-orange-400 font-medium"
          onClick={() => navigate(`/charity-details/${charity.id}`)}
        >
          View
        </button>
        <button onClick={() => toggleFavorite(charity)}>
          {favorited ? <AiFillHeart className="text-red-500 text-xl" /> : <AiOutlineHeart className="text-xl" />}
        </button>
      </div>
    </div>
  );
};

const DonorDashboard = () => {
  const [charities, setCharities] = useState([]);
  const [favoriteCharities, setFavoriteCharities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('all');

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
      .catch(() => {
        setError('Failed to load charities. Please try again.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCharities');
    if (savedFavorites) {
      setFavoriteCharities(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteCharities', JSON.stringify(favoriteCharities));
  }, [favoriteCharities]);

  const toggleFavorite = (charity) => {
    setFavoriteCharities((prev) => {
      const isFavorited = prev.some((c) => c.id === charity.id);
      return isFavorited ? prev.filter((c) => c.id !== charity.id) : [...prev, charity];
    });
  };

  const handleDonateClick = (charityId) => {
    navigate(`/donor/${id}/donate/${charityId}`);
  };

  const handleLogout = async () => {
    dispatch(logout());
    navigate('/login');
  };

  const displayedCharities = tab === 'favorites' ? favoriteCharities : charities;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-[400px] bg-blue-100 p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-10 text-[#445d82]">Welcome {user?.full_name}</h2>
        <nav className="flex flex-col gap-4">
          <NavLink to={`/donor/${id}`} end className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400">
            Home
          </NavLink>
          <NavLink to={`/donor/${id}/donation-history`} className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400">
            Donation History
          </NavLink>
          <NavLink to={`/donor/${id}/beneficiary-stories`} className="bg-[#445d82] text-white text-center py-3 rounded-xl font-medium hover:bg-orange-400">
            Beneficiary Stories
          </NavLink>
          <button
            onClick={handleLogout}
            className="mt-10 bg-[#445d82] text-white w-full py-3 rounded-xl hover:bg-purple-800"
          >
            Logout
          </button>
        </nav>
      </aside>

  <main className="flex-1 p-8">
    <div className="max-w-screen-xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Choose a Charity to Support</h1>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className={`px-4 py-2 rounded-xl font-medium ${tab === 'all' ? 'bg-[#445d82] text-white' : 'bg-white text-[#445d82] border border-[#445d82]'}`}
            onClick={() => setTab('all')}
          >
            All Charities
          </button>
          <button
            className={`px-4 py-2 rounded-xl font-medium ${tab === 'favorites' ? 'bg-[#445d82] text-white' : 'bg-white text-[#445d82] border border-[#445d82]'}`}
            onClick={() => setTab('favorites')}
          >
            Favorites
          </button>
        </div>
      </header>

      {loading ? (
        <p className="text-center text-gray-600">Loading charities...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : displayedCharities.length === 0 ? (
        <p className="text-center text-gray-600">{tab === 'favorites' ? 'No favorites yet.' : 'No charities available.'}</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-start">
          {displayedCharities.map((charity) => (
            <CharityCard
              key={charity.id}
              charity={charity}
              handleDonateClick={handleDonateClick}
              toggleFavorite={toggleFavorite}
              favorited={favoriteCharities.some((c) => c.id === charity.id)}
            />
          ))}
        </div>
      )}
    </div>
  </main>
</div>
  );
};

export default DonorDashboard;