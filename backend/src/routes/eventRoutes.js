// eventRoutes.js
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define the routes
router.get('/groups/:groupId/events', eventController.getAllEvents);
router.post('/groups/:groupId/events', eventController.createEvent);
router.get('/events/:eventId', eventController.getEventDetails);  // Fixed path
router.put('/events/:eventId', eventController.updateEvent);      // Fixed path
router.delete('/events/:eventId', eventController.deleteEvent);  // Fixed path
router.post('/events/:eventId/participate', eventController.participateInEvent);

module.exports = router;
