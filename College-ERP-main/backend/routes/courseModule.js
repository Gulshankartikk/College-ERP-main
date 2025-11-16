const express = require("express");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addSubjectToSemester,
  assignTeacherToSubject,
  uploadCourseFiles,
  getCourseStats,
  deleteCourse
} = require("../controller/courseModule");
const { isAdmin } = require("../middleware/Auth");

const router = express.Router();

// Course CRUD Operations
router.post("/create", isAdmin, createCourse);
router.get("/", getAllCourses);
router.get("/stats", getCourseStats);
router.get("/:courseId", getCourseById);
router.put("/:courseId", isAdmin, updateCourse);
router.delete("/:courseId", isAdmin, deleteCourse);

// Subject Management
router.post("/:courseId/subjects", isAdmin, addSubjectToSemester);
router.put("/:courseId/assign-teacher", isAdmin, assignTeacherToSubject);

// File Upload
router.post("/:courseId/upload", isAdmin, uploadCourseFiles);

module.exports = router;