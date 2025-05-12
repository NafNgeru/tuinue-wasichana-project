import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../../styles/BeneficiaryStory.css";

const BeneficiaryStory = () => {
  const [charities, setCharities] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const donationsRes = await fetch(`http://127.0.0.1:5000/donors/${id}/donations`);
        const donations = await donationsRes.json();
    
        const charityIds = [...new Set(donations.map((d) => d.charity_id).filter(id => id !== undefined))];
    
        const charitiesWithStories = await Promise.all(
          charityIds.map(async (charityId) => {
            const charityRes = await fetch(`http://127.0.0.1:5000/charities/${charityId}`);
            const charity = await charityRes.json();
    
            const storiesRes = await fetch(`http://127.0.0.1:5000/charity/${charityId}/stories`);
            const stories = await storiesRes.json();
    
            return {
              ...charity,
              stories,
            };
          })
        );
    
        setCharities(charitiesWithStories);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load beneficiary stories. Please try again.');
        setLoading(false);
      }
    };
    

    fetchData();
  }, [id]);

  const openModal = (story) => {
    setSelectedStory(story);
    setShowFullStory(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
    setShowFullStory(false);
  };

  return (
    <div className="beneficiary-stories">
      <h2>Beneficiary Stories</h2>
      {loading ? (
        <p>Loading stories...</p>
      ) : error ? (
        <p>{error}</p>
      ) : charities.length === 0 ? (
        <p>You haven't donated to any charities with stories yet.</p>
      ) : (
        <ul>
          {charities.map((charity) =>
            charity.stories && charity.stories.length > 0 ? (
              charity.stories.map((story) => (
                <li key={story.id} className="story-card">
                  <h3>{story.title}</h3>
                  <p><strong>Charity:</strong> {charity.name}</p>
                  {story.beneficiary_name && (
                    <p><strong>Beneficiary:</strong> {story.beneficiary_name}</p>
                  )}
                  <p>
                    {showFullStory && selectedStory?.id === story.id
                      ? story.content
                      : story.content.slice(0, 120) + '...'}
                  </p>
                  {story.image_url && (
                    <img
                      src={`http://127.0.0.1:5000${story.image_url}`}
                      alt={story.title}
                      style={{ maxWidth: '200px', marginTop: '10px' }}
                    />
                  )}
                  <button onClick={() => openModal(story)}>
                    View Full Story
                  </button>
                </li>
              ))
            ) : (
              <li key={charity.id}>
                <h3>{charity.name}</h3>
                <p>No stories available for this charity.</p>
              </li>
            )
          )}
        </ul>
      )}

      {isModalOpen && selectedStory && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedStory.title}</h2>
            <p><strong>Beneficiary:</strong> {selectedStory.beneficiary_name}</p>
            <p>{showFullStory ? selectedStory.content : selectedStory.content.slice(0, 300) + '...'}</p>
            {selectedStory.image_url && (
              <img
                src={`http://127.0.0.1:5000${selectedStory.image_url}`}
                alt={selectedStory.title}
                style={{ maxWidth: '100%', marginTop: '10px' }}
              />
            )}
            <button onClick={() => setShowFullStory(!showFullStory)}>
              {showFullStory ? 'See Less' : 'See More'}
            </button>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeneficiaryStory;