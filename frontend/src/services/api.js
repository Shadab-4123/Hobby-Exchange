import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};

// Function to get all hobby groups
export const getAllGroups = async () => {
    const response = await axios.get(`${API_URL}/groups`);
    return response.data;
  };
  
  // Function to create a new group
  export const createGroup = async (groupData) => {
    const response = await axios.post(`${API_URL}/groups/create`, groupData, { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    });
    return response.data;
  };
  
  // Function to join a group
  export const joinGroup = async (groupId) => {
    const response = await axios.post(`${API_URL}/groups/join`, { groupId }, { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    });
    return response.data;
  };
  
  // Function to create a post in a group
  export const createPost = async (postData) => {
    const response = await axios.post(`${API_URL}/posts/create`, postData, { 
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } 
    });
    return response.data;
  };
  
  // Function to get all posts in a group
  export const getPostsByGroup = async (groupId) => {
    const response = await axios.get(`${API_URL}/posts/${groupId}`);
    return response.data;
  };
  
  // **Exporting the new getUserGroups function**
  export const getUserGroups = async () => {
    const response = await axios.get(`${API_URL}/groups/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    return response.data;
  };

  export const createEvent = async (groupId, eventData) => {
    try {
        const response = await axios.post(`/groups/${groupId}/events`, eventData);
        return response.data;
    } catch (error) {
        console.error('Error creating event:', error);
        throw error;
    }
};