const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  subject: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  dueDate: { type: Date, required: true },
  maxMarks: { type: Number, required: true },
  attachments: [{ fileName: String, fileUrl: String }],
  submissions: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    submittedAt: { type: Date, default: Date.now },
    files: [{ fileName: String, fileUrl: String }],
    marks: { type: Number, default: 0 },
    feedback: { type: String },
    isLate: { type: Boolean, default: false }
  }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Assignment", AssignmentSchema);