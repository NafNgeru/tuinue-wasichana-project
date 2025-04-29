import React from 'react';
import { useParams } from 'react-router-dom';
import "../../styles/StoryManagement.css"

const StoryManagement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/api/charities/${id}/stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert('Story posted successfully!');
        setTitle('');
        setContent('');
      });
  };

  return (
    <div className="charity-details-container">
      <h2>Post a New Story</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Story title"
          required
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Story content"
          required
        />
        <button type="submit">Post Story</button>
      </form>
    </div>
  );
};

export default StoryManagement;
