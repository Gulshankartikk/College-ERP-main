const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["class", "homework", "exam", "announcement"],
    required: true 
  },
  priority: { 
    type: String, 
    enum: ["low", "normal", "high", "urgent"],
    default: "normal" 
  },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  targetStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  isActive: { type: Boolean, default: true },
  expiryDate: { type: Date },
  attachments: [{ fileName: String, fileUrl: String }]
}, { timestamps: true });

module.exports = mongoose.model("Notice", NoticeSchema);