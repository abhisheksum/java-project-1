import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="nav-brand">CampusShare</Link>
      <div className="nav-links">
        <Link to="/resources">Resources</Link>
        <Link to="/borrow">Borrow Requests</Link>
        <span style={{ fontWeight: 600, color: 'var(--text-dark)', marginLeft: '1rem' }}>{user.name}</span>
        <button onClick={onLogout} className="btn btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
