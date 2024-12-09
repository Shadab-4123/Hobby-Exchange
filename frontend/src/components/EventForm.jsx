import React, { useState } from 'react';
import { createEvent } from '../services/eventService';
import './EventForm.css'; // Make sure the CSS file is imported

const EventForm = ({ groupId }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = { name, description, date, location };

        try {
            const createdEvent = await createEvent(groupId, newEvent);
            console.log('Event created:', createdEvent);
        } catch (err) {
            console.error('Failed to create event:', err.message);
        }
    };

    return (
        <div className="event-form-container">
            <h2>Create New Event</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Event Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Event Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default EventForm;
