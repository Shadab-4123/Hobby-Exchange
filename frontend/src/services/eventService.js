import axios from '../axiosConfig';

const API_URL = '/api';  // Assuming base URL is /api

// Get all events in a group
export const getEvents = (groupId) => {
    return axios.get(`${API_URL}/groups/${groupId}/events`);
};

// Create a new event
export const createEvent = async (groupId, newEvent) => {
    try {
        // Make POST request to the correct URL
        const response = await axios.post(`/groups/${groupId}/events`, newEvent);  // Correct URL format
        return response.data;  // Return the event data
    } catch (err) {
        console.error('Error creating event:', err);
        throw err;  // Re-throw the error for further handling
    }
};
// Get event details
export const getEventDetails = (eventId) => {
    return axios.get(`${API_URL}/events/${eventId}`);
};

// Update event
export const updateEvent = (eventId, eventData) => {
    return axios.put(`${API_URL}/events/${eventId}`, eventData);
};

// Delete event
export const deleteEvent = (eventId) => {
    return axios.delete(`${API_URL}/events/${eventId}`);
};

// Participate in an event
export const participateInEvent = (eventId) => {
    return axios.post(`${API_URL}/events/${eventId}/participate`);
};


// Fetch events for a specific group
export const fetchEvents = async (groupId) => {
    try {
        const response = await axios.get(`${API_URL}/groups/${groupId}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error.response?.data || error.message);
        throw error;
    }
};