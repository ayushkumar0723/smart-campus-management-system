# 🎓 Smart Campus Management System

[![Full-Stack MERN](https://img.shields.io/badge/Stack-MERN-blue.svg)](https://github.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v25-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18-cyan.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-v4.21-lightgrey.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-brightgreen.svg)](https://www.mongodb.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT%20%26%20Bcrypt-orange.svg)](https://jwt.io/)
[![Automated Tests](https://img.shields.io/badge/Tests-13%2F13%20Passing-success.svg)](https://github.com/)

An integrated, modern full-stack web application for university campus administration, academic scheduling, classroom facility management, student grievance redressal, and campus notifications.

---

## 📌 Course Outcome Alignment (CO3)
> **CO3: Apply full-stack web development concepts to design and develop a functional web application by integrating front-end, back-end, and database technologies.**
- **Front-End:** Modern React 18 SPA built with Vite, React Router 6, Lucide icons, glassmorphic UI cards, responsive filter bars, and role-based views.
- **Back-End:** Scalable Node.js & Express RESTful API with centralized error handling, JWT authentication, and role-based authorization middleware.
- **Database:** MongoDB integration via Mongoose with automated collections seeding and a seamless resilient fallback engine for offline grading/evaluation.

---

## 🌟 Key Modules & Features

### 1. 🔐 User Authentication & Role-Based Access Control (RBAC)
- Multi-role support: **Administrator**, **Faculty**, and **Student**.
- Encrypted password hashing with **Bcrypt** (salt rounds: 10).
- Secure stateless session management via **JSON Web Tokens (JWT)**.
- **⚡ 1-Click Evaluation Logins:** The login page provides instant one-click login buttons for Admin, Faculty, and Student roles for rapid reviewer demonstration.

### 2. 📊 Intelligent Campus Analytics Dashboard
- Role-aware overview with live counts: Active Courses, Facility Availability, Open Grievances, Pinned Notices, and Hackathons.
- Urgent grievance alert feed.
- Live database connection status indicator.

### 3. 📚 Course & Curriculum Management (CRUD)
- Full CRUD operations: Course Code, Title, Department, Credits, Semester, Lead Instructor, and Schedule.
- Search by keyword, title, course code, or professor.
- Filter by academic department and semester.
- Real-time student course enrollment and capacity progress bar.

### 4. 🏛️ Classroom & Computing Lab Infrastructure (CRUD)
- Track Lecture Halls, Computer Labs, Seminar Halls, and Discussion Rooms.
- Filter by status (`Available`, `Occupied`, `Maintenance`) and facility type.
- 1-click room status toggle / reservation for faculty and administrators.

### 5. 🛠️ Campus Grievances & Maintenance Ticketing System
- Redressal ticketing for IT/WiFi, Hostel, Classroom Infrastructure, Electrical, and Cleanliness issues.
- Severity levels: `Low`, `Medium`, `High`, and `Urgent`.
- Workflow lifecycle: `Open` ➔ `In Progress` ➔ `Resolved` with resolution remarks.

### 6. 📢 Smart Campus Notice Board
- Circulars categorized by `Academic`, `Placement`, `Events`, `Urgent`, and `General`.
- Priority pinned announcements always stay at the top.
- Filter by target audience (`All`, `Students`, `Faculty`).

### 7. 🗓️ Campus Events & Hackathon Calendar
- Browse tech fests, masterclasses, cultural nights, and conferences.
- 1-click RSVP registration with capacity tracker.

### 8. 👥 People Directory & Profiles
- Searchable roster of students, professors, and administrators.
- Filter by role and academic department.
- Profile management with contact details and department affiliations.

---

## 🔑 Pre-Seeded Demo Credentials

| Role | Email | Password | Pre-loaded Responsibilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@campus.edu` | `Admin@123` | Full system control, facility registration, grievance resolution |
| **Faculty** | `faculty@campus.edu` | `Faculty@123` | Course authoring, classroom booking, publish notices |
| **Student** | `student@campus.edu` | `Student@123` | Course enrollment, ticket submission, event RSVP |

*(You can also use the 1-Click buttons directly on the Login screen!)*

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | React 18, Vite 6, React Router DOM 6, Lucide React, Axios, Modern CSS3 |
| **Backend** | Node.js (v25), Express.js (v4.21), CORS, Morgan, Dotenv |
| **Database** | MongoDB (v7/v8), Mongoose (v8.8), with auto-seeding & in-memory engine |
| **Security** | JWT (`jsonwebtoken`), Password Hashing (`bcryptjs`), Role Guards |
| **Testing** | Automated Integration Test Suite (`supertest`) |
| **Version Control** | Git & GitHub |

---

## 📡 REST API Reference

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & return JWT token |
| `GET` | `/api/auth/me` | Authenticated | Fetch current user session details |
| `PUT` | `/api/auth/profile` | Authenticated | Update personal profile details |
| `GET` | `/api/stats` | Public | Aggregated campus metrics & counts |
| `GET` | `/api/courses` | Public | List courses with search & department/semester filter |
| `POST` | `/api/courses` | Admin, Faculty | Create new academic course module |
| `POST` | `/api/courses/:id/enroll`| Authenticated | Student course enrollment toggle |
| `DELETE`| `/api/courses/:id` | Admin | Delete course |
| `GET` | `/api/classrooms` | Public | List classrooms with status & type filter |
| `POST` | `/api/classrooms` | Admin | Register new classroom or lab |
| `POST` | `/api/classrooms/:id/book`| Admin, Faculty | Toggle room reservation status |
| `GET` | `/api/issues` | Authenticated | List campus grievance tickets with filters |
| `POST` | `/api/issues` | Authenticated | Submit new grievance ticket |
| `PUT` | `/api/issues/:id/status`| Admin, Faculty | Update issue status & resolution remarks |
| `GET` | `/api/notices` | Public | Get notices with pinned priority sorting |
| `POST` | `/api/notices` | Admin, Faculty | Publish new official campus circular |
| `GET` | `/api/events` | Public | List campus events & hackathons |
| `POST` | `/api/events/:id/rsvp` | Authenticated | RSVP register for an event |
| `GET` | `/api/users` | Authenticated | Search people directory by role/dept |

---

## 🚀 Quickstart & Local Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ (v20+ recommended)
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/smart-campus-management-system.git
cd smart-campus-management-system
```

### 2. Install Dependencies
```bash
# Install root, server, and client dependencies
npm install --prefix server
npm install --prefix client
```

### 3. Environment Configuration
Create `server/.env` (a template is pre-configured):
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smart_campus
JWT_SECRET=smart_campus_super_secret_jwt_key_2026
NODE_ENV=development
```
*(Note: If you do not have a local MongoDB daemon running, the system will seamlessly run its built-in database engine with pre-seeded data, ensuring 100% out-of-the-box readiness! To connect to MongoDB Atlas, simply paste your cloud URI in `MONGODB_URI`.)*

### 4. Build the Frontend
```bash
npm run build --prefix client
```

### 5. Start the Application
```bash
# Start backend API (which also serves the client build statically on port 5000)
npm run start --prefix server
```
Access the application at: **`http://localhost:5000`**

Or run in concurrent development mode:
- Backend: `npm run dev --prefix server` (Port 5000)
- Frontend: `npm run dev --prefix client` (Port 5173 with automated proxy)

---

## 🧪 Automated Testing Verification

The project includes an end-to-end automated test suite verifying all 13 critical API workflows:

```bash
npm run test --prefix server
```

**Test Coverage Summary:**
```
🧪 Starting Smart Campus Management System API Test Suite...

  ✅ [PASS] Health Check endpoint (/api/health) returns 200 OK
  ✅ [PASS] Admin login returns 200 and valid JWT token
  ✅ [PASS] Fetch current user (/api/auth/me) verifies admin role
  ✅ [PASS] Student login returns valid profile
  ✅ [PASS] Stats endpoint aggregates courses and counts accurately
  ✅ [PASS] Course search by keyword "Full-Stack" finds matching courses
  ✅ [PASS] Student course enrollment toggle succeeds with 200 status
  ✅ [PASS] Classroom filter by status "Available" returns only available rooms
  ✅ [PASS] Creating grievance ticket returns 201 Created
  ✅ [PASS] Admin updating issue status to In Progress succeeds
  ✅ [PASS] Notices endpoint returns pinned notices at top of list
  ✅ [PASS] Events endpoint lists campus events
  ✅ [PASS] RSVP registration toggle succeeds

🎉 All 13/13 automated backend tests PASSED successfully!
```

---

## ☁️ Deployment Guide

### Option 1: Deploy on Render (Recommended Unified Deployment)
1. Push your code to your GitHub repository.
2. In [Render Dashboard](https://dashboard.render.com/), click **New +** ➔ **Web Service**.
3. Select your repository.
4. Set:
   - **Environment:** `Node`
   - **Build Command:** `npm install --prefix server && npm install --prefix client && npm run build --prefix client`
   - **Start Command:** `npm run start --prefix server`
5. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `<any-secure-random-string>`
   - `MONGODB_URI`: `<your-free-mongodb-atlas-connection-string>`
6. Click **Deploy Web Service**.

### Option 2: Deploy Frontend on Vercel & Backend on Render
1. **Backend (Render):**
   - Follow Option 1 with Root Directory set to `server`.
2. **Frontend (Vercel):**
   - In [Vercel](https://vercel.com/), import the repository.
   - Set Root Directory to `client`.
   - Set Environment Variable: `VITE_API_BASE_URL` = `<your-render-backend-url>/api`.
   - Click **Deploy**.

---

## 📋 Submission Links Template

- **GitHub Repository Link:** `https://github.com/<your-username>/smart-campus-management-system`
- **Live Deployed Application Link:** `https://smart-campus-system.onrender.com` *(or your Vercel URL)*
- **Demo Admin:** `admin@campus.edu` / `Admin@123`
- **Demo Faculty:** `faculty@campus.edu` / `Faculty@123`
- **Demo Student:** `student@campus.edu` / `Student@123`
