import React from 'react';

const BorrowRequests = () => {
  return (
    <div className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Borrow Requests</h2>
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Your requests dashboard is actively standing by.
        </p>
        <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', marginBottom: '2rem' }}>
          (To fully display and manage active requests, ensure your backend exposes a GET /api/borrow endpoint.)
        </p>
        <button className="btn btn-secondary" onClick={() => window.location.reload()}>
          Refresh Status
        </button>
      </div>
    </div>
  );
};

export default BorrowRequests;
