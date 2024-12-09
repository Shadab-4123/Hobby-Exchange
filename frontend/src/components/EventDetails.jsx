import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig'; // Import the centralized axios instance
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './EventDetails.css';

const EventDetails = () => {
  const { eventId } = useParams(); // Event ID from the URL
  const { user } = useAuth(); // User information from context
  const [event, setEvent] = useState(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const res = await axios.get(`/events/${eventId}`);
        setEvent(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch event details');
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  // Handle participation in the event
  const handleParticipate = async () => {
    if (!user) {
      alert('You must be logged in to participate!');
      return;
    }

    try {
      await axios.post(`/events/${eventId}/participate`);
      setIsParticipating(true);
      alert('You are now participating in this event!');
    } catch (err) {
      console.error(err);
      alert('Failed to participate in the event');
    }
  };

  // Handle event deletion
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`/events/${eventId}`);
        alert('Event deleted successfully!');
        navigate('/events'); // Redirect to the events list after deletion
      } catch (err) {
        console.error(err);
        alert('Failed to delete the event');
      }
    }
  };

  // Display loading state if fetching event
  if (loading) return <div>Loading event details...</div>;

  // Event details view
  return (
    <div className="event-details-container">
      <h2 className="event-title">{event.name}</h2>
      <p className="event-description">{event.description}</p>
      <p className="event-date">Date: {new Date(event.date).toLocaleDateString()}</p>
      <p className="event-location">Location: {event.location}</p>

      {user && !isParticipating ? (
        <button onClick={handleParticipate} className="participate-button">
          Participate
        </button>
      ) : (
        <p>{isParticipating ? 'You are participating in this event.' : 'You must log in to participate.'}</p>
      )}

      {/* Only show delete button if the user is the event creator */}
      {user && user._id === event.createdBy && (
        <button onClick={handleDelete} className="delete-button">
          Delete Event
        </button>
      )}
    </div>
  );
};

export default EventDetails;
