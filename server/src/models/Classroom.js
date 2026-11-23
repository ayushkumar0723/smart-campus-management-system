const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  roomNumber: { type: String, required: true, unique: true },
  building: { type: String, required: true },
  capacity: { type: Number, required: true },
  type: { 
    type: String, 
    enum: ['Lecture Hall', 'Computer Lab', 'Seminar Hall', 'Discussion Room'],
    default: 'Lecture Hall' 
  },
  features: [{ type: String }],
  status: { 
    type: String, 
    enum: ['Available', 'Occupied', 'Maintenance'],
    default: 'Available' 
  },
  currentClass: { type: String, default: '' },
  bookedBy: { type: String, default: '' },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
