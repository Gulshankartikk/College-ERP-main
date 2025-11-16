const mongoose = require("mongoose");

const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { 
    type: String, 
    enum: ["syllabus", "lecture", "assignment", "lab", "reference"],
    required: true 
  },
  subject: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  files: [{ 
    fileName: String, 
    fileUrl: String, 
    fileSize: Number,
    fileType: String 
  }],
  downloadCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  accessLevel: { 
    type: String, 
    enum: ["public", "course", "restricted"],
    default: "course" 
  }
}, { timestamps: true });

module.exports = mongoose.model("StudyMaterial", StudyMaterialSchema);