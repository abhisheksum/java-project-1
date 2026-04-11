import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceActions } from '../api/api';

const AddResource = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', category: '', description: '', conditionStatus: 'GOOD'
  });
  
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resourceActions.create({ ...formData, ownerId: user.id });
      navigate('/resources');
    } catch (err) {
      alert("Failed to add resource");
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Add New Resource</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" name="category" className="form-control" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" className="form-control" onChange={handleChange} rows="4" required></textarea>
        </div>
        <div className="form-group">
          <label>Condition</label>
          <select name="conditionStatus" className="form-control" onChange={handleChange}>
            <option value="NEW">New</option>
            <option value="GOOD">Good</option>
            <option value="FAIR">Fair</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Resource</button>
      </form>
    </div>
  );
};

export default AddResource;
