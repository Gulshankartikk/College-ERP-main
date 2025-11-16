const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  teacher_Id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phno: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  // Profile Management Fields
  profilePhoto: {
    type: String,
    default: "",
  },
  qualification: {
    type: String,
    required: false, // M.Tech, PhD, etc.
  },
  experience: {
    totalYears: {
      type: Number,
      default: 0,
    },
    previousInstitutions: [{
      instituteName: String,
      position: String,
      duration: String,
      from: Date,
      to: Date,
    }],
    previousCourses: [{
      courseName: String,
      courseCode: String,
      institution: String,
      duration: String,
      yearTaught: String,
      studentsCount: Number,
      description: String,
    }],
  },
  department: {
    type: String,
    required: false, // CSE, ECE, etc.
  },
  designation: {
    type: String,
    default: "Assistant Professor", // Professor, Associate Professor, etc.
  },
  // Subjects and Courses
  assignedSubjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
  }],
  assignedCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  }],
  // Additional Details
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String,
  },
  role: {
    type: String,
    default: "Teacher",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  otp: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Teacher = mongoose.model("Teacher", schema);
module.exports = Teacher;
