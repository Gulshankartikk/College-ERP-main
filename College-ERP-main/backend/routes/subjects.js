const express = require("express");
const { isAdmin } = require("../middleware/Auth");
const Course = require("../models/Course");

const router = express.Router();

// Add subject
router.post("/add", isAdmin, async (req, res) => {
  try {
    const { 
      subject_name, 
      subject_code, 
      subject_type, 
      credits, 
      semester, 
      branch, 
      is_elective, 
      teacher,
      courseId 
    } = req.body;

    const subject = {
      subject_name,
      subject_code,
      subject_type,
      credits: parseInt(credits),
      semester: parseInt(semester),
      branch,
      is_elective: is_elective || false,
      teacher: teacher ? [teacher] : [],
      attendance: []
    };

    if (courseId) {
      const course = await Course.findById(courseId);
      if (course) {
        course.subjects.push(subject);
        await course.save();
      }
    }

    res.status(201).json({
      success: true,
      msg: "Subject added successfully",
      subject
    });
  } catch (error) {
    console.error("Error adding subject:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to add subject"
    });
  }
});

module.exports = router;