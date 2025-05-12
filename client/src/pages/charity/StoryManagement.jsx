import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import "../../styles/StoryManagement.css";

const StoryPage = () => {
  const { id } = useParams();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/charity/${id}/stories`)
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
          {story.image_url && (
            <img src={`http://127.0.0.1:5000${story.image_url}`} alt="Story visual" className="story-image" />
          )}
        </div>
      ))}
    </div>
  );
};

const StoryManagement = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const { id } = useParams();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleImageURL = (e) => {
    setImageURL(e.target.value);
    setPreview(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    } else if (imageURL) {
      formData.append("image_url", imageURL);
    }

    try {
      const res = await fetch(`http://127.0.0.1:5000/charity/${id}/stories`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to post story');
      alert('Story posted successfully!');
      setTitle('');
      setContent('');
      setImageFile(null);
      setImageURL('');
      setPreview(null);
    } catch (err) {
      alert('Error posting story: ' + err.message);
    }
  };

  return (
    <div>
      <StoryPage />
      <div className="charity-details-container">
        <h2>Post a New Story</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
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
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className="story-image" />
          )}
          <button type="submit">Post Story</button>
        </form>
      </div>
    </div>
  );
};

export default StoryManagement;
