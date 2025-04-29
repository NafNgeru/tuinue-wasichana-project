import React from "react";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import "../../styles/CharityListingPage.css"
import { useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function CharityCard({item}){
    const navigate = useNavigate ();
    const [favorites, setFavorite] = useState([]);

    const toggleFavorite = (item) => {
        setFavorite(prev => {
            const exists = prev.find(fav => fav.id === item.id);
            return exists
            ? prev.filter(fav => fav.id !== item.id) : [...prev, item];
        })
    }

    const isFavorite = (itemId) => {
        return favorites.some(fav => fav.id === itemId); //.some() returns a boolean value true or false when checking if an item is favorite or not
    }

    const favorited = isFavorite(item.id);

    return(
    <div className="menu-card">
      <img className="item-image" alt="charity" src={item.image_url} />
      <h2 className="item-title">{item.name}</h2>
      <div className="card-buttons">
        <button className="donate" onClick={() => navigate('/payment-page')}><p>Donate</p></button>
        <button className="view" onClick={() => navigate('/charity-details')}>View</button>
        <button className="favorite" onClick={() => toggleFavorite(item)}>
          {favorited ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
        </button>
      </div>
    </div>
    );
}

function CharityListingPage(){
    const [charityItem, setCharityItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("/api/charity/")
        .then((res) => res.json())
        .then((data) => {
          const transformed = data.map(row => ({
            id: row[0],
            name: row[1],
            image_url: row[2],
          }));
    
        //   console.log("Transformed Data:", transformed);
          setCharityItems(transformed);charities
          setLoading(false);
        })
        .catch(err => console.error('Fetch error:', err));
        setLoading(false);
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="app">
          <Header />
          <div className="menu-grid">
            {charityItem.map(item => (
              <CharityCard key={item.id} item={item} />
            ))}
          </div>
          <Footer />
        </div>
      );
}

export default CharityListingPage;