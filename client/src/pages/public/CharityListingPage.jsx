import React, { useState, useEffect } from "react";
import "../../styles/CharityListingPage.css"
import { useNavigate } from 'react-router-dom'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

function CharityCard({charity}){
    const navigate = useNavigate ();
    const [favorites, setFavorite] = useState([]);

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

    return(
    <div className="menu-card">
      <img className="item-image" alt="charity" src={charity.image} />
      <h2 className="item-title">{charity.full_name}</h2>
      <div className="card-buttons">
        <button className="donate" onClick={() => navigate('/donate/:id')}><p>Donate</p></button>
        <button className="view" onClick={() => navigate(`/charity-details/${charity.id}/`)}>View</button>
        <button className="favorite" onClick={() => toggleFavorite(charity)}>
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
      fetch("http://127.0.0.1:5000/charities/")
        .then((res) => res.json())
        .then((data) => {
          setCharityItems(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setLoading(false);
        });
    }, []);    

    if (loading) return <p>Loading...</p>;

    return (
        <div className="app">
          <div className="menu-grid">
            {charityItem.map(charity => (
              <CharityCard key={charity.id} charity={charity} />
            ))}
          </div>
        </div>
      );
}

export default CharityListingPage;