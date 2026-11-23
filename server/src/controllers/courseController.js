const { Courses } = require('../models/dataStore');

// Get all courses with search & filter
const getCourses = async (req, res, next) => {
  try {
    const { search, department, semester } = req.query;
    let list = await Courses.find();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => 
        c.title.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.instructor.toLowerCase().includes(q)
      );
    }

    if (department && department !== 'All') {
      list = list.filter(c => c.department === department);
    }

    if (semester && semester !== 'All') {
      list = list.filter(c => c.semester === semester);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Get single course by ID
const getCourseById = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    next(error);
  }
};

// Create new course (Admin & Faculty)
const createCourse = async (req, res, next) => {
  try {
    const { code, title, department, credits, semester, instructor, description, schedule, maxCapacity } = req.body;

    if (!code || !title || !department || !credits || !semester) {
      return res.status(400).json({ success: false, message: 'Please provide all mandatory course fields.' });
    }

    const existing = await Courses.findOne({ code: code.toUpperCase() });
    if (existing) {
      return res.status(400).json({ success: false, message: `Course with code ${code} already exists.` });
    }

    const course = await Courses.create({
      code: code.toUpperCase(),
      title,
      department,
      credits: Number(credits),
      semester,
      instructor: instructor || req.user.name,
      description: description || '',
      schedule: schedule || 'TBA',
      maxCapacity: Number(maxCapacity) || 60,
      enrolledStudents: []
    });

    res.status(201).json({ success: true, message: 'Course created successfully.', data: course });
  } catch (error) {
    next(error);
  }
};

// Update course (Admin & Faculty)
const updateCourse = async (req, res, next) => {
  try {
    const updated = await Courses.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    res.json({ success: true, message: 'Course updated successfully.', data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete course (Admin only)
const deleteCourse = async (req, res, next) => {
  try {
    const deleted = await Courses.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }
    res.json({ success: true, message: 'Course deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

// Toggle enrollment for student
const toggleEnroll = async (req, res, next) => {
  try {
    const course = await Courses.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found.' });
    }

    const userId = req.user.id;
    let enrolled = Array.isArray(course.enrolledStudents) ? [...course.enrolledStudents] : [];
    let isEnrolled = enrolled.includes(userId);

    if (isEnrolled) {
      enrolled = enrolled.filter(id => id !== userId);
    } else {
      if (enrolled.length >= (course.maxCapacity || 60)) {
        return res.status(400).json({ success: false, message: 'Course has reached maximum capacity.' });
      }
      enrolled.push(userId);
    }

    const updated = await Courses.findByIdAndUpdate(req.params.id, { enrolledStudents: enrolled });
    res.json({
      success: true,
      message: isEnrolled ? 'Unenrolled from course.' : 'Successfully enrolled in course!',
      isEnrolled: !isEnrolled,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleEnroll
};
