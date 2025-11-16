const mongoose = require("mongoose");

const TeacherTimetableSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  academicYear: {
    type: String,
    required: true, // "2024-25"
  },
  semester: {
    type: Number,
    required: true, // 1-8
  },
  schedule: [{
    day: {
      type: String,
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    periods: [{
      periodNumber: {
        type: Number,
        required: true, // 1-8
      },
      startTime: {
        type: String,
        required: true, // "09:00"
      },
      endTime: {
        type: String,
        required: true, // "10:00"
      },
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      classType: {
        type: String,
        enum: ["Theory", "Practical", "Lab", "Tutorial"],
        default: "Theory",
      },
      room: {
        type: String,
        default: "",
      },
      isBreak: {
        type: Boolean,
        default: false,
      },
      breakType: {
        type: String,
        enum: ["Short Break", "Lunch Break", "Tea Break"],
      },
    }],
  }],
  // Extra Classes and Changes
  extraClasses: [{
    date: Date,
    startTime: String,
    endTime: String,
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    room: String,
    reason: String,
    status: {
      type: String,
      enum: ["Requested", "Approved", "Rejected", "Completed"],
      default: "Requested",
    },
  }],
  changeRequests: [{
    originalDate: Date,
    originalPeriod: Number,
    requestedDate: Date,
    requestedPeriod: Number,
    reason: String,
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

const TeacherTimetable = mongoose.model("TeacherTimetable", TeacherTimetableSchema);
module.exports = TeacherTimetable;