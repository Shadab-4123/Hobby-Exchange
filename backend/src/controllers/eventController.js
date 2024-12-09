const Event = require('../models/Event');
const Group = require('../models/Group');  // Assuming there's a Group model

// Get all events for a group
exports.getAllEvents = async (req, res) => {
    try {
        console.log('Fetching events for group:', req.params.groupId);  // Debug log
        
        // Ensure the group exists
        const group = await Group.findById(req.params.groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const events = await Event.find({ groupId: req.params.groupId });
        if (!events || events.length === 0) {
            return res.status(404).json({ message: 'No events found for this group' });
        }
        
        res.status(200).json(events);
    } catch (err) {
        console.error(err);  // Log errors
        res.status(500).json({ message: 'Failed to get events', error: err.message });
    }
};

// Create a new event
exports.createEvent = async (req, res) => {
    const { name, description, date, location } = req.body;
    const { groupId } = req.params;

    try {
        // Ensure the group exists
        const group = await Group.findById(groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const event = new Event({
            name,
            description,
            date,
            location,
            groupId,
        });

        await event.save();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create event', error: err.message });
    }
};

// Get event details
exports.getEventDetails = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get event details', error: err.message });
    }
};

// Update an event
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true });
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update event', error: err.message });
    }
};

// Delete an event
router.delete('/events/:eventId', async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete event', error: err.message });
    }
});

module.exports = router;

// Participate in an event
exports.participateInEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (event.participants.includes(req.user._id)) {
            return res.status(400).json({ message: 'You are already participating in this event' });
        }

        event.participants.push(req.user._id);
        await event.save();

        res.status(200).json({ message: 'You have successfully joined the event' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to join the event', error: err.message });
    }
};
