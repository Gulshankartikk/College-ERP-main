# College ERP Management System

A comprehensive Enterprise Resource Planning (ERP) system designed for educational institutions to manage students, teachers, courses, and administrative tasks.

## 🚀 Features

### Admin Panel
- **Dashboard**: Real-time system statistics and analytics
- **User Management**: Full CRUD operations for students and teachers
- **Course Management**: Create and manage courses with subjects
- **Subject Management**: Add subjects with semester, branch, and credits
- **Fee Management**: Track payments, dues, and generate reports
- **Attendance Management**: Monitor attendance across all classes
- **Exam Management**: Schedule and manage examinations
- **Library Management**: Manage library resources and books
- **Timetable Management**: Create and manage class schedules
- **Notices Management**: Create, edit, and publish institutional notices
- **Reports**: Generate comprehensive academic and financial reports
- **Settings**: System configuration and preferences
- **Role-Based Access Control**: Secure access management
- **Auto-Logout**: 2-minute inactivity timeout for security

### Teacher Portal
- **Dashboard**: Personal teaching overview with quick actions
- **Attendance Management**: Mark attendance by subject and date
- **Assignment Management**: Create, edit, and track assignments
- **Study Materials**: Upload and share learning resources
- **Marks Management**: Record and manage student marks
- **Timetable**: View weekly teaching schedule
- **Notices**: View institutional notices
- **Leave Management**: Apply for leave requests
- **Student List**: View students (read-only access)
- **Profile Management**: Update personal information

### Student Portal
- **Dashboard**: Personal academic overview and statistics
- **Attendance Tracking**: View detailed attendance records
- **Assignments**: Access and view assignments by subject
- **Study Materials**: Download course materials and resources
- **Notes**: Access teacher-uploaded notes
- **Timetable**: View weekly class schedule
- **Notices**: View institutional announcements
- **Fee Management**: View fee details and payment history
- **Leave Management**: Apply for leave requests
- **Profile Management**: Update personal information

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **Cloudinary** for media storage (optional)

### Frontend
- **React 18** with Vite
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Icons** for UI icons

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud)
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone and Setup
```bash
git clone <repository-url>
cd College-ERP-main
npm run install-all
```

### 2. Environment Configuration
```bash
# Backend environment is auto-created
# Modify backend/.env if needed
```

### 3. Initialize Database
```bash
npm run setup-env
```

### 4. Start the Application
```bash
npm start
```

### 5. Access the System
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 🔐 Default Login Credentials

### Admin Access
- **Username**: admin
- **Password**: admin123

### Teacher Access
- Teachers are created by admin
- **Username**: teacher
- **Password**: teacher123

### Student Access
- Students are created by admin
- Default password: student123

## 🔑 Role-Based Access Control

### Admin Permissions
- Full access to all modules
- Create, read, update, delete operations on all entities
- Access to teacher and student management pages
- System configuration and settings

### Teacher Permissions
- Read-only access to student management
- Full access to own teaching modules (attendance, assignments, materials, marks)
- Cannot edit or delete students
- Cannot access teacher management

### Student Permissions
- Read-only access to own academic data
- View attendance, assignments, materials, notices
- Cannot access management pages
- Profile update only

## 📁 Project Structure

```
College-ERP-main/
├── backend/                 # Backend API server
│   ├── controller/         # Route controllers
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication & middleware
│   ├── config/            # Configuration files
│   ├── services/          # Business logic services
│   ├── validators/        # Input validation
│   ├── utils/             # Utility scripts
│   ├── uploads/           # File upload directory
│   ├── logs/              # Backend logs
│   └── index.js           # Server entry point
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── Pages/         # Page components
│   │   ├── features/      # Redux slices
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context
│   │   ├── layouts/       # Layout components
│   │   ├── styles/        # CSS files
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── config/                # Global configuration
├── docs/                  # Documentation
├── scripts/               # Setup & utility scripts
├── tests/                 # Integration tests
├── logs/                  # Application logs
├── backups/               # Database backups
├── deployment/            # Deployment configs
└── package.json           # Root configuration
```

📖 **Detailed Structure**: See [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md)

## 🔧 Available Scripts

```bash
# Quick Start
npm run install-all     # Install all dependencies
npm run setup-env       # Initialize database
npm start              # Start both servers

# Development
npm run backend        # Start backend only
npm run frontend       # Start frontend only
npm run dev           # Start both in development mode

# Production
npm run build         # Build for production

# Maintenance
npm run health-check  # System health check
npm run clean         # Clean node_modules
npm run clean-logs    # Clean log files
npm run backup-db     # Backup database
npm run restore-db    # Restore database

# Testing & Quality
npm test              # Run all tests
npm run lint          # Run linting
```

📖 **Setup Guide**: See [SETUP_GUIDE.md](docs/SETUP_GUIDE.md)

## 🌐 API Endpoints

### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/teacher/login` - Teacher login
- `POST /api/student/login` - Student login
- `POST /api/logout` - Logout (all roles)

### Admin Routes (Protected)
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/teachers` - Get all teachers
- `POST /api/admin/teachers` - Create teacher
- `PUT /api/admin/teachers/:id` - Update teacher
- `DELETE /api/admin/teachers/:id` - Delete teacher
- `GET /api/admin/students` - Get all students
- `POST /api/admin/students` - Create student
- `PUT /api/admin/students/:id` - Update student
- `DELETE /api/admin/students/:id` - Delete student
- `GET /api/admin/courses` - Get all courses (read-only for authenticated users)
- `POST /api/admin/courses` - Create course
- `GET /api/admin/subjects` - Get all subjects (read-only for authenticated users)
- `POST /api/admin/subjects` - Create subject

### Teacher Routes (Protected)
- `GET /api/teacher/dashboard` - Teacher dashboard
- `POST /api/teacher/attendance` - Mark attendance
- `GET /api/teacher/attendance` - Get attendance records
- `POST /api/teacher/assignments` - Create assignment
- `GET /api/teacher/assignments` - Get assignments
- `POST /api/teacher/materials` - Upload materials
- `GET /api/teacher/materials` - Get materials
- `POST /api/teacher/marks` - Add marks
- `GET /api/teacher/students` - View students (read-only)

### Student Routes (Protected)
- `GET /api/student/dashboard` - Student dashboard
- `GET /api/student/attendance` - View attendance
- `GET /api/student/assignments` - View assignments
- `GET /api/student/materials` - Access materials
- `GET /api/student/marks` - View marks
- `GET /api/student/fees` - View fee details
- `GET /api/student/notices` - View notices

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication with HTTP-only cookies
- **Role-Based Access Control (RBAC)**: Three-tier access system (Admin, Teacher, Student)
- **Auto-Logout**: 2-minute inactivity timeout with activity tracking
- **Password Hashing**: Bcrypt encryption for all passwords
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Cross-origin request security
- **Protected Routes**: Frontend and backend route protection
- **Session Management**: Secure session handling with cookies
- **Back Button Prevention**: Prevents unauthorized access after logout

## 📊 Database Schema

### Core Models
- **Admin**: System administrators with full access
- **Teacher**: Faculty members with teaching credentials
- **Student**: Enrolled students with academic records
- **Course**: Academic programs (courseName, courseCode, duration)
- **Subject**: Course subjects (subjectName, subjectCode, semester, branch, credits, isElective)
- **Attendance**: Daily attendance records with date and status
- **Assignment**: Student assignments with deadlines and submissions
- **StudyMaterial**: Learning resources and documents
- **Marks**: Student performance records
- **Fee**: Fee structure and payment tracking
- **Notice**: Institutional announcements with priority levels
- **Leave**: Leave applications and approvals
- **Timetable**: Class schedules and time slots

## 🚀 Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
# Deploy backend to your server
# Deploy frontend build to static hosting
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGO_URI in backend/.env

2. **Port Already in Use**
   - Change PORT in backend/.env
   - Update BASE_URL in frontend/src/constants/baseUrl.js

3. **Dependencies Issues**
   - Run `npm run install-all`
   - Clear node_modules and reinstall

### Health Check
```bash
npm run health-check
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the documentation
- Create an issue in the repository

## ✅ Completed Features

- [x] Role-based access control
- [x] Auto-logout on inactivity
- [x] Complete admin panel with all management modules
- [x] Teacher portal with attendance, assignments, materials, marks
- [x] Student portal with academic tracking
- [x] Fee management with payment tracking
- [x] Notice management with create/edit/delete
- [x] Timetable management
- [x] Subject filtering across modules
- [x] Responsive design for all pages
- [x] Toast notifications for user feedback
- [x] Modal-based forms for better UX

## 🎯 Future Enhancements

- [ ] Email notifications for important events
- [ ] SMS alerts for attendance and fees
- [ ] Advanced reporting with charts and graphs
- [ ] Mobile app (React Native)
- [ ] Integration with payment gateways
- [ ] Biometric attendance integration
- [ ] Video conferencing integration
- [ ] Parent portal
- [ ] Alumni management
- [ ] Hostel management
- [ ] Transport management
- [ ] Bulk import/export operations
- [ ] Multi-language support
- [ ] Dark mode theme

## 📸 Screenshots

### Admin Dashboard
- Real-time statistics and analytics
- Quick access to all management modules
- System health monitoring

### Teacher Dashboard
- Teaching overview with subject-wise statistics
- Quick actions for common tasks
- Recent activities and notifications

### Student Dashboard
- Academic performance overview
- Attendance summary
- Upcoming assignments and deadlines

## 🔄 Recent Updates

### Version 2.0 (Latest)
- Added role-based access control
- Implemented auto-logout feature (2-minute timeout)
- Completed fee management module
- Added notice management with full CRUD
- Enhanced teacher pages (attendance, assignments, materials, marks)
- Enhanced student pages (timetable, notices, fees, leave)
- Fixed subject validation with semester and branch
- Added unauthorized access page
- Improved UI/UX with modals and toast notifications
- Fixed all 404 errors by creating missing admin pages

## 🔧 Admin Pages Implementation

### Pages Created
All admin management pages have been implemented with full functionality:

1. **Teacher Management** (`/admin/teachers`)
   - View all teachers with contact information
   - Add/edit/delete functionality (admin only)
   - Subject assignments tracking
   - Role-based access control

2. **Course Management** (`/admin/courses`)
   - Course catalog with enrollment numbers
   - Duration and code information
   - Student count tracking
   - Add/edit/delete courses

3. **Fee Management** (`/admin/fees`)
   - Payment tracking and status
   - Financial summaries with statistics
   - Due amount calculations
   - Export functionality (CSV)
   - Payment history tracking
   - Add payment, view details, edit fee modals

4. **Attendance Management** (`/admin/attendance`)
   - Attendance percentage tracking
   - Visual progress bars
   - Status indicators (Good/Average/Poor)
   - Date range filtering
   - Export reports

5. **Exam Management** (`/admin/exams`)
   - Exam scheduling calendar
   - Status tracking (Scheduled/Completed/Upcoming)
   - Quick action buttons
   - Exam details management
   - Results publishing

6. **Library Management** (`/admin/library`)
   - Book inventory management
   - Availability tracking
   - Category-based organization
   - Issue/return functionality
   - Library statistics

7. **Timetable Management** (`/admin/timetable`)
   - Weekly schedule grid
   - Teacher assignments
   - Subject allocation
   - Time slot management
   - Class scheduling

8. **Reports Management** (`/admin/reports`)
   - Multiple report types (Academic, Financial, Attendance, Performance)
   - Export options (PDF/Excel/CSV)
   - Recent reports history
   - Custom date ranges
   - Report templates

9. **Settings Management** (`/admin/settings`)
   - Tabbed interface for different settings
   - System configuration options
   - Security settings
   - Notification preferences
   - User preferences

10. **Notices Management** (`/admin/notices`)
    - Create, edit, delete notices with modals
    - Priority levels (Low/Medium/High/Urgent)
    - Target audience selection
    - Notice templates
    - View full notice details
    - Toast notifications for actions

### Common Features Across All Pages
- **Consistent Design**: All pages follow the same design pattern with AdminHeader and BackButton
- **Responsive Layout**: Mobile-friendly responsive design
- **Interactive Elements**: Buttons, forms, and navigation elements
- **Search & Filter**: Most pages include search and filtering capabilities
- **Action Buttons**: Add, edit, delete, and view functionality
- **Statistics Cards**: Summary information displayed prominently
- **Tables**: Data displayed in organized, sortable tables
- **Modal Forms**: Better UX with modal-based forms
- **Toast Notifications**: User feedback for all actions

### Routing Configuration
All routes properly configured in `frontend/src/main.jsx`:
```jsx
<Route path="admin">
  <Route path="dashboard" element={<AdminDashboard />} />
  <Route path="teachers" element={<TeacherManagement />} />
  <Route path="students" element={<StudentManagement />} />
  <Route path="courses" element={<CourseManagement />} />
  <Route path="fees" element={<FeeManagement />} />
  <Route path="attendance" element={<AttendanceManagement />} />
  <Route path="exams" element={<ExamManagement />} />
  <Route path="library" element={<LibraryManagement />} />
  <Route path="timetable" element={<TimetableManagement />} />
  <Route path="reports" element={<ReportsManagement />} />
  <Route path="settings" element={<SettingsManagement />} />
  <Route path="notices" element={<NoticesManagement />} />
</Route>
```

### Files Created
- `frontend/src/Pages/admin/TeacherManagement.jsx`
- `frontend/src/Pages/admin/CourseManagement.jsx`
- `frontend/src/Pages/admin/FeeManagement.jsx`
- `frontend/src/Pages/admin/AttendanceManagement.jsx`
- `frontend/src/Pages/admin/ExamManagement.jsx`
- `frontend/src/Pages/admin/LibraryManagement.jsx`
- `frontend/src/Pages/admin/TimetableManagement.jsx`
- `frontend/src/Pages/admin/ReportsManagement.jsx`
- `frontend/src/Pages/admin/SettingsManagement.jsx`
- `frontend/src/Pages/admin/NoticesManagement.jsx`
- `frontend/src/Pages/Unauthorized.jsx`

### Testing Status
✅ All routes resolve correctly
✅ No 404 errors from admin dashboard navigation
✅ All pages load with proper styling and functionality
✅ Navigation between pages works seamlessly
✅ Role-based access control implemented
✅ Back button functionality preserved

## 👥 Team & Support

For support, bug reports, or feature requests:
- Create an issue in the repository
- Check existing documentation
- Review troubleshooting guide

## 🙏 Acknowledgments

- React team for the amazing framework
- MongoDB team for the robust database
- All contributors and testers

---

**College ERP Management System v2.0** - Streamlining educational administration with modern technology.

*Built with ❤️ for educational institutions*