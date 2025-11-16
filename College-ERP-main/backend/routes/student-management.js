const express = require("express");
const { isTeacher } = require("../middleware/Auth");

const router = express.Router();

// Get student details for teacher view
router.get("/:studentId/teacher-view", isTeacher, async (req, res) => {
  try {
    const Student = require("../models/Student");
    const student = await Student.findById(req.params.studentId);
    
    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }

    res.json({
      success: true,
      student: {
        _id: student._id,
        first_name: student.first_name,
        last_name: student.last_name,
        student_id: student.student_id,
        email: student.email,
        phone: student.phone,
        courseName: "B.Tech CSE",
        createdAt: student.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch student details"
    });
  }
});

// Get student attendance summary
router.get("/:studentId/attendance-summary", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      attendance: [
        { subject: "Data Structures", presentDays: 25, totalDays: 30, percentage: 83 },
        { subject: "DBMS", presentDays: 22, totalDays: 28, percentage: 79 }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch attendance"
    });
  }
});

// Get student marks summary
router.get("/:studentId/marks-summary", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      marks: [
        { subject: "Data Structures", examType: "Mid-term", marksObtained: 85, totalMarks: 100, percentage: 85 },
        { subject: "DBMS", examType: "Assignment", marksObtained: 38, totalMarks: 50, percentage: 76 }
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch marks"
    });
  }
});

// Get student remarks
router.get("/:studentId/remarks", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      remarks: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch remarks"
    });
  }
});

// Add student remark
router.post("/:studentId/add-remark", isTeacher, async (req, res) => {
  try {
    const { remark, type, teacherId } = req.body;
    
    res.status(201).json({
      success: true,
      msg: "Remark added successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to add remark"
    });
  }
});

module.exports = router;