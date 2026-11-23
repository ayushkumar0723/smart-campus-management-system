const express = require('express');
const router = express.Router();
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  bookClassroom,
  deleteClassroom
} = require('../controllers/classroomController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getClassrooms);
router.get('/:id', getClassroomById);
router.post('/', authenticate, authorize('admin'), createClassroom);
router.put('/:id', authenticate, authorize('admin', 'faculty'), updateClassroom);
router.post('/:id/book', authenticate, authorize('admin', 'faculty'), bookClassroom);
router.delete('/:id', authenticate, authorize('admin'), deleteClassroom);

module.exports = router;
