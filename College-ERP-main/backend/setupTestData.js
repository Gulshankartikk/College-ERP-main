const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/college-erp');

// Schemas
const teacherSchema = new mongoose.Schema({
  teacher_Id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phno: { type: String },
  role: { type: String, default: 'teacher' }
});

const studentSchema = new mongoose.Schema({
  student_id: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' }
});

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  course_code: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  subjects: [{
    subject_name: { type: String, required: true },
    subject_code: { type: String, required: true },
    teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
  }]
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);

async function setupTestData() {
  try {
    console.log('Setting up test data...');

    // Create teacher
    const existingTeacher = await Teacher.findOne({ teacher_Id: '208024' });
    let teacher;
    
    if (!existingTeacher) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      teacher = new Teacher({
        teacher_Id: '208024',
        name: 'Dr. John Smith',
        email: 'john.smith@college.edu',
        password: hashedPassword,
        phno: '+91-9876543210',
        role: 'teacher',
        department: 'Computer Science',
        qualification: 'Ph.D. in Computer Science',
        experience: '10 years',
        specialization: 'Machine Learning, Data Structures'
      });
      await teacher.save();
      console.log('Teacher created');
    } else {
      teacher = existingTeacher;
      console.log('Teacher already exists');
    }

    // Create students
    const studentData = [
      { student_id: '2024001', first_name: 'John', last_name: 'Doe', email: 'john@test.com' },
      { student_id: '2024002', first_name: 'Jane', last_name: 'Smith', email: 'jane@test.com' },
      { student_id: '2024003', first_name: 'Bob', last_name: 'Johnson', email: 'bob@test.com' }
    ];

    const students = [];
    for (const studentInfo of studentData) {
      const existingStudent = await Student.findOne({ student_id: studentInfo.student_id });
      if (!existingStudent) {
        const hashedPassword = await bcrypt.hash('student123', 10);
        const student = new Student({
          ...studentInfo,
          password: hashedPassword,
          role: 'student'
        });
        await student.save();
        students.push(student);
        console.log(`Student ${studentInfo.first_name} created`);
      } else {
        students.push(existingStudent);
        console.log(`Student ${studentInfo.first_name} already exists`);
      }
    }

    // Create course
    const existingCourse = await Course.findOne({ courseCode: 'BTECH-CSE-3' });
    if (!existingCourse) {
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
          teacher: [teacher._id]
        }, {
          subject_name: 'Database Management Systems',
          subject_code: 'CSE202',
          subject_type: 'Theory',
          credits: 3,
          semester: 3,
          branch: 'CSE',
          is_elective: false,
          teacher: [teacher._id]
        }, {
          subject_name: 'Data Structures Lab',
          subject_code: 'CSE203',
          subject_type: 'Lab',
          credits: 1,
          semester: 3,
          branch: 'CSE',
          is_elective: false,
          teacher: [teacher._id]
        }]
      });
      await course.save();
      console.log('Course created with subjects');
    } else {
      console.log('Course already exists');
    }

    console.log('Test data setup complete!');
    console.log('Login credentials:');
    console.log('Teacher - Roll: 208024, Password: admin123');
    console.log('Students - Roll: 2024001/2024002/2024003, Password: student123');
    
  } catch (error) {
    console.error('Error setting up test data:', error);
  } finally {
    mongoose.connection.close();
  }
}

setupTestData();