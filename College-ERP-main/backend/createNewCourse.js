const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

// Use the updated Course schema
const courseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  branch: { type: String, required: true },
  semester: { type: Number, required: true },
  year: { type: Number, required: true },
  courseCode: { type: String, required: false },
  department: { type: String, default: "School of Engineering" },
  duration: { type: String, default: "4 Years" },
  subjects: [{
    subject_name: { type: String, required: true },
    subject_code: { type: String, required: true },
    subject_type: { type: String, enum: ["Theory", "Practical", "Lab"], required: true },
    credits: { type: Number, required: true },
    semester: { type: Number, required: true },
    branch: { type: String, required: true },
    is_elective: { type: Boolean, default: false },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
    attendance: []
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  try {
    // Get existing students and teacher
    const Student = mongoose.model('Student', new mongoose.Schema({}));
    const Teacher = mongoose.model('Teacher', new mongoose.Schema({}));
    
    const students = await Student.find({});
    const teacher = await Teacher.findOne({ teacher_Id: '208024' });
    
    const course = new Course({
      courseName: 'B.Tech',
      branch: 'CSE',
      semester: 3,
      year: 2,
      courseCode: 'BTECH-CSE-3',
      department: 'School of Engineering',
      duration: '4 Years',
      students: students.map(s => s._id),
      subjects: [{
        subject_name: 'Data Structures',
        subject_code: 'CSE201',
        subject_type: 'Theory',
        credits: 4,
        semester: 3,
        branch: 'CSE',
        is_elective: false,
        teacher: teacher ? [teacher._id] : [],
        attendance: []
      }, {
        subject_name: 'Database Management Systems',
        subject_code: 'CSE202',
        subject_type: 'Theory',
        credits: 3,
        semester: 3,
        branch: 'CSE',
        is_elective: false,
        teacher: teacher ? [teacher._id] : [],
        attendance: []
      }, {
        subject_name: 'Data Structures Lab',
        subject_code: 'CSE203',
        subject_type: 'Lab',
        credits: 1,
        semester: 3,
        branch: 'CSE',
        is_elective: false,
        teacher: teacher ? [teacher._id] : [],
        attendance: []
      }]
    });
    
    await course.save();
    console.log('Course created successfully with new structure');
    console.log('Course:', course.courseName, '-', course.branch, '- Semester', course.semester);
    console.log('Subjects:', course.subjects.length);
    
  } catch (error) {
    console.error('Error creating course:', error);
  } finally {
    mongoose.connection.close();
  }
}

createCourse();