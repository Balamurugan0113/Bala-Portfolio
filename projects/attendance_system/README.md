# Smart Institutional Attendance & Academic Governance ERP

An enterprise-grade, full-stack institutional academic governance and attendance platform engineered with **FastAPI**, **React 18 / TypeScript**, and **SQLAlchemy**. Designed for collegiate and university environments, this system eliminates proxy attendance, synchronizes lecture schedules to Indian Standard Time (IST, UTC+05:30) with non-bypassable period timing window lockouts, and introduces an AI-powered conversational quick-chat attendance bot alongside automated On-Duty (OD) governance.

---

## 🌟 Core Architecture & Key Capabilities

### 1. Real-Time IST Timetable Synchronization & Window Enforcement
* **Server-Authoritative Time Locking:** All attendance windows are validated against atomic server Indian Standard Time (IST, UTC+05:30), preventing local device clock tampering.
* **Period Window Gates:** Faculty can mark attendance only during active lecture slots (or an administrator-configured grace window). Attempting to submit attendance outside the scheduled timetable slot triggers non-bypassable backend validation rejections.
* **Automatic Day-Order / Timetable Mapping:** Automatically maps the active day of the week, academic year, semester, and section to the assigned subject and faculty member.

### 2. Conversational AI / NLP Attendance Quick-Chat Bot
* **Natural Language Roll Marking:** Faculty can dictate or type attendance shorthand (e.g., *"Mark 12, 14, 28 absent"*, *"Only roll numbers 5 and 19 missing"*, *"Everyone present except 42"*).
* **Regex & Intent Parsing:** The integrated NLP parser extracts student roll numbers, cross-references enrolled rosters, and pre-populates attendance submissions in sub-100ms.
* **Instant Confirmation Dialog:** Displays visual confirmation chips before committing transactional database writes.

### 3. Multi-Tier Hierarchical RBAC (5 Personas)
* **Institutional Admin:** Manages departmental hierarchies, global timetable definitions, master student/faculty enrollments, academic calendar configuration, and system audit logs.
* **Head of Department (HOD):** Department-wide attendance oversight, faculty lecture compliance audits, and multi-section attendance reports.
* **Class Advisor:** Section-specific governance, overall percentage trackers, medical leave reconciliation, and student attendance warning generation.
* **Faculty / Subject In-Charge:** Real-time period attendance entry (manual grid or NLP quick-chat), period-wise attendance summaries, and OD visibility.
* **Student Portal:** Real-time subject-wise percentage tracking, period-by-period attendance audit logs, and OD approval tracking.

### 4. Automated On-Duty (OD) Governance Pipeline
* **Conflict Prevention:** Students marked as approved On-Duty (OD) for institutional events, sports, or symposiums are automatically protected and flagged as present with official OD provenance.
* **Two-Step Approval Flow:** Student submission → Class Advisor verification → HOD final endorsement.

### 5. Audit Logging & Tamper-Resistant Provenance
* Every attendance submission, manual adjustment, or backdated override is immutably logged with the acting faculty's user ID, IP address, timestamp, and explicit justification note.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Framer Motion, Axios |
| **Backend API** | FastAPI (Asynchronous Python 3.10+), Pydantic v2, Uvicorn ASGI Server |
| **ORM & Database** | SQLAlchemy 2.0 ORM, PostgreSQL / SQLite, Alembic Schema Migrations |
| **Authentication** | OAuth2 with JWT (JSON Web Tokens), Bcrypt Password Hashing, RBAC Middleware |
| **Parsing & Intelligence** | Python Regex & NLP Tokenizers, IST Timezone Utilities (`pytz` / `zoneinfo`) |
| **Deployment** | Docker Multi-Stage Containerization, Gunicorn/Uvicorn, Vercel/Node |

---

## 🏗️ Relational Data Model (Key Tables)

```
[ Departments ] ──< [ Faculty ] ──< [ Timetable Periods ]
       │                   │                      │
       └──< [ Students ] ──┴───────────< [ Attendance Logs ]
                 │                                │
                 └───< [ OD Applications ] ───────┘
```

* `users`: Stores credentials, role (`ADMIN`, `HOD`, `ADVISOR`, `FACULTY`, `STUDENT`), and department reference.
* `students`: Roll number, register number, department, year, semester, section.
* `timetable`: Day order/day of week, period number, start time, end time, subject code, assigned faculty ID.
* `attendance_records`: Date, timetable period ID, student ID, status (`PRESENT`, `ABSENT`, `ON_DUTY`), marked by faculty ID, timestamp.
* `on_duty_requests`: Student ID, event description, date range, period range, approval status, approving authority ID.
* `audit_logs`: Entity modified, previous state, new state, user ID, timestamp, reason.

---

## 🚀 Getting Started

### Prerequisites
* Python 3.10 or higher
* Node.js 18+ and npm
* Git

### Backend Setup (FastAPI)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn[standard] sqlalchemy pydantic python-jose[cryptography] passlib[bcrypt] pytz
   ```

4. **Run the API server:**
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
   Interactive Swagger documentation available at: `http://localhost:8000/docs`

### Frontend Setup (React + Vite)

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install node dependencies:**
   ```bash
   npm install
   ```

3. **Launch the development server:**
   ```bash
   npm run dev
   ```
   The client interface will run on `http://localhost:5173`.

---

## 🔒 Security Best Practices
* **Token Expiry & Refresh:** JWT bearer tokens expire automatically after 8 hours; critical actions require re-authentication.
* **SQL Injection & XSS Protection:** Parameterized queries handled natively via SQLAlchemy ORM; Pydantic models sanitize and strip dangerous payloads.
* **Timing Attack Mitigation:** Bcrypt algorithm handles password verification with adaptive work factors.
* **Rate Limiting:** Protects login endpoints from brute-force authentication attacks.

---

## 📜 License & Provenance
Engineered by **Balamurugan C** (B.Tech AI & Data Science) as a production-grade academic management system for higher education institutions.
