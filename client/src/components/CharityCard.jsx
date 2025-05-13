import React from 'react';

const CharityCard = ({ charity, onDelete }) => {
  const handleDeleteClick = () => {
    onDelete(charity.id);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{charity.full_name}</h3>
        <p className="text-gray-600">{charity.description}</p>
        <p className="text-sm text-blue-600 mt-1">
          <a href={charity.website_url} target="_blank" rel="noopener noreferrer">
            {charity.website_url}
          </a>
        </p>
      </div>
      <button
        onClick={handleDeleteClick}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mt-4 md:mt-0 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default CharityCard;