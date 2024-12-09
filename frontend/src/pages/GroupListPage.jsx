import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GroupListPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get('https://hobby-exchange.onrender.com/api/groups');
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="group-list-page">
      <h2>Available Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id}>
            <Link to={`/groups/${group._id}`}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupListPage;
