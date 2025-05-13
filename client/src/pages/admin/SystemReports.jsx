import React from 'react';

const SystemReports = () => {
  return (
    <section>
      <h1>System Reports</h1>
      <button
        onClick={() => window.history.back()}
        className="mb-4 bg-gray-600 text-white rounded px-4 py-2 hover:bg-gray-700"
      >
        Back to Dashboard
      </button>
      <p>View system reports here.</p>
    </section>
  );
};

export default SystemReports;