const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

// Use the updated Course schema
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseCode: { type: String, required: true, unique: true },
  duration: { type: String, required: true },
  totalSemesters: { type: Number, required: true },
  description: { type: String, required: false },
  department: { type: String, required: false },
  courseType: { type: String, enum: ["Full-Time", "Part-Time", "Distance", "Diploma"], default: "Full-Time" },
  subjects: [],
  students: []
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

async function createMainCourses() {
  try {
    // Clear existing courses
    await Course.deleteMany({});
    
    // Create main courses
    const courses = [
      {
        courseName: "Bachelor of Technology",
        courseCode: "BTECH",
        duration: "4 Years",
        totalSemesters: 8,
        description: "A 4-year undergraduate engineering program",
        department: "Engineering",
        courseType: "Full-Time"
      },
      {
        courseName: "Bachelor of Computer Applications",
        courseCode: "BCA",
        duration: "3 Years", 
        totalSemesters: 6,
        description: "A 3-year undergraduate computer applications program",
        department: "Computer Science",
        courseType: "Full-Time"
      },
      {
        courseName: "Master of Business Administration",
        courseCode: "MBA",
        duration: "2 Years",
        totalSemesters: 4,
        description: "A 2-year postgraduate management program",
        department: "Management",
        courseType: "Full-Time"
      },
      {
        courseName: "Diploma in Engineering",
        courseCode: "DIPLOMA",
        duration: "3 Years",
        totalSemesters: 6,
        description: "A 3-year diploma program in engineering",
        department: "Engineering",
        courseType: "Diploma"
      }
    ];

    for (const courseData of courses) {
      const course = new Course(courseData);
      await course.save();
      console.log(`Created course: ${course.courseName} (${course.courseCode})`);
    }
    
    console.log('All main courses created successfully!');
    
  } catch (error) {
    console.error('Error creating courses:', error);
  } finally {
    mongoose.connection.close();
  }
}

createMainCourses();