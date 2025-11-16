const mongoose = require("mongoose");
const AttendanceSchema = require("./Attendance");

const SubjectSchema = new mongoose.Schema({
  subject_name: {
    type: String,
    required: true, // Data Structures
  },
  subject_code: {
    type: String,
    required: true, // CSE201
  },
  subject_type: {
    type: String,
    enum: ["Theory", "Practical", "Lab"],
    required: true,
  },
  credits: {
    type: Number,
    required: true, // 3, 4, 1 etc.
  },
  semester: {
    type: Number,
    required: true, // 1-8
  },
  branch: {
    type: String,
    required: true, // CSE, ECE, etc.
  },
  is_elective: {
    type: Boolean,
    default: false,
  },
  teacher: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  attendance: [AttendanceSchema],
}, {
  timestamps: true
});

module.exports = SubjectSchema;
