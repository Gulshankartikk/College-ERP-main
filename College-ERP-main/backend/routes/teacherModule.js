const express = require("express");
const {
  updateTeacherProfile,
  uploadProfilePhoto,
  getMyStudents,
  getStudentDetails,
  addStudentRemark,
  createAttendance,
  getAttendanceSummary,
  createAssignment,
  getMyAssignments,
  gradeSubmission,
  uploadStudyMaterial,
  createNotice,
  getMyTimetable,
  requestExtraClass,
  getDashboardData
} = require("../controller/teacherModule");

const router = express.Router();

// Dashboard
router.get("/:teacherId/dashboard", getDashboardData);

// Profile Management
router.put("/:teacherId/profile", updateTeacherProfile);
router.put("/:teacherId/profile-photo", uploadProfilePhoto);

// Student Management
router.get("/:teacherId/students", getMyStudents);
router.get("/:teacherId/students/:studentId", getStudentDetails);
router.post("/:teacherId/students/remarks", addStudentRemark);

// Attendance Management
router.post("/:teacherId/attendance", createAttendance);
router.get("/:teacherId/attendance", getAttendanceSummary);

// Assignment Management
router.post("/:teacherId/assignments", createAssignment);
router.get("/:teacherId/assignments", getMyAssignments);
router.put("/assignments/:assignmentId/submissions/:submissionId/grade", gradeSubmission);

// Study Materials
router.post("/:teacherId/materials", uploadStudyMaterial);

// Notices
router.post("/:teacherId/notices", createNotice);

// Timetable
router.get("/:teacherId/timetable", getMyTimetable);
router.post("/:teacherId/extra-class", requestExtraClass);

module.exports = router;