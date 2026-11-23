const bcrypt = require('bcryptjs');
const { getDBStatus } = require('../config/db');
const User = require('./User');
const Course = require('./Course');
const Classroom = require('./Classroom');
const Issue = require('./Issue');
const Notice = require('./Notice');
const Event = require('./Event');
const seed = require('../seed/seedData');

// In-Memory store fallback
const memoryStore = {
  users: [],
  courses: [],
  classrooms: [],
  issues: [],
  notices: [],
  events: []
};

let isInitialized = false;

const initDataStore = async () => {
  if (isInitialized) return;

  const adminHash = await bcrypt.hash('Admin@123', 10);
  const facultyHash = await bcrypt.hash('Faculty@123', 10);
  const studentHash = await bcrypt.hash('Student@123', 10);

  const seededUsers = seed.initialUsers.map(u => ({
    ...u,
    password: u.role === 'admin' ? adminHash : u.role === 'faculty' ? facultyHash : studentHash
  }));

  const dbStatus = getDBStatus();

  if (dbStatus.mode === 'mongodb-connected') {
    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        console.log('[Seed] Seeding MongoDB with initial campus records...');
        await User.insertMany(seededUsers);
        await Course.insertMany(seed.initialCourses);
        await Classroom.insertMany(seed.initialClassrooms);
        await Issue.insertMany(seed.initialIssues);
        await Notice.insertMany(seed.initialNotices);
        await Event.insertMany(seed.initialEvents);
        console.log('[Seed] MongoDB initial seeding complete.');
      }
    } catch (err) {
      console.warn('[Seed Warning] MongoDB seed error, continuing:', err.message);
    }
  }

  // Always initialize memoryStore as fallback or primary
  memoryStore.users = JSON.parse(JSON.stringify(seededUsers));
  memoryStore.courses = JSON.parse(JSON.stringify(seed.initialCourses));
  memoryStore.classrooms = JSON.parse(JSON.stringify(seed.initialClassrooms));
  memoryStore.issues = JSON.parse(JSON.stringify(seed.initialIssues));
  memoryStore.notices = JSON.parse(JSON.stringify(seed.initialNotices));
  memoryStore.events = JSON.parse(JSON.stringify(seed.initialEvents));

  isInitialized = true;
};

// Helper for generating custom IDs in memory
const generateId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

// Generic collection accessor
const getCollection = (collectionName, MongooseModel, idPrefix) => {
  return {
    async find(filter = {}) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          return await MongooseModel.find(filter).lean();
        } catch (e) {
          console.warn(`[Fallback] ${collectionName}.find error, using in-memory store`);
        }
      }
      return memoryStore[collectionName].filter(item => {
        for (const key in filter) {
          if (filter[key] !== undefined && item[key] !== filter[key]) return false;
        }
        return true;
      });
    },

    async findById(id) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          const item = await MongooseModel.findById(id).lean();
          if (item) return item;
        } catch (e) {
          // invalid objectId or fallback
        }
      }
      return memoryStore[collectionName].find(item => item._id === id || item._id?.toString() === id?.toString()) || null;
    },

    async findOne(query) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          const item = await MongooseModel.findOne(query).lean();
          if (item) return item;
        } catch (e) {}
      }
      return memoryStore[collectionName].find(item => {
        for (const key in query) {
          if (query[key] !== undefined && item[key] !== query[key]) return false;
        }
        return true;
      }) || null;
    },

    async create(data) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          const created = await MongooseModel.create(data);
          return created.toObject ? created.toObject() : created;
        } catch (e) {
          console.warn(`[Fallback] ${collectionName}.create error, saving to in-memory store`);
        }
      }
      const newItem = {
        _id: data._id || generateId(idPrefix),
        ...data,
        createdAt: data.createdAt || new Date(),
        updatedAt: new Date()
      };
      memoryStore[collectionName].push(newItem);
      return newItem;
    },

    async findByIdAndUpdate(id, updates) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          const updated = await MongooseModel.findByIdAndUpdate(id, updates, { new: true }).lean();
          if (updated) return updated;
        } catch (e) {}
      }
      const index = memoryStore[collectionName].findIndex(i => i._id === id || i._id?.toString() === id?.toString());
      if (index === -1) return null;
      memoryStore[collectionName][index] = {
        ...memoryStore[collectionName][index],
        ...updates,
        updatedAt: new Date()
      };
      return memoryStore[collectionName][index];
    },

    async findByIdAndDelete(id) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          const deleted = await MongooseModel.findByIdAndDelete(id).lean();
          if (deleted) return deleted;
        } catch (e) {}
      }
      const index = memoryStore[collectionName].findIndex(i => i._id === id || i._id?.toString() === id?.toString());
      if (index === -1) return null;
      const removed = memoryStore[collectionName].splice(index, 1);
      return removed[0];
    },

    async countDocuments(filter = {}) {
      if (getDBStatus().mode === 'mongodb-connected') {
        try {
          return await MongooseModel.countDocuments(filter);
        } catch (e) {}
      }
      return (await this.find(filter)).length;
    }
  };
};

module.exports = {
  initDataStore,
  Users: getCollection('users', User, 'usr'),
  Courses: getCollection('courses', Course, 'crs'),
  Classrooms: getCollection('classrooms', Classroom, 'cls'),
  Issues: getCollection('issues', Issue, 'iss'),
  Notices: getCollection('notices', Notice, 'not'),
  Events: getCollection('events', Event, 'evt')
};
