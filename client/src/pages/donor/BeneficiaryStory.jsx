import React, { useState, useEffect } from 'react';
import Charities from Charities
import './BeneficiaryStories.css';

const CharityListWithStory = () => {
    const [charities, setCharities] = useState([])
    const [selectedCharity, setSelectedCharity] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch charirties donor has donated to
    useEffect(() => {
        const fetchCharities = async () => {
            const response = await fetch('/api/donations');
            const data = await response.json();
            setCharities (data);           
        };
        fetchCharities();
  }, []);

      // Open modal to show story of a selected charity
    const handleOpenModal = () => {
        setSelectedCharity(charity);
        setIsModalOpen(true);

    };

    const handleCloseMOdal = ()  => {
        setIsModalOpen(false);
        setSelectedCharity(null);  
    };

    return (
        <div>
          <h1>Your Charities</h1>
          <ul>
            {charities.map((charity) => (
              <li key={charity.id}>
                <div>{charity.name}</div>
                <button onClick={() => handleOpenModal(charity)}>
                  View Beneficiary Story
                </button>
              </li>
            ))}
          </ul>

          {isModalOpen && (
        <BeneficiaryStoryModal 
          charity={selectedCharity} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  ); 
};
      // Modal to show the beneficiary story of a charity
const BeneficiaryStoryModal = ({charity, onClose}) => {
  const [showFullStory, setShowFullStory] = usestate(false);

  if (!charity) return null;

  const {name, beneficiaryStory} = charity

  const handleSeeMoreClick = () => {
    setShowFullStory(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{name} - Beneficiary Story</h2>
        {beneficiaryStory ? (
          <p>
            {showFullStory ? beneficiaryStory : `${beneficiaryStory.slice(0, 100)}...`}
          </p>
        ) : (
          <p>No beneficiary story found</p>
        )}
        {!showFullStory && beneficiaryStory && (
          <button onClick={handleSeeMoreClick}>See More</button>
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};




export default BeneficiaryStory;