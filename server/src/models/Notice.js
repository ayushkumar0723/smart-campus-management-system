const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Academic', 'Placement', 'Event', 'Urgent', 'General'],
    default: 'General'
  },
  isPinned: { type: Boolean, default: false },
  targetAudience: { 
    type: String, 
    enum: ['All', 'Students', 'Faculty'],
    default: 'All'
  },
  author: { type: String, default: 'Dean of Academic Affairs' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', NoticeSchema);
