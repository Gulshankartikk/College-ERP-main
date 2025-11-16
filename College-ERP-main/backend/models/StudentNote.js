const mongoose = require("mongoose");

const StudentNoteSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  noteType: { 
    type: String, 
    enum: ["behavioral", "progress", "homework", "improvement", "positive"],
    required: true 
  },
  content: { type: String, required: true },
  subject: { type: String },
  severity: { 
    type: String, 
    enum: ["low", "medium", "high"],
    default: "medium" 
  },
  isPrivate: { type: Boolean, default: false },
  parentNotified: { type: Boolean, default: false },
  followUpRequired: { type: Boolean, default: false },
  followUpDate: { type: Date },
  tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model("StudentNote", StudentNoteSchema);