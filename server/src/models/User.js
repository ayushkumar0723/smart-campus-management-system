const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: { type: String, default: () => new mongoose.Types.ObjectId().toString() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
  department: { type: String, default: 'Computer Science & Engineering' },
  rollOrEmployeeId: { type: String, required: true },
  phone: { type: String, default: '+1 (555) 019-2834' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
