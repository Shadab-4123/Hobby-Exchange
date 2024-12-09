import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GroupCard.css';

function GroupCard({ group }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/groups/${group._id}`);
  };

  return (
    <div className="group-card" onClick={handleClick}>
      <div className="group-image" style={{ backgroundImage: `url(${group.image})` }}>
        <div className="group-overlay">
          <h3>{group.name}</h3>
          <p>{group.description}</p>
        </div>
      </div>
    </div>
  );
}

export default GroupCard;
