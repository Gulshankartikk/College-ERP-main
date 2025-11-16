const express = require("express");
const { isTeacher } = require("../middleware/Auth");
const StudentNote = require("../models/StudentNote");

const router = express.Router();

// Add student note
router.post("/add", isTeacher, async (req, res) => {
  try {
    const { studentId, noteType, content, subject, severity, isPrivate, followUpRequired } = req.body;
    
    const note = new StudentNote({
      studentId,
      teacherId: req.user.id,
      noteType,
      content,
      subject: subject || null,
      severity: severity || "medium",
      isPrivate: isPrivate || false,
      followUpRequired: followUpRequired || false,
      followUpDate: followUpRequired ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) : null
    });
    
    await note.save();
    
    res.status(201).json({
      success: true,
      msg: "Note added successfully",
      note
    });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to add note"
    });
  }
});

// Get student notes
router.get("/:studentId", isTeacher, async (req, res) => {
  try {
    const notes = await StudentNote.find({ studentId: req.params.studentId })
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      notes
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      msg: "Failed to fetch notes"
    });
  }
});

// Get notes by teacher
router.get("/teacher/:teacherId", isTeacher, async (req, res) => {
  try {
    const notes = await StudentNote.find({ teacherId: req.params.teacherId })
      .populate('studentId', 'first_name last_name student_id')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      notes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch notes"
    });
  }
});

// Update note
router.put("/:noteId", isTeacher, async (req, res) => {
  try {
    const note = await StudentNote.findByIdAndUpdate(
      req.params.noteId,
      req.body,
      { new: true }
    );
    
    res.json({
      success: true,
      msg: "Note updated successfully",
      note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to update note"
    });
  }
});

// Delete note
router.delete("/:noteId", isTeacher, async (req, res) => {
  try {
    await StudentNote.findByIdAndDelete(req.params.noteId);
    
    res.json({
      success: true,
      msg: "Note deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete note"
    });
  }
});

module.exports = router;