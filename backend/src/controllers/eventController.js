// eventController.js
const Event = require('../models/Event');

// Get all events for a specific group
exports.getAllEvents = async (req, res) => {
    const { groupId } = req.params;
    try {
        const events = await Event.find({ group: groupId });
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const { groupId } = req.params;
    const { name, description, date, location } = req.body;

    try {
        const newEvent = new Event({
            group: groupId,
            name,
            description,
            date,
            location,
        });

        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err });
    }
};

// Get details of a specific event
exports.getEventDetails = async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event details', error: err });
    }
};

// Update event details
exports.updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const updates = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, { new: true });
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err });
    }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err });
    }
};

// Participate in an event
exports.participateInEvent = async (req, res) => {
    const { eventId } = req.params;
    const { userId } = req.body;  // Assuming user participation is based on userId
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        // Add the user to the participants list (or a similar approach)
        event.participants.push(userId);  // Assuming you have a participants field
        await event.save();
        res.status(200).json({ message: 'Successfully joined the event' });
    } catch (err) {
        res.status(500).json({ message: 'Error participating in the event', error: err });
    }
};
