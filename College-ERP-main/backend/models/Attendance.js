const mongoose = require("mongoose");

// Individual Attendance Record Schema
const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isPresent: {
    type: Boolean,
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  remarks: {
    type: String,
    default: "",
  },
  periodNumber: {
    type: Number,
    default: 1,
  },
}, {
  timestamps: true,
});

// Create compound index for efficient queries
AttendanceSchema.index({ student: 1, subject: 1, date: 1 }, { unique: true });
AttendanceSchema.index({ teacher: 1, date: 1 });
AttendanceSchema.index({ course: 1, date: 1 });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
module.exports = Attendance;
