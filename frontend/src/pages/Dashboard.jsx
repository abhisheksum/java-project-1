import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user }) => {
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>Welcome, {user.name}!</h1>
      
      <div className="grid">
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <h3 style={{ color: 'var(--primary)' }}>Browse Resources</h3>
          <p>Find textbooks, electronics, and tools shared by other students on campus.</p>
          <Link to="/resources" className="btn btn-primary" style={{ marginTop: 'auto' }}>View Resources</Link>
        </div>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <h3 style={{ color: 'var(--primary)' }}>Share a Resource</h3>
          <p>Help the community by sharing items you aren't currently using.</p>
          <Link to="/resources/add" className="btn btn-secondary" style={{ marginTop: 'auto' }}>Add Resource</Link>
        </div>
        
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start' }}>
          <h3 style={{ color: 'var(--primary)' }}>Manage Requests</h3>
          <p>Approve incoming requests or check the status of items you want to borrow.</p>
          <Link to="/borrow" className="btn btn-primary" style={{ marginTop: 'auto' }}>View Requests</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
