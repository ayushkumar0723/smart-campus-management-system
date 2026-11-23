const { Users } = require('../models/dataStore');

// Get campus directory (students, faculty, staff)
const getUsers = async (req, res, next) => {
  try {
    const { search, role, department } = req.query;
    let list = await Users.find();

    // Strip out passwords
    list = list.map(u => {
      const sanitized = { ...u };
      delete sanitized.password;
      return sanitized;
    });

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.rollOrEmployeeId && u.rollOrEmployeeId.toLowerCase().includes(q))
      );
    }

    if (role && role !== 'All') {
      list = list.filter(u => u.role === role);
    }

    if (department && department !== 'All') {
      list = list.filter(u => u.department === department);
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (error) {
    next(error);
  }
};

// Get single user by ID
const getUserById = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }
    const sanitized = { ...user };
    delete sanitized.password;
    res.json({ success: true, data: sanitized });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById };
