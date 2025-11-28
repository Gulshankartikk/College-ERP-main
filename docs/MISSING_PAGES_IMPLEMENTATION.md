# Missing Pages Implementation Plan

## 🔴 CRITICAL MISSING PAGES

### Teacher Panel (Missing)
- ❌ Timetable View
- ❌ Leave Application
- ❌ Chat/Support
- ❌ Notices View (separate page)

### Student Panel (Missing)
- ❌ Fees Details & Payments
- ❌ Timetable View
- ❌ Leave Request
- ❌ Chat/Support
- ❌ Notices View (separate page)

### Admin Panel (Missing)
- ❌ Chat/Support
- ❌ System Settings (exists but needs enhancement)
- ❌ Reports & Analytics (exists but needs enhancement)

## ✅ EXISTING PAGES

### Teacher Panel (Existing)
- ✅ Dashboard - `/teacher/:id/dashboard`
- ✅ My Profile - `/teacher/:id/profile`
- ✅ Attendance Management - `/teacher/:id/attendance`
- ✅ Student List - `/teacher/:id/students`
- ✅ Marks Management - `/teacher/:id/marks`
- ✅ Assignments - `/teacher/:id/assignments`
- ✅ Study Materials - `/teacher/:id/materials`

### Student Panel (Existing)
- ✅ Dashboard - `/student/:id/dashboard`
- ✅ My Profile - `/student/:id/profile`
- ✅ Attendance View - `/student/:id/attendance`
- ✅ Marks/Results - `/student/:id/marks`
- ✅ Assignments - `/student/:id/assignments`
- ✅ Course Materials - `/student/:id/materials`
- ✅ Notes - `/student/:id/notes`

### Admin Panel (Existing)
- ✅ Dashboard - `/admin/dashboard`
- ✅ Manage Students - `/admin/students`
- ✅ Manage Teachers - `/admin/teachers`
- ✅ Manage Courses - `/admin/courses`
- ✅ Manage Subjects - `/admin/add-subject`
- ✅ Attendance Control - `/admin/attendance`
- ✅ Exam Management - `/admin/exams`
- ✅ Fee Management - `/admin/fees`
- ✅ Timetable Management - `/admin/timetable`
- ✅ Notice Board - `/admin/notices`
- ✅ Settings - `/admin/settings`
- ✅ Reports - `/admin/reports`

## 📋 IMPLEMENTATION PRIORITY

### Phase 1 (Critical - Implement Now)
1. Teacher Timetable View
2. Student Timetable View
3. Teacher Notices View
4. Student Notices View
5. Student Fees View

### Phase 2 (Important)
1. Teacher Leave Application
2. Student Leave Request
3. Leave Management (Admin)

### Phase 3 (Nice to Have)
1. Chat/Support System (All roles)
2. Enhanced Reports & Analytics

## 🗄️ DATABASE MODELS NEEDED

### Timetable Model (Already exists in backend)
```javascript
{
  courseId: ObjectId,
  semester: Number,
  day: String,
  timeSlot: String,
  subjectId: ObjectId,
  teacherId: ObjectId,
  roomNo: String
}
```

### Leave Model (Need to create)
```javascript
{
  userId: ObjectId,
  userRole: String (teacher/student),
  leaveType: String,
  startDate: Date,
  endDate: Date,
  reason: String,
  status: String (pending/approved/rejected),
  approvedBy: ObjectId,
  createdAt: Date
}
```

### Fee Model (Need to create)
```javascript
{
  studentId: ObjectId,
  semester: Number,
  totalAmount: Number,
  paidAmount: Number,
  dueAmount: Number,
  dueDate: Date,
  status: String (paid/pending/overdue),
  transactions: [{
    amount: Number,
    date: Date,
    method: String,
    transactionId: String
  }]
}
```

## 🔗 ROUTES TO ADD

### Frontend Routes
```javascript
// Teacher
/teacher/:id/timetable
/teacher/:id/notices
/teacher/:id/leave

// Student
/student/:id/timetable
/student/:id/notices
/student/:id/fees
/student/:id/leave

// Admin
/admin/leaves
/admin/chat
```

### Backend Routes
```javascript
// Timetable
GET /api/teacher/:id/timetable
GET /api/student/:id/timetable
GET /api/admin/timetable

// Notices
GET /api/teacher/:id/notices
GET /api/student/:id/notices

// Leaves
POST /api/teacher/:id/leave
GET /api/teacher/:id/leaves
POST /api/student/:id/leave
GET /api/student/:id/leaves
GET /api/admin/leaves
PUT /api/admin/leaves/:id/approve

// Fees
GET /api/student/:id/fees
POST /api/admin/fees
PUT /api/admin/fees/:id
```
