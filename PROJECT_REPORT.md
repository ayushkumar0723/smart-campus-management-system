<div style="font-family: 'Times New Roman', Times, serif; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto;">

<!-- ========================================================================== -->
<!-- PAGE 1: TITLE / COVER PAGE -->
<!-- ========================================================================== -->
<div style="min-height: 980px; display: flex; flex-direction: column; justify-content: space-between; text-align: center; padding: 40px 20px; page-break-after: always; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em;">
    SMART CAMPUS | PAGE 1
  </div>

  <div style="margin-top: 40px;">
    <h1 style="font-size: 2.5rem; font-weight: 800; color: #1e3a8a; letter-spacing: 0.08em; margin-bottom: 8px; text-transform: uppercase;">
      SMART CAMPUS
    </h1>
    <h3 style="font-size: 1.25rem; font-weight: 500; color: #334155; margin-top: 0; margin-bottom: 35px;">
      An Integrated Full-Stack Campus Administration and Student Services Platform
    </h3>
  </div>

  <div style="margin: 30px 0;">
    <h2 style="font-size: 1.5rem; font-weight: 700; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 12px;">
      PROJECT REPORT
    </h2>
    <p style="font-size: 0.95rem; color: #475569; max-width: 450px; margin: 0 auto; line-height: 1.4;">
      Submitted in partial fulfilment of the requirements<br>for the academic project
    </p>
  </div>

  <div style="margin: 30px 0;">
    <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 8px;">Submitted by</p>
    <p style="font-size: 1.3rem; font-weight: 700; color: #0f172a; margin: 4px 0;">Ayush</p>
    <p style="font-size: 1rem; color: #334155; margin: 4px 0; letter-spacing: 0.05em;">[1CR25MC057 / University Seat No.]</p>
    <p style="font-size: 1.05rem; font-weight: 600; color: #1e293b; margin-top: 16px; text-transform: uppercase;">
      MASTER OF COMPUTER APPLICATIONS
    </p>
    <p style="font-size: 1.1rem; font-weight: 700; color: #1e3a8a; margin-top: 6px; text-transform: uppercase;">
      CMR INSTITUTE OF TECHNOLOGY
    </p>
  </div>

  <div style="margin: 30px 0;">
    <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 8px;">Guided by</p>
    <p style="font-size: 1.2rem; font-weight: 700; color: #0f172a; margin: 4px 0;">Prof. Daya Thummar</p>
    <p style="font-size: 0.95rem; color: #475569; margin: 2px 0;">Department of Computer Applications</p>
  </div>

  <div style="margin-bottom: 20px;">
    <p style="font-size: 1rem; font-weight: 600; color: #334155;">
      Academic Year 2026–2027
    </p>
  </div>
</div>

<!-- ========================================================================== -->
<!-- PAGE 2: ABSTRACT & INTRODUCTION -->
<!-- ========================================================================== -->
<div style="min-height: 980px; padding: 40px 20px; page-break-after: always; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 15px;">
    SMART CAMPUS | PAGE 2
  </div>

  <div style="text-align: center; margin-bottom: 25px;">
    <div style="font-size: 0.9rem; font-weight: bold; letter-spacing: 0.06em; color: #475569;">PROJECT REPORT</div>
    <div style="font-size: 1.6rem; font-weight: 800; color: #1e3a8a; letter-spacing: 0.06em; text-transform: uppercase; margin: 4px 0;">SMART CAMPUS</div>
    <div style="font-size: 1rem; font-weight: 600; color: #334155; margin-bottom: 4px;">An Integrated Full-Stack Campus Administration and Student Services Platform</div>
    <div style="font-size: 0.8rem; color: #64748b;">Submitted in partial fulfilment of the requirements for the award of the degree of</div>
    <div style="font-size: 0.9rem; font-weight: 700; color: #0f172a; text-transform: uppercase;">MASTER OF COMPUTER APPLICATIONS (MCA)</div>
    <div style="font-size: 0.8rem; color: #64748b;">Academic Year: 2026</div>
  </div>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 15px; margin-bottom: 8px;">
    ABSTRACT
  </h3>
  <p style="font-size: 0.9rem; text-align: justify; margin-bottom: 18px;">
    <strong>Smart Campus</strong> is a comprehensive full-stack web application engineered to unify academic course administration, classroom infrastructure management, grievance redressal, official circulars, and campus event registrations into a singular, cohesive digital platform. In contemporary university environments, academic tracking, facility scheduling, and facility maintenance ticketing are frequently dispersed across disjointed portals, physical notice boards, and email threads. Smart Campus eliminates this fragmentation through a modern React single-page application, an Express.js and Node.js RESTful API, and MongoDB persistent storage with resilient data seeding. The system enforces strict Role-Based Access Control (RBAC) across three distinct actors: Students, Faculty, and Administrators. Database-level atomic capacity checks prevent over-enrollment in academic courses and event registrations, while centralized error handling guarantees system robustness.
  </p>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 20px; margin-bottom: 10px;">
    1. INTRODUCTION
  </h3>
  <p style="font-size: 0.9rem; text-align: justify; margin-bottom: 12px;">
    Higher educational institutions operate complex ecosystems encompassing thousands of students, teaching personnel, academic departments, laboratories, and physical facilities. When academic enrollments, classroom reservations, maintenance complaints, and event announcements operate in silos, coordination breaks down. Administrative overhead increases, students face delayed grievance resolution, and facility utilization remains sub-optimal. Smart Campus addresses these issues by delivering a centralized, role-aware management portal.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.1 Problem Statement</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Collegiate administration frequently encounters communication bottlenecks due to isolated data repositories. Students struggle to track available courses and submit maintenance grievances; faculty lack real-time visibility into classroom occupancy; administrators are overburdened with manual ticket assignment and broadcast circular distribution. A unified, secure, role-governed web application is required to automate and streamline these multi-stakeholder operations.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.2 Objectives</h4>
  <ul style="font-size: 0.88rem; margin: 4px 0 10px 20px; padding: 0;">
    <li>Implement secure user authentication and stateless session management with JSON Web Tokens (JWT) and bcrypt password hashing.</li>
    <li>Provide complete academic Course Catalog management with automated capacity tracking and student self-enrollment.</li>
    <li>Deliver real-time Classroom and Lab Infrastructure monitoring with 1-click status reservation toggling.</li>
    <li>Establish a structured Campus Grievance Redressal ticketing module with severity levels, lifecycle stages, and administrative resolution notes.</li>
    <li>Maintain a priority-pinned official Notice Board and campus Hackathon/Event registration workflow.</li>
    <li>Enforce role-based operational permissions across Administrator, Faculty, and Student tiers.</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.3 Scope and Users</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    The project encompasses seven operational modules: authentication, academic course catalog, classroom/lab status, grievance ticketing, circulars notice board, event registrations, and campus user directory. The student role interacts with course registration, ticket logging, and event signups. The faculty role authors courses, reserves facilities, and broadcasts announcements. The administrator oversees institutional analytics, updates room inventory, resolves grievances, and governs user records.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.4 Expected Outcome</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    The expected outcome is a responsive, highly responsive web application accessible from any standard modern web browser without client-side installation. Campus members gain instantaneous access to real-time academic records, room availability, issue tracking, and institutional notifications.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.5 Significance of the Project</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Smart Campus modernizes university workflows by replacing manual spreadsheets and physical notice boards with authenticated REST APIs and interactive dashboards. Data consistency is enforced through MongoDB validation, preventing double bookings, orphaned complaint tickets, and uncoordinated circulars.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">1.6 Intended Users</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    The system is tailored for three distinct user groups: <strong>Students</strong> (course enrollment, ticketing, RSVP), <strong>Faculty Members</strong> (course authoring, classroom reservations, notice publication), and <strong>Campus Administrators</strong> (system auditing, infrastructure maintenance, grievance oversight).
  </p>
</div>

<!-- ========================================================================== -->
<!-- PAGE 3: SYSTEM ANALYSIS AND REQUIREMENTS -->
<!-- ========================================================================== -->
<div style="min-height: 980px; padding: 40px 20px; page-break-after: always; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 15px;">
    SMART CAMPUS | PAGE 3
  </div>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">
    2. SYSTEM ANALYSIS AND REQUIREMENTS
  </h3>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.1 Existing System</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    In conventional institutional workflows, campus notices are posted on physical bulletin boards, classroom bookings are recorded in paper registers, and infrastructure complaints are communicated informally or via unmonitored email threads. Consequently, students miss urgent academic deadlines, facilities face double-booking conflicts, and maintenance delays persist without accountability.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.2 Proposed System</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Smart Campus consolidates these disparate tasks into a single responsive web portal. It offers instant authentication with pre-seeded demo accounts, interactive dashboard analytics, multi-criteria filtering, full CRUD support for academic courses and facilities, a lifecycle-driven grievance redressal engine, and a priority-based notice board.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.3 Functional Requirements</h4>
  <ul style="font-size: 0.88rem; margin: 4px 0 10px 20px; padding: 0;">
    <li>User registration and login with encrypted password storage and stateless JWT token issuance.</li>
    <li>Course catalog with search, department/semester filtering, and 1-click student enrollment.</li>
    <li>Classroom and computing lab management with live status badges and booking reservation controls.</li>
    <li>Grievance redressal ticketing with categorization (IT, Hostel, Electrical), severity, and status lifecycle.</li>
    <li>Campus notice board with category classification and priority sticky pinning for urgent announcements.</li>
    <li>Campus event and hackathon directory with RSVP tracking and capacity limits.</li>
    <li>Interactive administrator analytics dashboard summarizing aggregate university statistics.</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.4 Non-Functional Requirements</h4>
  <ul style="font-size: 0.88rem; margin: 4px 0 10px 20px; padding: 0;">
    <li><strong>Security:</strong> Cryptographic password hashing with bcrypt (10 rounds) and protected API route middleware.</li>
    <li><strong>Reliability:</strong> Resilient database architecture with automated pre-seeding and local in-memory fallback.</li>
    <li><strong>Maintainability:</strong> Modular MVC architectural separation across routes, controllers, middleware, and models.</li>
    <li><strong>Usability:</strong> Modern glassmorphic responsive UI built with Lucide React iconography and accessible styling.</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 12px 0 6px 0;">2.5 Technology Stack</h4>
  <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #1e3a8a; color: #ffffff;">
        <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; width: 35%;">Component</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Technology</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Frontend</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">React 18, Vite 6, React Router DOM 6</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">UI & Styling</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">Custom CSS3 Design System, Lucide React Icons</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Backend Runtime</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">Node.js (v20+ / v25), Express.js (v4.21), RESTful API</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Database</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">MongoDB (v7/v8), Mongoose (v8.8), Resilient Data Store</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Security</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">JSON Web Token (JWT), bcryptjs, Role-Based Route Guards</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Testing / Deployment</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">Supertest, Automated 13-Test Suite; Render & Vercel</td>
      </tr>
    </tbody>
  </table>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.6 Development Environment</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    The project is partitioned into distinct <code>client</code> and <code>server</code> directory trees. The client development server runs via Vite with automated API reverse proxying, and the backend operates under Express. Database connection strings and token secrets are loaded using <code>dotenv</code>.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.7 System Workflow</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    A typical workflow initiates when a user logs in via demo credentials or registered details. The server verifies password hashes, generates a signed JWT payload containing user ID and role, and returns it to the client. The frontend stores this token in <code>localStorage</code>, dynamically rendering role-appropriate sidebar navigation links. All subsequent Axios requests attach this token via HTTP <code>Authorization: Bearer &lt;token&gt;</code> headers for verification.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">2.8 Software and Hardware Requirements</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    <strong>Software:</strong> Node.js runtime (v18 or higher), npm package manager, modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox), Git, and MongoDB service or MongoDB Atlas cluster.<br>
    <strong>Hardware:</strong> Minimum 4 GB RAM (8 GB recommended), multi-core processor (x86_64 or ARM64), 1 GB free disk storage, and stable network connectivity.
  </p>
</div>

<!-- ========================================================================== -->
<!-- PAGE 4: SYSTEM DESIGN AND IMPLEMENTATION -->
<!-- ========================================================================== -->
<div style="min-height: 980px; padding: 40px 20px; page-break-after: always; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 15px;">
    SMART CAMPUS | PAGE 4
  </div>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">
    3. SYSTEM DESIGN AND IMPLEMENTATION
  </h3>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.1 System Architecture</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Smart Campus employs a standard three-tier client-server architectural model. The Presentation Layer handles user interactions, rendering components and charts. The Application Layer exposes modular RESTful endpoints, applying validation, token verification, and RBAC authorization filters. The Data Layer encapsulates MongoDB schemas with Mongoose models and automatic data seeding.
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 14px;">
    <thead>
      <tr style="background-color: #1e3a8a; color: #ffffff;">
        <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left; width: 30%;">Layer</th>
        <th style="border: 1px solid #cbd5e1; padding: 6px 10px; text-align: left;">Responsibilities</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Presentation</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">React Single-Page Application, Protected Routes, Responsive Navbars, Modal Forms, Dashboard Visualizations</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Application</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">Express REST Router, JWT Auth Middleware, Role-Based Access Control Guards, Business Validation Logic</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px; font-weight: 600;">Data</td>
        <td style="border: 1px solid #cbd5e1; padding: 5px 10px;">MongoDB Atlas & Mongoose Models (User, Course, Classroom, Issue, Notice, Event) with Automated Seeding</td>
      </tr>
    </tbody>
  </table>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.2 Database Design</h4>
  <ul style="font-size: 0.88rem; margin: 4px 0 10px 20px; padding: 0;">
    <li><strong>User:</strong> Stores full name, email (unique, lowercase), password hash, role (<code>admin</code>, <code>faculty</code>, <code>student</code>), department, phone number, and avatar string.</li>
    <li><strong>Course:</strong> Encapsulates course code (unique), title, department, credits, semester, instructor, schedule, maximum capacity, and enrolled student ID array.</li>
    <li><strong>Classroom:</strong> Records room number, facility type (lecture hall, computer lab, seminar hall), capacity, equipment list, status (<code>available</code>, <code>occupied</code>, <code>maintenance</code>), and booking logs.</li>
    <li><strong>Issue (Grievances):</strong> Stores ticket title, category, location, severity level, lifecycle status (<code>open</code>, <code>in_progress</code>, <code>resolved</code>), submitting student ID, and administrative resolution remarks.</li>
    <li><strong>Notice:</strong> Maintains announcement title, markdown content, category, target audience (all, students, faculty), author ID, and boolean <code>isPinned</code> flag.</li>
    <li><strong>Event:</strong> Stores event title, description, category, date, venue, max capacity, and registered attendee array.</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.3 Major Modules</h4>
  <ul style="font-size: 0.88rem; margin: 4px 0 10px 20px; padding: 0;">
    <li><strong>Authentication & Profile:</strong> Secure user signups, logins, token verification, and profile management.</li>
    <li><strong>Course Catalog & Enrollment:</strong> Searchable course directory with real-time capacity and student enrollment toggle.</li>
    <li><strong>Classroom Infrastructure:</strong> Facility reservation tracking and status toggles for lab availability.</li>
    <li><strong>Grievance Redressal:</strong> Student ticket filing with priority classifications and administrator status resolution.</li>
    <li><strong>Circulars & Notices:</strong> Official announcements with audience filters and priority sticky display.</li>
    <li><strong>Campus Events & RSVPs:</strong> Co-curricular hackathon listings with capacity-bounded student registrations.</li>
    <li><strong>Institutional Directory:</strong> Searchable campus roster filtering faculty and students by department.</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.4 Key Business and Validation Logic</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Course and event enrollments implement concurrency safeguards. When a student initiates enrollment, the backend verifies that the student is not already registered and checks whether <code>enrolledStudents.length &lt; capacity</code>. If full, the endpoint returns an HTTP 400 error. The operation toggles enrollment idempotently, releasing seats upon cancellation.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.5 API and Security Design</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    The Express backend exposes REST endpoints structured under <code>/api/*</code>. Authentication is verified via an <code>authenticateToken</code> middleware inspecting standard Bearer tokens. Role restriction middleware (<code>authorizeRoles('admin', 'faculty')</code>) enforces authorization boundaries, rejecting unauthorized actions with HTTP 403 Forbidden.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.6 Data Validation</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Mongoose schema definitions enforce required field validation, email syntax matching, uniqueness constraints, and enumerated string checking (e.g., grievance status limited strictly to <code>open</code>, <code>in_progress</code>, or <code>resolved</code>). Centralized error middleware catches unhandled rejections and sends clean JSON responses.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.7 Request Processing Workflow</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Client actions trigger Axios calls. The backend router routes the request to controller functions which execute business queries via Mongoose models. Responses are serialized into standard JSON payloads: <code>{ success: true, data: [...] }</code>.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">3.8 Reliability and Data Consistency</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Database transactions and atomic array push operations (<code>$addToSet</code>, <code>$pull</code>) prevent duplicate student enrollments. System state resilience is backed by automated dataset re-seeding whenever the database collection is empty.
  </p>
</div>

<!-- ========================================================================== -->
<!-- PAGE 5: APPLICATION SCREENSHOTS & INTERFACE WALKTHROUGH -->
<!-- ========================================================================== -->
<div style="min-height: 980px; padding: 40px 20px; page-break-after: always; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 15px;">
    SMART CAMPUS | PAGE 5
  </div>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-bottom: 12px;">
    4. APPLICATION SCREENSHOTS
  </h3>
  <p style="font-size: 0.85rem; font-style: italic; color: #475569; margin-bottom: 16px;">
    The following interface illustrations are based on the live pages and responsive components developed in the Smart Campus source project.
  </p>

  <!-- Screenshot Mockup Cards Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px;">
    
    <!-- Figure 1 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #1e293b; color: #f8fafc; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <div style="font-weight: bold; color: #38bdf8;">🎓 Smart Campus Portal</div>
        <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 4px;">Role-Aware Institutional Overview</div>
        <div style="display: flex; gap: 8px; margin-top: 8px;">
          <span style="background: #334155; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Active Courses: 6</span>
          <span style="background: #334155; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Facilities: 6</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 1: Intelligent Campus Analytics Dashboard.</div>
    </div>

    <!-- Figure 2 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem; font-weight: bold;">
          <span>CS301: Full-Stack Web Dev</span>
          <span style="color: #059669;">Enrolled: 42/50</span>
        </div>
        <div style="background: #e2e8f0; height: 6px; border-radius: 3px; overflow: hidden;">
          <div style="background: #2563eb; width: 84%; height: 100%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.65rem; color: #64748b;">Instructor: Dr. Sharma</span>
          <span style="background: #2563eb; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">1-Click Enroll</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 2: Course Catalog with Enrollment Capacity.</div>
    </div>

    <!-- Figure 3 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem;">
          <span style="font-weight: bold;">Lab 302: AI Computing Lab</span>
          <span style="background: #dcfce7; color: #15803d; padding: 2px 6px; border-radius: 3px; font-weight: bold; font-size: 0.65rem;">Available</span>
        </div>
        <div style="font-size: 0.65rem; color: #64748b;">Capacity: 45 Workstations &bull; High-Performance GPUs</div>
        <div style="display: flex; justify-content: flex-end;">
          <span style="background: #0f172a; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Reserve Room</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 3: Classrooms and Computing Lab Status.</div>
    </div>

    <!-- Figure 4 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem;">
          <span style="font-weight: bold; color: #dc2626;">WiFi Disruption in Tech Block</span>
          <span style="background: #fee2e2; color: #b91c1c; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Urgent</span>
        </div>
        <div style="font-size: 0.65rem; color: #475569;">Stage: In Progress &bull; Ticket #1042</div>
        <div style="font-size: 0.65rem; color: #0284c7; font-weight: 600;">Resolution: Network team deployed router swap.</div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 4: Campus Grievances and Ticketing Tracker.</div>
    </div>

    <!-- Figure 5 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #fffbeb; border: 1px solid #fde68a; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: space-between;">
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem;">
          <span style="font-weight: bold; color: #92400e;">📌 Semester Final Schedule Released</span>
          <span style="background: #fef3c7; color: #b45309; padding: 1px 4px; border-radius: 2px; font-size: 0.65rem;">Academic</span>
        </div>
        <div style="font-size: 0.65rem; color: #78350f;">Target Audience: All Students &bull; Pinned by Dean</div>
        <div style="font-size: 0.6rem; color: #92400e; text-align: right;">Published: Today</div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 5: Priority Pinned Campus Notice Board.</div>
    </div>

    <!-- Figure 6 -->
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; height: 100px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <div style="font-weight: bold; font-size: 0.75rem; color: #1e3a8a;">⚡ 1-Click Evaluation Login</div>
        <div style="display: flex; gap: 4px; margin-top: 8px;">
          <span style="background: #ef4444; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Admin</span>
          <span style="background: #3b82f6; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Faculty</span>
          <span style="background: #10b981; color: #fff; padding: 2px 6px; border-radius: 3px; font-size: 0.65rem;">Student</span>
        </div>
      </div>
      <div style="text-align: center; margin-top: 6px; font-weight: 600; color: #334155;">Figure 6: Authentication & 1-Click Evaluator Login.</div>
    </div>
  </div>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">Student-Facing Screens</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Students log into a customized portal view showing enrolled courses, active event RSVPs, and lodged grievance tickets. The Course Catalog interface features dynamic keyword searching, department tabs, credit filters, and instantaneous course registration. The Grievance screen allows student reporting of infrastructure defects with location tagging and priority markers.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">Faculty & Administrative Screens</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Administrative users possess full system governance via an interactive analytics dashboard presenting active course rosters, available classroom inventories, open grievance tickets, and circular distribution stats. Administrators and Faculty can book or release classrooms, author course offerings, update grievance lifecycle stages with remarks, and pin priority circulars.
  </p>
</div>

<!-- ========================================================================== -->
<!-- PAGE 6: TESTING, DEPLOYMENT AND CONCLUSION -->
<!-- ========================================================================== -->
<div style="min-height: 980px; padding: 40px 20px; border-bottom: 2px dashed #cbd5e1;">
  <div style="text-align: right; font-size: 0.8rem; color: #64748b; font-weight: bold; letter-spacing: 0.05em; margin-bottom: 15px;">
    SMART CAMPUS | PAGE 6
  </div>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">4. APPLICATION SCREENSHOTS (CONTINUED)</h4>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px;">
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #0f172a; color: #fff; padding: 8px; border-radius: 4px; height: 80px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <div style="font-weight: bold; color: #38bdf8;">🗓️ HackCampus 2026 Hackathon</div>
        <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 4px;">Venue: Innovation Hub &bull; 85/100 Registered</div>
      </div>
      <div style="text-align: center; margin-top: 4px; font-weight: 600; color: #334155;">Figure 7: Campus Events & Hackathon RSVP Tracker.</div>
    </div>
    <div style="border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px; background: #f8fafc; font-size: 0.8rem;">
      <div style="background: #ffffff; border: 1px solid #cbd5e1; padding: 8px; border-radius: 4px; height: 80px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
        <div style="font-weight: bold; color: #1e3a8a;">👥 Campus People Directory</div>
        <div style="font-size: 0.65rem; color: #64748b; margin-top: 4px;">Search Professors, Staff & Students by Department</div>
      </div>
      <div style="text-align: center; margin-top: 4px; font-weight: 600; color: #334155;">Figure 8: Campus Roster & User Profiles Directory.</div>
    </div>
  </div>

  <h3 style="font-size: 1.1rem; font-weight: bold; color: #0f172a; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 15px; margin-bottom: 10px;">
    5. TESTING, DEPLOYMENT AND CONCLUSION
  </h3>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">5.1 Testing Approach</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 8px;">
    The application incorporates an automated end-to-end integration test suite (<code>node tests/api.test.js</code>) executed with Supertest against live API routes. All 13 critical functional checkpoints pass with 100% success:
  </p>

  <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; margin-bottom: 12px;">
    <thead>
      <tr style="background-color: #1e3a8a; color: #ffffff;">
        <th style="border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left; width: 32%;">Test Area</th>
        <th style="border: 1px solid #cbd5e1; padding: 5px 8px; text-align: left;">Expected Behaviour & Verified Result</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Health Check & Stats</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;"><code>/api/health</code> returns 200 OK; stats API aggregates metrics accurately. [PASS]</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Authentication & JWT</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;">Valid credentials return signed JWT; <code>/api/auth/me</code> verifies role accurately. [PASS]</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Course Management</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;">Keyword search filters courses; student 1-click enrollment toggles seats. [PASS]</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Classroom Allocation</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;">Filtering by status returns available labs; reservation toggle succeeds. [PASS]</td>
      </tr>
      <tr>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Grievance Ticketing</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;">Student ticket returns 201 Created; admin status update succeeds. [PASS]</td>
      </tr>
      <tr style="background-color: #f8fafc;">
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px; font-weight: 600;">Notices & Events</td>
        <td style="border: 1px solid #cbd5e1; padding: 4px 8px;">Pinned notices sort to top; hackathon RSVP toggles participant counter. [PASS]</td>
      </tr>
    </tbody>
  </table>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">5.2 Installation and Execution</h4>
  <ul style="font-size: 0.85rem; margin: 4px 0 10px 20px; padding: 0;">
    <li>Clone repository: <code>git clone https://github.com/Ayush/smart-campus-management-system.git</code></li>
    <li>Install dependencies: <code>npm install --prefix server && npm install --prefix client</code></li>
    <li>Configure environment: Create <code>server/.env</code> with <code>PORT=5000</code>, <code>MONGODB_URI</code>, and <code>JWT_SECRET</code>.</li>
    <li>Build client & start backend: <code>npm run build --prefix client && npm run start --prefix server</code></li>
    <li>Access running portal locally at: <strong><code>http://localhost:5000</code></strong> (or frontend dev server at <code>http://localhost:5174</code>).</li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">5.3 Conclusion</h4>
  <p style="font-size: 0.88rem; text-align: justify; margin-bottom: 10px;">
    Smart Campus delivers a production-ready, resilient web solution for collegiate institutions. By integrating course enrollments, room reservations, grievance workflows, and announcements into a single MERN-stack architecture with strict RBAC guards, the system eliminates communication bottlenecks and operational overhead. Future enhancements may incorporate real-time WebSockets for instant grievance notifications, QR-code based classroom attendance tracking, and integration with institutional SMS gateways.
  </p>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">REFERENCES</h4>
  <ul style="font-size: 0.82rem; margin: 4px 0 10px 20px; padding: 0;">
    <li>Smart Campus Source Code, Automated Test Suite, and Documentation.</li>
    <li>React.js Official Documentation: <a href="https://react.dev/" style="color: #2563eb;">https://react.dev/</a></li>
    <li>Node.js & Express API Framework: <a href="https://expressjs.com/" style="color: #2563eb;">https://expressjs.com/</a></li>
    <li>MongoDB Atlas & Mongoose ODM: <a href="https://www.mongodb.com/docs/" style="color: #2563eb;">https://www.mongodb.com/docs/</a></li>
    <li>JSON Web Tokens (RFC 7519): <a href="https://jwt.io/" style="color: #2563eb;">https://jwt.io/</a></li>
  </ul>

  <h4 style="font-size: 0.95rem; font-weight: bold; color: #1e3a8a; margin: 10px 0 4px 0;">GITHUB REPOSITORY & LIVE DEPLOYMENT</h4>
  <p style="font-size: 0.85rem; margin-bottom: 20px;">
    <strong>GitHub Repository:</strong> <a href="https://github.com/Ayush/smart-campus-management-system" style="color: #2563eb;">https://github.com/Ayush/smart-campus-management-system</a><br>
    <strong>Live Deployed URL:</strong> <a href="https://smart-campus-system.onrender.com" style="color: #2563eb;">https://smart-campus-system.onrender.com</a> (or <a href="http://localhost:5000" style="color: #2563eb;">http://localhost:5000</a>)
  </p>
</div>

</div>
