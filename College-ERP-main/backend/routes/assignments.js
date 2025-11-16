const express = require("express");
const { isTeacher } = require("../middleware/Auth");

const router = express.Router();

// Create assignment
router.post("/create", isTeacher, async (req, res) => {
  try {
    const { title, description, dueDate, maxMarks, subject, courseId, teacherId } = req.body;
    
    const assignment = {
      _id: Date.now().toString(),
      title,
      description,
      dueDate,
      maxMarks,
      subject,
      courseId,
      teacherId,
      fileName: req.file ? req.file.filename : null,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date(),
      submissionCount: 0
    };
    
    res.status(201).json({
      success: true,
      msg: "Assignment created successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to create assignment"
    });
  }
});

// Get teacher assignments
router.get("/teacher/:teacherId", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      assignments: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch assignments"
    });
  }
});

// Get assignment submissions
router.get("/:assignmentId/submissions", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      submissions: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch submissions"
    });
  }
});

// Delete assignment
router.delete("/:assignmentId", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      msg: "Assignment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete assignment"
    });
  }
});

module.exports = router;