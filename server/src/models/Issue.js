const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['IT & WiFi', 'Hostel', 'Classroom Infrastructure', 'Electrical', 'Cleanliness', 'Library', 'Other'],
    default: 'IT & WiFi'
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  status: { 
    type: String, 
    enum: ['Open', 'In Progress', 'Resolved'],
    default: 'Open'
  },
  location: { type: String, required: true },
  reportedBy: { type: String, required: true },
  reportedByName: { type: String, default: 'Anonymous' },
  assignedTo: { type: String, default: 'Campus Facility Team' },
  resolutionNotes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', IssueSchema);
