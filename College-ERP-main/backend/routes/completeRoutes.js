const express = require('express');
const router = express.Router();

// ================= MIDDLEWARES =================
const { isAdmin } = require('../middleware/Auth');
const upload = require('../middleware/upload');

// ================= CONTROLLERS =================
const adminController = require('../controller/adminController');
const teacherController = require('../controller/teacherController');
const studentController = require('../controller/studentController');
const notificationController = require('../controller/notificationController');

// ================= MODELS =================
const { Course, Subject, Teacher, Student } = require('../models/CompleteModels');


// ======================================================
//                     ADMIN ROUTES
// ======================================================

// Login & Dashboard
router.post('/admin/login', adminController.adminLogin);
router.get('/admin/dashboard', isAdmin, adminController.getDashboardData);

// Fetch all active students
router.get('/admin/students', isAdmin, async (req, res) => {
  try {
    const students = await Student.find({ isActive: true })
      .populate('courseId', 'courseName courseCode');

    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Fetch courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Fetch subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .populate('courseId', 'courseName courseCode');

    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Fetch teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true });
    res.json({ success: true, teachers });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// Add subject (basic)
router.post('/subjects/add', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();

    res.json({ success: true, subject });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// ================= Course Management =================
router.post('/admin/courses', isAdmin, adminController.addCourse);
router.delete('/admin/courses/:courseId', isAdmin, adminController.deleteCourse);

// ================= Subject Management =================
router.post('/admin/subjects', isAdmin, adminController.addSubject);
router.delete('/admin/subjects/:subjectId', isAdmin, adminController.deleteSubject);

// ================= Teacher Management =================
router.post('/admin/teachers', isAdmin, adminController.addTeacher);
router.delete('/admin/teachers/:teacherId', isAdmin, adminController.deleteTeacher);

// ================= Student Management =================
router.post('/admin/students', isAdmin, adminController.addStudent);
router.delete('/admin/students/:studentId', isAdmin, adminController.deleteStudent);

// ================= Assignment Management =================
router.post('/admin/assign-teacher', isAdmin, adminController.assignTeacherToSubject);
router.post('/admin/remove-teacher', isAdmin, adminController.removeTeacherFromSubject);

// ================= Attendance Reports =================
router.get('/admin/attendance-report', isAdmin, adminController.getComprehensiveAttendanceReport);

// ================= Admin Delete Operations =================
router.delete('/admin/assignments/:assignmentId', isAdmin, adminController.deleteAssignment);
router.delete('/admin/notices/:noticeId', isAdmin, adminController.deleteNotice);
router.delete('/admin/materials/:materialId', isAdmin, adminController.deleteMaterial);

// ================= Admin Update Operations =================
router.put('/admin/teachers/:teacherId', isAdmin, adminController.updateTeacher);


// ======================================================
//                     TEACHER ROUTES
// ======================================================
router.post('/teacher/login', teacherController.teacherLogin);
router.get('/teacher/:teacherId/dashboard', teacherController.getTeacherDashboard);

// Students under a subject
router.get('/teacher/subjects/:subjectId/students', teacherController.getStudentsBySubject);

// Attendance
router.post('/teacher/:teacherId/attendance', teacherController.markAttendance);
router.get('/teacher/:teacherId/attendance', teacherController.getAttendanceReport);

// Marks
router.post('/teacher/:teacherId/marks', teacherController.addMarks);
router.get('/teacher/:teacherId/marks/all-students', teacherController.getAllStudentsMarks);

// Notes
router.post('/teacher/:teacherId/notes', upload.single('file'), teacherController.addNotes);
router.get('/teacher/:teacherId/notes', teacherController.getTeacherNotes);

// Study Material
router.post('/teacher/:teacherId/materials', upload.single('file'), teacherController.addStudyMaterial);
router.get('/teacher/:teacherId/materials', teacherController.getTeacherMaterials);

// Assignments
router.post('/teacher/:teacherId/assignments', upload.single('file'), teacherController.addAssignment);
router.get('/teacher/:teacherId/assignments', teacherController.getTeacherAssignments);

// Notices
router.post('/teacher/:teacherId/notices', teacherController.addNotice);
router.get('/teacher/:teacherId/notices', teacherController.getTeacherNotices);


// ======================================================
//                     STUDENT ROUTES
// ======================================================
router.post('/student/login', studentController.studentLogin);
router.get('/student/:studentId/dashboard', studentController.getStudentDashboard);
router.get('/student/:studentId/profile', studentController.getStudentProfile);

// Attendance
router.get('/student/:studentId/attendance', studentController.getStudentAttendance);

// Subjects
router.get('/student/:studentId/subjects', studentController.getStudentSubjects);

// Notes
router.get('/student/:studentId/notes', studentController.getNotesBySubject);

// Materials
router.get('/student/:studentId/materials', studentController.getStudyMaterials);

// Assignments
router.get('/student/:studentId/assignments', studentController.getAssignments);
router.post('/student/:studentId/assignments/:assignmentId/submit', studentController.submitAssignment);

// Marks
router.get('/student/:studentId/marks', studentController.getStudentMarks);

// Notices
router.get('/student/:studentId/notices', studentController.getNotices);


// ======================================================
//                  NOTIFICATION ROUTES
// ======================================================
router.get('/notifications/:userId', notificationController.getUserNotifications);
router.get('/notifications/:userId/unread-count', notificationController.getUnreadCount);
router.put('/notifications/:notificationId/read', notificationController.markAsRead);


module.exports = router;
