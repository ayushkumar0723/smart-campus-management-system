const express = require('express');
const router = express.Router();
const {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
} = require('../controllers/noticeController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', getNotices);
router.post('/', authenticate, authorize('admin', 'faculty'), createNotice);
router.put('/:id', authenticate, authorize('admin', 'faculty'), updateNotice);
router.delete('/:id', authenticate, authorize('admin'), deleteNotice);

module.exports = router;
