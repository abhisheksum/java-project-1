import React, { useEffect, useState } from 'react';
import { resourceActions, borrowActions } from '../api/api';
import ResourceCard from '../components/ResourceCard';

const ResourceListing = ({ user }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const data = await resourceActions.getAll();
      setResources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBorrow = async (resourceId) => {
    try {
      await borrowActions.request({ resourceId, borrowerId: user.id });
      alert("Borrow request submitted securely!");
      fetchResources();
    } catch (err) {
      alert(err.response?.data?.error || "Error requesting resource");
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '2rem' }}>Available Resources</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid">
          {resources.map(res => (
            <ResourceCard 
              key={res.id} 
              resource={res} 
              onBorrow={res.ownerId !== user.id ? handleBorrow : null} 
            />
          ))}
          {resources.length === 0 && <p>No resources found on campus.</p>}
        </div>
      )}
    </div>
  );
};

export default ResourceListing;
