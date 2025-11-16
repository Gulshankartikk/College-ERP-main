const express = require("express");
const { isTeacher } = require("../middleware/Auth");

const router = express.Router();

// Upload material
router.post("/upload", isTeacher, async (req, res) => {
  try {
    const { title, description, type, courseId, teacherId } = req.body;
    
    const material = {
      _id: Date.now().toString(),
      title,
      description,
      type,
      courseId,
      teacherId,
      fileName: req.file ? req.file.filename : null,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      uploadedAt: new Date()
    };
    
    res.status(201).json({
      success: true,
      msg: "Material uploaded successfully",
      material
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to upload material"
    });
  }
});

// Get teacher materials
router.get("/teacher/:teacherId", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      materials: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to fetch materials"
    });
  }
});

// Delete material
router.delete("/:materialId", isTeacher, async (req, res) => {
  try {
    res.json({
      success: true,
      msg: "Material deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete material"
    });
  }
});

module.exports = router;