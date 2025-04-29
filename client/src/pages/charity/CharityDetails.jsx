import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/CharityDetails.css';

const CharityDetails = ({ charity }) => {
  const navigate = useNavigate();

  const handleViewStories = () => {
    navigate(`/charities/${charity.id}/stories`);
  };

  return (
    <div className="charity-details-container">
      <img
        src={charity.image || '/placeholder.jpg'}
        alt={charity.full_name}
        className="charity-image"
      />
      <h2 className="charity-name">{charity.full_name}</h2>
      <p className="charity-description">{charity.description}</p>
      <div className="charity-contact">
        <p><strong>Email:</strong> {charity.email}</p>
        <p><strong>Contact:</strong> {charity.contact}</p>
        {charity.website_url && (
          <p>
            <strong>Website:</strong>{' '}
            <a href={charity.website_url} target="_blank" rel="noopener noreferrer">
              {charity.website_url}
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
