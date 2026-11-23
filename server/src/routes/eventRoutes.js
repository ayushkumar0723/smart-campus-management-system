const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  rsvpEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getEvents);
router.post('/', authenticate, authorize('admin', 'faculty'), createEvent);
router.post('/:id/rsvp', authenticate, rsvpEvent);
router.put('/:id', authenticate, authorize('admin', 'faculty'), updateEvent);
router.delete('/:id', authenticate, authorize('admin'), deleteEvent);

module.exports = router;
