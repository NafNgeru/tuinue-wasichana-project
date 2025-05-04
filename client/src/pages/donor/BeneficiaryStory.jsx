import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { apiFetch } from '../utils/api';

const BeneficiaryStories = () => {
  const [charities, setCharities] = useState([]);
  const [donatedCharityIds, setDonatedCharityIds] = useState([]);
  const [selectedCharity, setSelectedCharity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const donations = await apiFetch('/api/donor/donations');
        const charityIds = [...new Set(donations.map((d) => d.charity_id))];
        setDonatedCharityIds(charityIds);
        const allCharities = await apiFetch('/api/donor/charities');
        const filteredCharities = allCharities.filter((charity) =>
          charityIds.includes(charity.id)
        );
        setCharities(filteredCharities);
        setLoading(false);
      } catch (err) {
        setError('Failed to load beneficiary stories. Please try again.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openModal = (charity) => {
    setSelectedCharity(charity);
    setShowFullStory(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCharity(null);
    setShowFullStory(false);
  };

  return (
    <div>
      <h2>Beneficiary Stories</h2>
      {loading ? (
        <p>Loading stories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : donatedCharityIds.length === 0 ? (
        <p>You haven't donated to any charities yet.</p>
      ) : charities.length === 0 ? (
        <p>No stories available for your donated charities.</p>
      ) : (
        <ul>
          {charities.map((charity) => (
            <li key={charity.id}>
              <h3>{charity.name}</h3>
              <p>
                {charity.beneficiary_story
                  ? charity.beneficiary_story.slice(0, 100) + '...'
                  : 'No story available.'}
              </p>
              <button
                onClick={() => openModal(charity)}
                aria-label={`View Beneficiary Story for ${charity.name}`}
              >
                View Beneficiary Story
              </button>
            </li>
          ))}
        </ul>
      )}
      {isModalOpen && (
        <div>
          <div>
            <h2>{selectedCharity.name} - Beneficiary Story</h2>
            <p>
              {selectedCharity.beneficiary_story
                ? showFullStory
                  ? selectedCharity.beneficiary_story
                  : selectedCharity.beneficiary_story.slice(0, 100) + '...'
                : 'No beneficiary story found.'}
            </p>
            {selectedCharity.beneficiary_story && (
              <button
                onClick={() => setShowFullStory(!showFullStory)}
                aria-label={showFullStory ? 'See Less' : 'See More'}
              >
                {showFullStory ? 'See Less' : 'See More'}
              </button>
            )}
            <button onClick={closeModal} aria-label="Close Modal">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryStories;