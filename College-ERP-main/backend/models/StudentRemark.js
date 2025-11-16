const mongoose = require("mongoose");

const StudentRemarkSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: false,
  },
  remarkType: {
    type: String,
    enum: ["Behavior", "Performance", "Attendance", "Warning", "Appreciation", "General"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },
  isPrivate: {
    type: Boolean,
    default: false, // If true, only teacher and admin can see
  },
  actionTaken: {
    type: String,
    default: "",
  },
  followUpRequired: {
    type: Boolean,
    default: false,
  },
  followUpDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

const StudentRemark = mongoose.model("StudentRemark", StudentRemarkSchema);
module.exports = StudentRemark;