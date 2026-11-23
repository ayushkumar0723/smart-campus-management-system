const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  toggleEnroll
} = require('../controllers/courseController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/', authenticate, authorize('admin', 'faculty'), createCourse);
router.put('/:id', authenticate, authorize('admin', 'faculty'), updateCourse);
router.delete('/:id', authenticate, authorize('admin'), deleteCourse);
router.post('/:id/enroll', authenticate, toggleEnroll);

module.exports = router;
