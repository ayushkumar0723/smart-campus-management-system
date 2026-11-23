const { Notices } = require('../models/dataStore');

// Get notices with search & filter
const getNotices = async (req, res, next) => {
  try {
    const { search, category, audience } = req.query;
    let list = await Notices.find();

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(n =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q)
      );
    }

    if (category && category !== 'All') {
      list = list.filter(n => n.category === category);
    }

    if (audience && audience !== 'All') {
      list = list.filter(n => n.targetAudience === audience || n.targetAudience === 'All');
    }

    // Sort pinned to top, then recent
    list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Create notice (Admin & Faculty)
const createNotice = async (req, res, next) => {
  try {
    const { title, content, category, isPinned, targetAudience } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Please provide notice title and content.' });
    }

    const notice = await Notices.create({
      title,
      content,
      category: category || 'General',
      isPinned: Boolean(isPinned),
      targetAudience: targetAudience || 'All',
      author: req.user.name || 'Campus Administration'
    });

    res.status(201).json({ success: true, message: 'Notice published successfully.', data: notice });
  } catch (error) {
    next(error);
  }
};

// Update notice
const updateNotice = async (req, res, next) => {
  try {
    const updated = await Notices.findByIdAndUpdate(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, message: 'Notice updated successfully.', data: updated });
  } catch (error) {
    next(error);
  }
};

// Delete notice
const deleteNotice = async (req, res, next) => {
  try {
    const deleted = await Notices.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Notice not found.' });
    }
    res.json({ success: true, message: 'Notice deleted successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotices,
  createNotice,
  updateNotice,
  deleteNotice
};
