const { Events } = require('../models/dataStore');

// Get all events with search & filter
const getEvents = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    let list = await Events.find();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      list = list.filter(e => e.category === category);
    }

    // Sort by date upcoming
    list.sort((a, b) => new Date(a.date) - new Date(b.date));

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Create event (Admin & Faculty)
const createEvent = async (req, res, next) => {
  try {
    const { title, description, category, venue, date, time, organizer, capacity, isOnline } = req.body;

    if (!title || !description || !venue || !date || !time) {
      return res.status(400).json({ success: false, message: 'Please provide all required event details.' });
    }

    const event = await Events.create({
      title,
      description,
      category: category || 'Tech Fest',
      venue,
      date,
      time,
      organizer: organizer || req.user.name,
      capacity: Number(capacity) || 100,
      attendees: [],
      isOnline: Boolean(isOnline)
    });

    res.status(201).json({ success: true, message: 'Campus event created successfully.', data: event });
  } catch (error) {
    next(error);
  }
};

// Toggle RSVP
const rsvpEvent = async (req, res, next) => {
  try {
    const event = await Events.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const userId = req.user.id;
    let attendees = Array.isArray(event.attendees) ? [...event.attendees] : [];
    let isAttending = attendees.includes(userId);

    if (isAttending) {
      attendees = attendees.filter(id => id !== userId);
    } else {
      if (attendees.length >= (event.capacity || 100)) {
        return res.status(400).json({ success: false, message: 'Event registration is full.' });
      }
      attendees.push(userId);
    }

    const updated = await Events.findByIdAndUpdate(req.params.id, { attendees });
    res.json({
      success: true,
      message: isAttending ? 'RSVP cancelled.' : 'Registration confirmed for event!',
      isAttending: !isAttending,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// Update event
const updateEvent = async (req, res, next) => {
  try {
    const updated = await Events.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json({ success: true, message: 'Event updated successfully.', data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete event
const deleteEvent = async (req, res, next) => {
  try {
    const deleted = await Events.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEvents,
  createEvent,
  rsvpEvent,
  updateEvent,
  deleteEvent
};
