// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import GroupIcon from '../assets/photography.jpeg'; // Placeholder icon for groups

const Home = () => {
  const { user } = useAuth(); // Access authenticated user from context
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [joiningGroupId, setJoiningGroupId] = useState(null); // Tracks which group is being joined
  const [message, setMessage] = useState(null); // Notification message
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://hobby-exchange.onrender.com/api';
        const res = await axios.get(`${API_URL}/groups`);
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
        setMessage('Failed to fetch groups. Please try again later.');
        setMessageType('error');
      } finally {
        setLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleJoin = async (groupId) => {
    if (!user) {
      setMessage('You must be logged in to join a group.');
      setMessageType('info');
      return;
    }

    setJoiningGroupId(groupId);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://hobby-exchange.onrender.com/api';
      await axios.post(`${API_URL}/groups/${groupId}/join`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include JWT token
        },
      });
      setMessage('Successfully joined the group!');
      setMessageType('success');

      // Update the specific group in the state to include the new member
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group._id === groupId
            ? { ...group, members: [...group.members, user.id] } // Assuming user.id matches the format in group.members
            : group
        )
      );
    } catch (err) {
      console.error('Failed to join the group:', err.response?.data?.message || err.message);
      setMessage(err.response?.data?.message || 'Failed to join the group. Please try again.');
      setMessageType('error');
    } finally {
      setJoiningGroupId(null);
    }
  };

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(search.toLowerCase()) ||
      group.category.toLowerCase().includes(search.toLowerCase())
  );

  // Function to clear messages after a certain time
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
        setMessageType('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Hobby Exchange</h1>
          <p>Connect with enthusiasts, share your passions, and join exciting hobby groups!</p>
          {/* <Link to="/create-group" className="cta-button">Create a Group</Link> */}
        </div>
      </section>

      {/* Search Bar */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Search groups by name or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </section>

      {/* Notification Message */}
      {message && (
        <div className={`notification ${messageType}`}>
          {message}
        </div>
      )}

      {/* Groups Grid */}
      <section className="groups-section">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading groups...</p>
          </div>
        ) : (
          <div className="groups-grid">
            {filteredGroups.length > 0 ? (
              filteredGroups.map((group) => {
                const isMember = user && group.members.includes(user.id); // Check if user is already a member
                return (
                  <div key={group._id} className="group-card">
                    {/* <img src={group.image || GroupIcon} alt={`${group.name} Logo`} className="group-image" /> */}
                    <div className="group-content">
                      <h3>{group.name}</h3>
                      <p className="group-description">{group.description}</p>
                      <p className="group-category">Category: {group.category}</p>
                      <p className="group-members">Members: {group.members.length}</p>
                      {user ? (
                        isMember ? (
                          <button className="joined-button" disabled>
                            Joined
                          </button>
                        ) : (
                          <button
                            className="join-button"
                            onClick={() => handleJoin(group._id)}
                            disabled={joiningGroupId === group._id}
                          >
                            {joiningGroupId === group._id ? 'Joining...' : 'Join Group'}
                          </button>
                        )
                      ) : (
                        <div className="login-prompt">
                          {/* <p>You must be logged in to join a group.</p> */}
                          <Link to="/login" className="prompt-link">Login</Link> or <Link to="/register" className="prompt-link">Register</Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="no-groups">No groups found. Try adjusting your search.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
