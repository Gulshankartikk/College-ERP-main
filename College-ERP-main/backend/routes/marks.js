const express = require("express");
const { isTeacher } = require("../middleware/Auth");
const Marks = require("../models/Marks");

const router = express.Router();

// Add marks
router.post("/add", isTeacher, async (req, res) => {
  try {
    const { courseId, examType, examTitle, maxMarks, marks, subject, semester } = req.body;
    
    const marksRecords = [];
    
    for (const mark of marks) {
      const marksRecord = new Marks({
        studentId: mark.studentId,
        teacherId: req.user.id,
        courseId,
        subject,
        examType,
        examTitle,
        marksObtained: mark.marks,
        maxMarks: parseInt(maxMarks),
        semester: semester || null,
        academicYear: new Date().getFullYear().toString()
      });
      
      await marksRecord.save();
      marksRecords.push(marksRecord);
    }
    
    res.status(201).json({
      success: true,
      msg: "Marks added successfully",
      marksRecords
    });
  } catch (error) {
    console.error("Error adding marks:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to add marks"
    });
  }
});

// Get student marks
router.get("/student/:studentId", async (req, res) => {
  try {
    const marks = await Marks.find({ 
      studentId: req.params.studentId,
      isPublished: true 
    })
    .populate('teacherId', 'name')
    .populate('courseId', 'courseName')
    .sort({ examDate: -1 });
    
    res.json({
      success: true,
      marks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch marks"
    });
  }
});

// Get marks by course and subject
router.get("/course/:courseId/subject/:subject", isTeacher, async (req, res) => {
  try {
    const marks = await Marks.find({ 
      courseId: req.params.courseId,
      subject: req.params.subject 
    })
    .populate('studentId', 'first_name last_name student_id')
    .sort({ examDate: -1 });
    
    res.json({
      success: true,
      marks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch marks"
    });
  }
});

// Publish marks
router.put("/publish/:marksId", isTeacher, async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(
      req.params.marksId,
      { isPublished: true },
      { new: true }
    );
    
    res.json({
      success: true,
      msg: "Marks published successfully",
      marks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to publish marks"
    });
  }
});

module.exports = router;