const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// ================= MIDDLEWARES =================
const { verifyToken, isAdmin } = require('../middleware/Auth');
const upload = require('../middleware/upload');

// ================= CONTROLLERS =================
const adminController = require('../controller/adminController');
const teacherController = require('../controller/teacherController');
const studentController = require('../controller/studentController');

// ================= MODELS =================
const { Course, Subject, Teacher, Student } = require('../models/CompleteModels');


// ======================================================
//                        ADMIN LOGIN
// ======================================================
router.post('/admin/login', adminController.adminLogin);


// ======================================================
//                      TEACHER ROUTES
// ======================================================
router.post('/teacher/register', teacherController.teacherRegister);
router.post('/teacher/login', teacherController.teacherLogin);

router.get('/teacher/:teacherId/dashboard', verifyToken, teacherController.getTeacherDashboard);
router.get('/teacher/:teacherId/assignments', verifyToken, teacherController.getTeacherAssignments);
router.post('/teacher/:teacherId/assignments', verifyToken, upload.single('file'), teacherController.addAssignment);

router.get('/teacher/:teacherId/students/:subjectId', verifyToken, teacherController.getStudentsBySubject);
router.post('/teacher/:teacherId/attendance', verifyToken, teacherController.markAttendance);
router.get('/teacher/:teacherId/attendance-report', verifyToken, teacherController.getAttendanceReport);

router.post('/teacher/:teacherId/marks', verifyToken, teacherController.addMarks);
router.get('/teacher/:teacherId/marks/:subjectId', verifyToken, teacherController.getAllStudentsMarks);

router.post('/teacher/:teacherId/notes', verifyToken, upload.single('file'), teacherController.addNotes);
router.post('/teacher/:teacherId/materials', verifyToken, upload.single('file'), teacherController.addStudyMaterial);
router.post('/teacher/:teacherId/notices', verifyToken, teacherController.addNotice);

router.post('/teacher/:teacherId/courses', verifyToken, teacherController.addCourse);
router.post('/teacher/:teacherId/subjects', verifyToken, teacherController.addSubject);

router.get('/teacher/:teacherId/notes', verifyToken, teacherController.getTeacherNotes);
router.get('/teacher/:teacherId/materials', verifyToken, teacherController.getTeacherMaterials);
router.get('/teacher/:teacherId/notices', verifyToken, teacherController.getTeacherNotices);


// ======================================================
//                      STUDENT ROUTES
// ======================================================
router.post('/student/register', studentController.studentRegister);
router.post('/student/login', studentController.studentLogin);

router.get('/student/:studentId/dashboard', verifyToken, studentController.getStudentDashboard);
router.get('/student/:studentId/profile', verifyToken, studentController.getStudentProfile);

router.get('/student/:studentId/attendance', verifyToken, studentController.getStudentAttendance);
router.get('/student/:studentId/subjects', verifyToken, studentController.getStudentSubjects);

router.get('/student/:studentId/notes', verifyToken, studentController.getNotesBySubject);
router.get('/student/:studentId/materials', verifyToken, studentController.getStudyMaterials);
router.get('/student/:studentId/assignments', verifyToken, studentController.getAssignments);

router.post('/student/:studentId/assignments/:assignmentId/submit', verifyToken, studentController.submitAssignment);
router.get('/student/:studentId/marks', verifyToken, studentController.getStudentMarks);
router.get('/student/:studentId/notices', verifyToken, studentController.getNotices);


// ======================================================
//                      ADMIN DASHBOARD
// ======================================================
router.get('/admin/dashboard', verifyToken, isAdmin, adminController.getDashboardData);


// ======================================================
//                       FETCH STUDENTS
// ======================================================
router.get('/admin/students', verifyToken, isAdmin, async (req, res) => {
  try {
    const students = await Student.find({ isActive: true })
      .populate('courseId', 'courseName courseCode');

    res.json({ success: true, students });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});


// ======================================================
//                     FETCH COURSES (PUBLIC)
// ======================================================
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true });
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});


// ======================================================
//                     FETCH SUBJECTS (PUBLIC)
// ======================================================
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find({})
      .populate('courseId', 'courseName courseCode')
      .populate('teacherId', 'name email');

    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});


// ======================================================
//                   FETCH TEACHERS
// ======================================================
router.get('/teachers', verifyToken, isAdmin, async (req, res) => {
  try {
    const teachers = await Teacher.find({ isActive: true });
    res.json({ success: true, teachers });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});


// ======================================================
//             ⭐ CORRECTED ADD SUBJECT ROUTE ⭐
// ======================================================
router.post('/subjects/add', verifyToken, isAdmin, async (req, res) => {
  try {
    const {
      subjectName,
      subjectCode,
      subjectType,
      credits,
      semester,
      branch,
      isElective,
      teacherId,
      courseId
    } = req.body;

    if (!subjectName || !subjectCode || !semester || !branch) {
      return res.status(400).json({
        success: false,
        msg: "Subject Name, Code, Semester and Branch are required."
      });
    }

    const existing = await Subject.findOne({ subjectCode });
    if (existing) {
      return res.status(400).json({ success: false, msg: "Subject Code already exists." });
    }

    const subjectData = {
      subjectName,
      subjectCode,
      subjectType,
      credits,
      semester,
      branch,
      isElective,
      courseId: courseId || null,
      teacherId: teacherId || null
    };

    const subject = new Subject(subjectData);
    await subject.save();

    if (teacherId) {
      await Teacher.findByIdAndUpdate(teacherId, {
        $push: { assignedSubjects: subject._id }
      });
    }

    res.json({ success: true, msg: "Subject added successfully", subject });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({ success: false, msg: error.message });
  }
});



// ======================================================
//                COURSE / SUBJECT MANAGEMENT (ADMIN)
// ======================================================
router.post('/admin/courses', verifyToken, isAdmin, adminController.addCourse);
router.delete('/admin/courses/:courseId', verifyToken, isAdmin, adminController.deleteCourse);

router.post('/admin/subjects', verifyToken, isAdmin, adminController.addSubject);
router.delete('/admin/subjects/:subjectId', verifyToken, isAdmin, adminController.deleteSubject);


// ======================================================
//                    TEACHER MANAGEMENT
// ======================================================
router.post('/admin/teachers', verifyToken, isAdmin, adminController.addTeacher);
router.delete('/admin/teachers/:teacherId', verifyToken, isAdmin, adminController.deleteTeacher);


// ======================================================
//                    STUDENT MANAGEMENT
// ======================================================
router.post('/admin/students', verifyToken, isAdmin, adminController.addStudent);
router.delete('/admin/students/:studentId', verifyToken, isAdmin, adminController.deleteStudent);


// ======================================================
//              TEACHER ASSIGNMENT TO SUBJECT
// ======================================================
router.post('/admin/assign-teacher', verifyToken, isAdmin, adminController.assignTeacherToSubject);
router.post('/admin/remove-teacher', verifyToken, isAdmin, adminController.removeTeacherFromSubject);


// ======================================================
module.exports = router;
