// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Use centralized Axios instance
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchUserGroups = async () => {
      try {
        const res = await axios.get('/groups');
        const userGroups = res.data.filter(
          (group) => group.admin._id === user._id || group.members.some(member => member._id === user._id)
        );
        setGroups(userGroups);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch your groups');
      }
    };
    fetchUserGroups();
  }, [user._id]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user.username}</h2>
      <Link to="/create-group" className="create-group-button">
        Create New Group
      </Link>
      <h3>Your Groups</h3>
      <div className="dashboard-groups">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div key={group._id} className="dashboard-group-card">
              <h4>{group.name}</h4>
              <p>{group.description}</p>
              <Link to={`/groups/${group._id}`} className="view-group-link">
                View Group
              </Link>
            </div>
          ))
        ) : (
          <p>You have not joined any groups yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
