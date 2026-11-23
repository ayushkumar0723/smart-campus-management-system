const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Workshop', 'Cultural', 'Sports', 'Tech Fest', 'Seminar'],
    default: 'Tech Fest'
  },
  venue: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  organizer: { type: String, default: 'Student Affairs Council' },
  capacity: { type: Number, default: 150 },
  attendees: [{ type: String }],
  isOnline: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', EventSchema);
