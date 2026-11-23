const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models/dataStore');
const { JWT_SECRET } = require('../middleware/auth');

// Register a new user
const register = async (req, res, next) => {
  try {
    const { name, email, password, role, department, rollOrEmployeeId, phone } = req.body;

    if (!name || !email || !password || !rollOrEmployeeId) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, password, and Roll/Employee ID.' });
    }

    const existingUser = await Users.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const validRole = ['admin', 'faculty', 'student'].includes(role) ? role : 'student';

    const newUser = await Users.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: validRole,
      department: department || 'General Engineering',
      rollOrEmployeeId,
      phone: phone || ''
    });

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userToReturn = { ...newUser };
    delete userToReturn.password;

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: userToReturn
    });
  } catch (error) {
    next(error);
  }
};

// Login user
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const user = await Users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role, name: user.name },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const userToReturn = { ...user };
    delete userToReturn.password;

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: userToReturn
    });
  } catch (error) {
    next(error);
  }
};

// Get current authenticated user
const getMe = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const userToReturn = { ...user };
    delete userToReturn.password;

    res.json({ success: true, user: userToReturn });
  } catch (error) {
    next(error);
  }
};

// Update profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, department } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (phone) updates.phone = phone;
    if (department) updates.department = department;

    const updated = await Users.findByIdAndUpdate(req.user.id, updates);
    const userToReturn = { ...updated };
    delete userToReturn.password;

    res.json({ success: true, message: 'Profile updated successfully.', user: userToReturn });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
