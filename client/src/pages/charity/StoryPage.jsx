import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/StoryPage.css';

const StoryPage = () => {
  const { id } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/charities/${id}/stories`)
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching stories:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading-text">Loading stories...</p>;

  if (stories.length === 0) {
    return <p className="no-stories">No stories have been posted for this charity yet.</p>;
  }

  return (
    <div className="stories-container">
      <h2 className="stories-heading">Charity Stories</h2>
      {stories.map((story) => (
        <div key={story.id} className="story-card">
          <h3 className="story-title">{story.title}</h3>
          <p className="story-date">{new Date(story.date).toLocaleDateString()}</p>
          <p className="story-content">{story.content}</p>
          <p className="story-charity"><strong>Charity:</strong> {story.charity_name}</p>
        </div>
      ))}
    </div>
  );
};

export default StoryPage;
