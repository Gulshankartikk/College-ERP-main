const mongoose = require("mongoose");
const SubjectSchema = require("./Subject");

const Schema = new mongoose.Schema({
  // Basic Details
  courseName: {
    type: String,
    required: true, // B.Tech Computer Science, BBA, MCA
  },
  courseCode: {
    type: String,
    required: true,
    unique: true, // CSE-BTECH, BBA-001, MCA-2024
  },
  courseType: {
    type: String,
    enum: ["UG", "PG", "Diploma", "Certificate"],
    required: true,
  },
  duration: {
    type: String,
    required: true, // "4 Years", "3 Years", "2 Years"
  },
  durationYears: {
    type: Number,
    required: true, // 4, 3, 2
  },
  totalSemesters: {
    type: Number,
    required: true, // 8 (B.Tech), 6 (BCA), 4 (MBA)
  },
  
  // Department/Stream
  department: {
    type: String,
    required: true,
    enum: ["CSE", "ECE", "Mechanical", "Civil", "Management", "Pharmacy", "Commerce", "Arts", "Science"],
  },
  
  // Course Description
  description: {
    type: String,
    required: false,
  },
  courseObjective: {
    type: String,
    required: false,
  },
  learningOutcomes: [{
    type: String,
  }],
  careerOpportunities: [{
    type: String,
  }],
  
  // Eligibility Details
  eligibility: {
    minimumQualification: {
      type: String,
      required: false, // "12th Pass", "Graduation"
    },
    entranceExam: {
      required: {
        type: Boolean,
        default: false,
      },
      examName: {
        type: String,
        required: false, // "JEE", "CAT", "GATE"
      },
    },
    ageLimit: {
      min: {
        type: Number,
        required: false,
      },
      max: {
        type: Number,
        required: false,
      },
    },
  },
  
  // Course Fees
  fees: {
    yearlyFees: {
      type: Number,
      required: false,
    },
    admissionFees: {
      type: Number,
      required: false,
    },
    transportFees: {
      type: Number,
      required: false,
    },
    hostelFees: {
      type: Number,
      required: false,
    },
    totalFees: {
      type: Number,
      required: false,
    },
  },
  
  // File Uploads
  uploads: {
    syllabusPDF: {
      fileName: String,
      fileUrl: String,
      uploadedAt: Date,
    },
    academicCalendar: {
      fileName: String,
      fileUrl: String,
      uploadedAt: Date,
    },
    courseBrochure: {
      fileName: String,
      fileUrl: String,
      uploadedAt: Date,
    },
  },
  
  // Subjects by Semester
  subjects: [SubjectSchema],
  semesterWiseSubjects: [{
    semester: {
      type: Number,
      required: true,
    },
    subjectList: [{
      name: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ["Theory", "Lab", "Elective", "Practical"],
        required: true,
      },
      credits: {
        type: Number,
        required: true,
      },
      assignedTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: false,
      },
    }],
  }],
  
  // Students
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  }],
  
  // Status
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Capacity
  maxStudents: {
    type: Number,
    required: false,
  },
  currentStudents: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Add indexes for better performance
Schema.index({ courseCode: 1 });
Schema.index({ department: 1 });
Schema.index({ courseType: 1 });
Schema.index({ isActive: 1 });

const Course = mongoose.model("Course", Schema);
module.exports = Course;
