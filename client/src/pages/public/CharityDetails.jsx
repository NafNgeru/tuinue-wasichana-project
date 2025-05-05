import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/CharityDetails.css';

const CharityDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [charityItem, setCharityItems] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/charities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setCharityItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!charityItem) return <p>Charity not found</p>;

  const handleViewStories = () => {
    navigate(`/charities/${charityItem.id}/stories`);
  };

  return (
    <div className="charity-details-container">
      <img
        src={charityItem.image}
        alt={charityItem.full_name}
        className="charity-image"
      />
      <h2 className="charity-name">{charityItem.full_name}</h2>
      <p className="charity-description">{charityItem.description}</p>
      <div className="charity-contact">
        <p><strong>Email:</strong> {charityItem.email}</p>
        <p><strong>Contact:</strong> {charityItem.contact}</p>
        {charityItem.website_url && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={charityItem.website_url} target="_blank" rel="noopener noreferrer">
              {charityItem.website_url}
            </a>
          </p>
        )}
      </div>
      <button className="view-stories-button" onClick={handleViewStories}>
        View Stories
      </button>
    </div>
  );
};

export default CharityDetails;
