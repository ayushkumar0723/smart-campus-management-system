const bcrypt = require('bcryptjs');

const initialUsers = [
  {
    _id: 'usr_admin_001',
    name: 'Dr. Eleanor Vance',
    email: 'admin@campus.edu',
    password: '', // will be hashed in seed initialization
    role: 'admin',
    department: 'Campus Administration',
    rollOrEmployeeId: 'ADM-001',
    phone: '+1 (555) 019-2834',
    createdAt: new Date('2026-01-10')
  },
  {
    _id: 'usr_fac_102',
    name: 'Prof. Alan Turing',
    email: 'faculty@campus.edu',
    password: '',
    role: 'faculty',
    department: 'Computer Science & Engineering',
    rollOrEmployeeId: 'FAC-102',
    phone: '+1 (555) 438-9210',
    createdAt: new Date('2026-01-15')
  },
  {
    _id: 'usr_stu_042',
    name: 'Alex Rivera',
    email: 'student@campus.edu',
    password: '',
    role: 'student',
    department: 'Computer Science & Engineering',
    rollOrEmployeeId: 'CS2026-042',
    phone: '+1 (555) 872-3319',
    createdAt: new Date('2026-02-01')
  }
];

const initialCourses = [
  {
    _id: 'crs_cs301',
    code: 'CS-301',
    title: 'Full-Stack Web Architecture',
    department: 'Computer Science & Engineering',
    credits: 4,
    semester: 'Semester 5',
    instructor: 'Prof. Alan Turing',
    description: 'Design and deployment of modern scalable full-stack web applications using MERN, REST APIs, and microservices.',
    schedule: 'Mon / Wed 10:00 AM - 11:30 AM',
    maxCapacity: 60,
    enrolledStudents: ['usr_stu_042'],
    createdAt: new Date('2026-01-20')
  },
  {
    _id: 'crs_cs402',
    code: 'CS-402',
    title: 'Distributed Cloud Systems',
    department: 'Computer Science & Engineering',
    credits: 3,
    semester: 'Semester 7',
    instructor: 'Dr. Sarah Chen',
    description: 'Principles of distributed consensus, cloud container orchestration, serverless microservices, and fault tolerance.',
    schedule: 'Tue / Thu 02:00 PM - 03:30 PM',
    maxCapacity: 50,
    enrolledStudents: [],
    createdAt: new Date('2026-01-22')
  },
  {
    _id: 'crs_ai310',
    code: 'AI-310',
    title: 'Artificial Intelligence & Deep Learning',
    department: 'Computer Science & Engineering',
    credits: 4,
    semester: 'Semester 6',
    instructor: 'Dr. Maya Lin',
    description: 'Neural networks, transformer architectures, computer vision, and LLM agent systems.',
    schedule: 'Friday 09:00 AM - 12:00 PM',
    maxCapacity: 55,
    enrolledStudents: ['usr_stu_042'],
    createdAt: new Date('2026-01-25')
  },
  {
    _id: 'crs_ec204',
    code: 'EC-204',
    title: 'Digital Signal Processing',
    department: 'Electronics & Communication',
    credits: 3,
    semester: 'Semester 4',
    instructor: 'Prof. Robert Fox',
    description: 'Discrete-time signals, Z-transforms, digital filter design, and spectral analysis.',
    schedule: 'Mon / Wed 03:00 PM - 04:30 PM',
    maxCapacity: 45,
    enrolledStudents: [],
    createdAt: new Date('2026-02-01')
  },
  {
    _id: 'crs_me101',
    code: 'ME-101',
    title: 'Engineering Thermodynamics',
    department: 'Mechanical Engineering',
    credits: 4,
    semester: 'Semester 2',
    instructor: 'Dr. Carlos Mendes',
    description: 'Laws of thermodynamics, thermodynamic cycles, heat engines, and energy conservation principles.',
    schedule: 'Tue / Thu 11:00 AM - 12:30 PM',
    maxCapacity: 70,
    enrolledStudents: [],
    createdAt: new Date('2026-02-05')
  }
];

const initialClassrooms = [
  {
    _id: 'cls_101',
    roomNumber: 'LH-101',
    building: 'Main Academic Block A',
    capacity: 120,
    type: 'Lecture Hall',
    features: ['4K Projector', 'Central AC', 'Acoustic Sound System', 'Smart Podium'],
    status: 'Available',
    currentClass: '',
    bookedBy: '',
    updatedAt: new Date()
  },
  {
    _id: 'cls_3b',
    roomNumber: 'Lab-3B',
    building: 'Turing Technology Tower',
    capacity: 45,
    type: 'Computer Lab',
    features: ['High-Performance Workstations', 'Smart Touch Board', 'Dual Gigabit Fiber'],
    status: 'Occupied',
    currentClass: 'CS-301 Full-Stack Lab',
    bookedBy: 'Prof. Alan Turing',
    updatedAt: new Date()
  },
  {
    _id: 'cls_aud1',
    roomNumber: 'Auditorium-1',
    building: 'Central Campus Complex',
    capacity: 500,
    type: 'Seminar Hall',
    features: ['Dolby 7.1 Stage Audio', 'Motorized Screen', 'Stage Spotlighting', 'Live Broadcast Station'],
    status: 'Available',
    currentClass: '',
    bookedBy: '',
    updatedAt: new Date()
  },
  {
    _id: 'cls_dr2',
    roomNumber: 'DR-204',
    building: 'Central Library 2nd Floor',
    capacity: 16,
    type: 'Discussion Room',
    features: ['Magnetic Whiteboard', 'Video Conferencing Unit', 'High Speed WiFi'],
    status: 'Maintenance',
    currentClass: '',
    bookedBy: '',
    updatedAt: new Date()
  },
  {
    _id: 'cls_1a',
    roomNumber: 'Lab-1A',
    building: 'Turing Technology Tower',
    capacity: 35,
    type: 'Computer Lab',
    features: ['IoT Development Boards', 'Digital Oscilloscopes', 'Dual Monitors'],
    status: 'Available',
    currentClass: '',
    bookedBy: '',
    updatedAt: new Date()
  }
];

const initialIssues = [
  {
    _id: 'iss_001',
    title: 'WiFi AP Degradation in Central Library 2nd Floor',
    description: 'Laptops disconnect periodically near cubicles 12-25. Speed drops below 1 Mbps during peak study hours.',
    category: 'IT & WiFi',
    priority: 'High',
    status: 'In Progress',
    location: 'Central Library, 2nd Floor East Wing',
    reportedBy: 'usr_stu_042',
    reportedByName: 'Alex Rivera',
    assignedTo: 'Network Operations Team',
    resolutionNotes: 'Access point rebooted; firmware update scheduled for tonight at 11:00 PM.',
    createdAt: new Date('2026-11-20T10:30:00Z'),
    updatedAt: new Date('2026-11-21T14:15:00Z')
  },
  {
    _id: 'iss_002',
    title: 'HVAC Temperature Sensor Fault in Lecture Hall LH-101',
    description: 'The automated climate control is stuck at 18 degrees Celsius, causing freezing temperatures in morning sessions.',
    category: 'Classroom Infrastructure',
    priority: 'Medium',
    status: 'Open',
    location: 'Main Academic Block A, Room LH-101',
    reportedBy: 'usr_fac_102',
    reportedByName: 'Prof. Alan Turing',
    assignedTo: 'Campus Facility Team',
    resolutionNotes: '',
    createdAt: new Date('2026-11-22T08:45:00Z'),
    updatedAt: new Date('2026-11-22T08:45:00Z')
  },
  {
    _id: 'iss_003',
    title: 'Projector HDMI Input Port Damaged in Lab-3B',
    description: 'The wall-mounted HDMI port pins are bent, instructors cannot mirror secondary presentation displays.',
    category: 'Classroom Infrastructure',
    priority: 'Urgent',
    status: 'Resolved',
    location: 'Turing Technology Tower, Lab-3B',
    reportedBy: 'usr_fac_102',
    reportedByName: 'Prof. Alan Turing',
    assignedTo: 'Hardware Support Cell',
    resolutionNotes: 'Replaced with a brand new wall-mounted HDMI 2.1 adapter box. Verified working.',
    createdAt: new Date('2026-11-18T11:20:00Z'),
    updatedAt: new Date('2026-11-19T16:00:00Z')
  },
  {
    _id: 'iss_004',
    title: 'Hostel Block D Water Purifier Filter Indicator Alert',
    description: 'The RO water station on 3rd floor shows service filter replacement beacon.',
    category: 'Hostel',
    priority: 'High',
    status: 'Open',
    location: 'Hostel Block D, 3rd Floor Pantry',
    reportedBy: 'usr_stu_042',
    reportedByName: 'Alex Rivera',
    assignedTo: 'Hostel Maintenance Staff',
    resolutionNotes: '',
    createdAt: new Date('2026-11-23T09:15:00Z'),
    updatedAt: new Date('2026-11-23T09:15:00Z')
  }
];

const initialNotices = [
  {
    _id: 'not_001',
    title: 'End-Semester Examination Schedule - Fall 2026',
    content: 'The official timetable for Fall 2026 Final Examinations has been released. Exams commence from December 12. Students must carry valid campus ID cards to examination halls.',
    category: 'Academic',
    isPinned: true,
    targetAudience: 'All',
    author: 'Office of the Controller of Examinations',
    createdAt: new Date('2026-11-20')
  },
  {
    _id: 'not_002',
    title: 'Google & Microsoft Campus Placement Drive 2026',
    content: 'Eligible 7th & 8th semester students are invited to register for upcoming Software Engineering recruitment interviews. Deadline to submit resume portal forms is November 30.',
    category: 'Placement',
    isPinned: true,
    targetAudience: 'Students',
    author: 'Campus Career & Placement Cell',
    createdAt: new Date('2026-11-21')
  },
  {
    _id: 'not_003',
    title: 'Annual Inter-College Hackathon "InnovateX 2026"',
    content: 'Register your teams of up to 4 members for a 36-hour non-stop hackathon with cash prizes over $10,000. Track topics include AI, Web3, Smart Cities, and EdTech.',
    category: 'Event',
    isPinned: false,
    targetAudience: 'All',
    author: 'Student Technical Council',
    createdAt: new Date('2026-11-22')
  },
  {
    _id: 'not_004',
    title: 'Library 24x7 Extended Hours Announcement',
    content: 'To support students during exam prep, the Central Library reading halls will operate 24 hours starting December 1st through December 22nd.',
    category: 'General',
    isPinned: false,
    targetAudience: 'All',
    author: 'Chief Librarian',
    createdAt: new Date('2026-11-23')
  }
];

const initialEvents = [
  {
    _id: 'evt_001',
    title: 'NextGen Full-Stack DevCon 2026',
    description: 'A comprehensive campus conference featuring industry speakers from top tech firms sharing practical insights on cloud native architectures, React 19, and scalable microservices.',
    category: 'Tech Fest',
    venue: 'Auditorium-1, Central Campus',
    date: '2026-12-05',
    time: '10:00 AM - 04:00 PM',
    organizer: 'Department of Computer Science',
    capacity: 250,
    attendees: ['usr_stu_042', 'usr_fac_102'],
    isOnline: false,
    createdAt: new Date('2026-11-15')
  },
  {
    _id: 'evt_002',
    title: 'AI & Robotics Hands-on Masterclass',
    description: 'Build real-world autonomous edge agents using computer vision and embedded boards. Open to all engineering students with laptop.',
    category: 'Workshop',
    venue: 'Lab-3B, Turing Technology Tower',
    date: '2026-12-10',
    time: '02:00 PM - 05:30 PM',
    organizer: 'Robotics & Automation Club',
    capacity: 40,
    attendees: ['usr_stu_042'],
    isOnline: false,
    createdAt: new Date('2026-11-18')
  },
  {
    _id: 'evt_003',
    title: 'Campus Winter Cultural Night "Symphony 2026"',
    description: 'An evening of live band performances, acoustic open mic, theatrical drama, and street food stalls.',
    category: 'Cultural',
    venue: 'Open Air Amphitheatre',
    date: '2026-12-18',
    time: '06:30 PM - 10:30 PM',
    organizer: 'Student Cultural Affairs Board',
    capacity: 600,
    attendees: [],
    isOnline: false,
    createdAt: new Date('2026-11-20')
  }
];

module.exports = {
  initialUsers,
  initialCourses,
  initialClassrooms,
  initialIssues,
  initialNotices,
  initialEvents
};
