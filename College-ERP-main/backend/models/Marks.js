const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  subject: { type: String, required: true },
  examType: { 
    type: String, 
    enum: ["assignment", "midterm", "final", "internal", "practical", "quiz"],
    required: true 
  },
  examTitle: { type: String, required: true },
  marksObtained: { type: Number, required: true },
  maxMarks: { type: Number, required: true },
  percentage: { type: Number },
  grade: { type: String },
  remarks: { type: String },
  examDate: { type: Date, default: Date.now },
  isPublished: { type: Boolean, default: false },
  semester: { type: Number },
  academicYear: { type: String }
}, { timestamps: true });

MarksSchema.pre('save', function(next) {
  this.percentage = Math.round((this.marksObtained / this.maxMarks) * 100);
  
  // Calculate grade based on percentage
  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';
  
  next();
});

module.exports = mongoose.model("Marks", MarksSchema);