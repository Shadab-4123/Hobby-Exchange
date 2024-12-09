import React, { useState, useEffect } from 'react';
import GroupCard from '../components/GroupCard';
import '../styles/GroupsPage.css';
import axios from 'axios';

function GroupsPage() {
  const [groups, setGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/groups');
        setGroups(res.data);
      } catch (error) {
        console.error('Fetch Groups Error:', error.response.data);
      }
    };
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
   return (
    <div className="groups-page">
      <h1>Explore Hobby Groups</h1>
      <input
        type="text"
        placeholder="Search groups..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="groups-grid">
        {filteredGroups.map((group) => (
          <GroupCard key={group._id} group={group} />
        ))}
        
      </div>

    </div>
  );
}

// Sample data in case backend is not available
const sampleGroups = [
  {
    _id: '1',
    name: 'Photography Enthusiasts',
    description: 'A place for photographers to share and learn.',
    image: '/images/photography.jpeg',
  },
  {
    _id: '2',
    name: 'Cooking Lovers',
    description: 'Share recipes and cooking tips.',
    image: '/images/cooking.jpeg',
  },
  {
    _id: '3',
    name: 'Hiking Adventures',
    description: 'Organize hikes and share experiences.',
    image: '/images/hiking.jpeg',
  },
  {
    _id: '4',
    name: 'Book Club',
    description: 'Discuss your favorite books and authors.',
    image: '/images/books.jpeg',
  },
  {
    _id: '5',
    name: 'Art & Painting',
    description: 'Express yourself through art.',
    image: '/images/art.jpeg',
  },
  {
    _id: '6',
    name: 'Music Makers',
    description: 'Collaborate and share music.',
    image: '/images/music.jpeg',
  },
];

export default GroupsPage;
