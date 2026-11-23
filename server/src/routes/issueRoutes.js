const express = require('express');
const router = express.Router();
const {
  getIssues,
  getIssueById,
  createIssue,
  updateIssueStatus,
  deleteIssue
} = require('../controllers/issueController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, getIssues);
router.get('/:id', authenticate, getIssueById);
router.post('/', authenticate, createIssue);
router.put('/:id/status', authenticate, authorize('admin', 'faculty'), updateIssueStatus);
router.delete('/:id', authenticate, authorize('admin'), deleteIssue);

module.exports = router;
