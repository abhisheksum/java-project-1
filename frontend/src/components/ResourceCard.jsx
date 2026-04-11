import React from 'react';

const ResourceCard = ({ resource, onBorrow }) => {
  const isAvailable = resource.availabilityStatus === 'AVAILABLE';
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>{resource.title}</h3>
      <p style={{ fontSize: '0.9rem', marginBottom: '1rem', fontStyle: 'italic' }}>Category: {resource.category}</p>
      <p style={{ marginBottom: '1.5rem', flex: 1 }}>{resource.description}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <span className={`status-badge ${resource.conditionStatus?.toLowerCase() || 'good'}`}>Condition: {resource.conditionStatus || 'GOOD'}</span>
        <span className={`status-badge ${resource.availabilityStatus?.toLowerCase()}`}>{resource.availabilityStatus}</span>
      </div>
      
      {onBorrow && isAvailable && (
        <button onClick={() => onBorrow(resource.id)} className="btn btn-primary" style={{ width: '100%', marginTop: 'auto' }}>
          Request to Borrow
        </button>
      )}
    </div>
  );
};

export default ResourceCard;
