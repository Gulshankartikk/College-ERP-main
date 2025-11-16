const express = require("express");
const { isTeacher, isAdmin } = require("../middleware/Auth");
const Notice = require("../models/Notice");
const Course = require("../models/Course");

const router = express.Router();

// Create notice
router.post("/create", isTeacher, async (req, res) => {
  try {
    const { title, content, type, priority, courseId, teacherId, expiryDate } = req.body;
    
    const notice = new Notice({
      title,
      content,
      type,
      priority: priority || "normal",
      courseId: courseId || null,
      teacherId: teacherId || req.user.id,
      expiryDate: expiryDate || null
    });
    
    await notice.save();
    
    res.status(201).json({
      success: true,
      msg: "Notice created successfully",
      notice
    });
  } catch (error) {
    console.error("Error creating notice:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to create notice"
    });
  }
});

// Get teacher notices
router.get("/teacher/:teacherId", isTeacher, async (req, res) => {
  try {
    const notices = await Notice.find({ 
      teacherId: req.params.teacherId,
      isActive: true 
    })
    .populate('courseId', 'courseName')
    .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      notices
    });
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to fetch notices"
    });
  }
});

// Get notices for course
router.get("/course/:courseId", async (req, res) => {
  try {
    const notices = await Notice.find({ 
      courseId: req.params.courseId,
      isActive: true,
      $or: [
        { expiryDate: null },
        { expiryDate: { $gte: new Date() } }
      ]
    })
    .populate('teacherId', 'name')
    .sort({ priority: -1, createdAt: -1 });
    
    res.json({
      success: true,
      notices
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch notices"
    });
  }
});

// Update notice
router.put("/:noticeId", isTeacher, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.noticeId,
      req.body,
      { new: true }
    );
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        msg: "Notice not found"
      });
    }
    
    res.json({
      success: true,
      msg: "Notice updated successfully",
      notice
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to update notice"
    });
  }
});

// Delete notice
router.delete("/:noticeId", isTeacher, async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.noticeId,
      { isActive: false },
      { new: true }
    );
    
    if (!notice) {
      return res.status(404).json({
        success: false,
        msg: "Notice not found"
      });
    }
    
    res.json({
      success: true,
      msg: "Notice deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete notice"
    });
  }
});

module.exports = router;