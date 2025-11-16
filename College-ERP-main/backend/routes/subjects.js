const express = require("express");
const { isAdmin } = require("../middleware/Auth");
const { Subject } = require("../models/CompleteModels");

const router = express.Router();

// Add subject
router.post("/add", isAdmin, async (req, res) => {
  try {
    const { 
      subject_name, 
      subject_code, 
      courseId,
      subject_type,
      credits,
      semester,
      branch,
      is_elective,
      teacher
    } = req.body;

    // Validate required fields
    if (!subject_name || !subject_code) {
      return res.status(400).json({
        success: false,
        msg: "Subject name and code are required"
      });
    }

    // Check if subject code already exists
    const existingSubject = await Subject.findOne({ subjectCode: subject_code });
    if (existingSubject) {
      return res.status(400).json({
        success: false,
        msg: "Subject code already exists"
      });
    }

    const subject = new Subject({
      subjectName: subject_name,
      subjectCode: subject_code,
      courseId: courseId || null,
      subjectDescription: `${subject_type} subject with ${credits} credits for ${branch} branch, Semester ${semester}`
    });

    await subject.save();

    res.status(201).json({
      success: true,
      msg: "Subject added successfully",
      subject
    });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({
      success: false,
      msg: error.message || "Failed to add subject"
    });
  }
});

module.exports = router;