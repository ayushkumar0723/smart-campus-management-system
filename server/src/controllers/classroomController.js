const { Classrooms } = require('../models/dataStore');

// Get all classrooms with search & filter
const getClassrooms = async (req, res, next) => {
  try {
    const { search, status, type, building } = req.query;
    let list = await Classrooms.find();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => 
        c.roomNumber.toLowerCase().includes(q) ||
        c.building.toLowerCase().includes(q) ||
        (c.features && c.features.some(f => f.toLowerCase().includes(q)))
      );
    }

    if (status && status !== 'All') {
      list = list.filter(c => c.status === status);
    }

    if (type && type !== 'All') {
      list = list.filter(c => c.type === type);
    }

    if (building && building !== 'All') {
      list = list.filter(c => c.building === building);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Get single classroom by ID
const getClassroomById = async (req, res, next) => {
  try {
    const classroom = await Classrooms.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ success: false, message: 'Classroom not found.' });
    }
    res.json({ success: true, data: classroom });
  } catch (error) {
    next(error);
  }
};

// Create classroom (Admin only)
const createClassroom = async (req, res, next) => {
  try {
    const { roomNumber, building, capacity, type, features, status } = req.body;

    if (!roomNumber || !building || !capacity) {
      return res.status(400).json({ success: false, message: 'Please provide roomNumber, building, and capacity.' });
    }

    const existing = await Classrooms.findOne({ roomNumber });
    if (existing) {
      return res.status(400).json({ success: false, message: `Room ${roomNumber} already registered.` });
    }

    const classroom = await Classrooms.create({
      roomNumber,
      building,
      capacity: Number(capacity),
      type: type || 'Lecture Hall',
      features: Array.isArray(features) ? features : (features ? features.split(',').map(s => s.trim()) : []),
      status: status || 'Available',
      currentClass: '',
      bookedBy: ''
    });

    res.status(201).json({ success: true, message: 'Classroom registered successfully.', data: classroom });
  } catch (error) {
    next(error);
  }
};

// Update classroom
const updateClassroom = async (req, res, next) => {
  try {
    const updated = await Classrooms.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Classroom not found.' });
    }
    res.json({ success: true, message: 'Classroom updated successfully.', data: updated });
  } catch (error) {
    next(error);
  }
};

// Toggle status or book room
const bookClassroom = async (req, res, next) => {
  try {
    const { status, currentClass } = req.body;
    const room = await Classrooms.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Classroom not found.' });
    }

    const newStatus = status || (room.status === 'Available' ? 'Occupied' : 'Available');
    const bookedBy = newStatus === 'Occupied' ? req.user.name : '';
    const classInfo = newStatus === 'Occupied' ? (currentClass || 'Faculty Reservation') : '';

    const updated = await Classrooms.findByIdAndUpdate(req.params.id, {
      status: newStatus,
      bookedBy,
      currentClass: classInfo
    });

    res.json({ success: true, message: `Room status updated to ${newStatus}.`, data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete classroom (Admin only)
const deleteClassroom = async (req, res, next) => {
  try {
    const deleted = await Classrooms.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Classroom not found.' });
    }
    res.json({ success: true, message: 'Classroom deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  bookClassroom,
  deleteClassroom
};
