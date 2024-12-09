const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define the routes
router.get('/groups/:groupId/events', eventController.getAllEvents);
router.post('/groups/:groupId/events', eventController.createEvent);
router.get('/api/events/:eventId', eventController.getEventDetails);
router.put('/api/events/:eventId', eventController.updateEvent);
router.delete('/api/events/:eventId', eventController.deleteEvent);
router.post('/api/events/:eventId/participate', eventController.participateInEvent);

module.exports = router;
