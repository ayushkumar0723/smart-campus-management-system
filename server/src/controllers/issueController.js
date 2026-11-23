const { Issues } = require('../models/dataStore');

// Get all issues with search & filter
const getIssues = async (req, res, next) => {
  try {
    const { search, status, priority, category } = req.query;
    let list = await Issues.find();

    // Students only see their own issues unless admin/faculty
    if (req.user && req.user.role === 'student') {
      list = list.filter(i => i.reportedBy === req.user.id || i.reportedByName === req.user.name);
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.location.toLowerCase().includes(q)
      );
    }

    if (status && status !== 'All') {
      list = list.filter(i => i.status === status);
    }

    if (priority && priority !== 'All') {
      list = list.filter(i => i.priority === priority);
    }

    if (category && category !== 'All') {
      list = list.filter(i => i.category === category);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Get single issue
const getIssueById = async (req, res, next) => {
  try {
    const issue = await Issues.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue not found.' });
    }
    res.json({ success: true, data: issue });
  } catch (error) {
    next(error);
  }
};

// Create new campus issue / grievance
const createIssue = async (req, res, next) => {
  try {
    const { title, description, category, priority, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({ success: false, message: 'Please provide title, description, and location.' });
    }

    const newIssue = await Issues.create({
      title,
      description,
      category: category || 'Other',
      priority: priority || 'Medium',
      status: 'Open',
      location,
      reportedBy: req.user.id,
      reportedByName: req.user.name || 'Anonymous Campus Member',
      assignedTo: 'Campus Facility Operations',
      resolutionNotes: ''
    });

    res.status(201).json({ success: true, message: 'Grievance ticket created successfully.', data: newIssue });
  } catch (error) {
    next(error);
  }
};

// Update issue status & notes (Admin & Faculty)
const updateIssueStatus = async (req, res, next) => {
  try {
    const { status, resolutionNotes, assignedTo, priority } = req.body;
    const issue = await Issues.findById(req.params.id);
    if (!issue) {
      return res.status(404).json({ success: false, message: 'Issue ticket not found.' });
    }

    const updates = {};
    if (status) updates.status = status;
    if (resolutionNotes !== undefined) updates.resolutionNotes = resolutionNotes;
    if (assignedTo) updates.assignedTo = assignedTo;
    if (priority) updates.priority = priority;

    const updated = await Issues.findByIdAndUpdate(req.params.id, updates);
    res.json({ success: true, message: 'Issue updated successfully.', data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete issue (Admin only)
const deleteIssue = async (req, res, next) => {
  try {
    const deleted = await Issues.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Issue not found.' });
    }
    res.json({ success: true, message: 'Issue deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIssues,
  getIssueById,
  createIssue,
  updateIssueStatus,
  deleteIssue
};
