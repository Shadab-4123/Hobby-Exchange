import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';  // Assuming you have an axios instance set up

const EventList = ({ groupId }) => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Correcting the URL path to avoid the double /api
                const res = await axios.get(`/groups/${groupId}/events`);
                setEvents(res.data);
            } catch (err) {
                setError(err.message);
                console.error('Error fetching events:', err);
            }
        };

        fetchEvents();
    }, [groupId]);

    const formatEventDate = (dateString) => {
        const eventDate = new Date(dateString);
        const formattedDate = eventDate.toLocaleDateString(); // Format date (MM/DD/YYYY)
        const formattedTime = eventDate.toLocaleTimeString(); // Format time (HH:MM AM/PM)
        return { formattedDate, formattedTime };
    };

    const handleDelete = async (eventId) => {
        try {
            // API call to delete the event
            await axios.delete(`/groups/${groupId}/events/${eventId}`);
            // Remove the deleted event from the list
            setEvents(events.filter(event => event._id !== eventId));
            alert('Event deleted successfully!');
        } catch (err) {
            setError('Failed to delete event');
            console.error('Error deleting event:', err);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!events.length) {
        return <div>No events available.</div>;
    }

    return (
        <div className="event-list-container">
            <h2>Upcoming Events</h2>
            <div className="event-list">
                {events.map((event) => {
                    const { formattedDate, formattedTime } = formatEventDate(event.date);

                    return (
                        <div key={event._id} className="event-card">
                            <h3 className="event-name">{event.name}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-details">
                                <p className="event-date">{formattedDate}</p>
                                <p className="event-time">{formattedTime}</p>
                            </div>
                            {/* Add a Delete button */}
                            <button className="delete-btn" onClick={() => handleDelete(event._id)}>
                                Delete
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EventList;
