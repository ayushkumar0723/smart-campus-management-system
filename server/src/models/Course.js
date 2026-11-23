const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  department: { type: String, required: true },
  credits: { type: Number, required: true },
  semester: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, default: '' },
  schedule: { type: String, default: 'Mon/Wed 10:00 AM - 11:30 AM' },
  maxCapacity: { type: Number, default: 60 },
  enrolledStudents: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);
