const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  Course,
  Subject,
  Teacher,
  Student,
  TeacherSubjectAssignment,
  Attendance,
  Marks,
  Admin
} = require('../models/CompleteModels');

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, msg: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET);
    res.cookie('token', token);
    
    res.json({ success: true, token, admin: { id: admin._id, name: admin.name, role: 'admin' } });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Course
const addCourse = async (req, res) => {
  try {
    const { courseName, courseCode, courseDuration, courseDescription } = req.body;
    
    const course = new Course({ courseName, courseCode, courseDuration, courseDescription });
    await course.save();
    
    res.status(201).json({ success: true, msg: 'Course added successfully', course });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Subject
const addSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, courseId, subjectDescription } = req.body;
    
    const subject = new Subject({ subjectName, subjectCode, courseId, subjectDescription });
    await subject.save();
    
    res.status(201).json({ success: true, msg: 'Subject added successfully', subject });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Teacher
const addTeacher = async (req, res) => {
  try {
    const { name, email, phone, password, assignedCourse, assignedSubjects } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const teacher = new Teacher({
      name, email, phone, password: hashedPassword, assignedCourse, assignedSubjects
    });
    await teacher.save();
    
    res.status(201).json({ success: true, msg: 'Teacher added successfully', teacher });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Student
const addStudent = async (req, res) => {
  try {
    const { name, email, phone, rollNo, password, courseId, semester } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
      name, email, phone, rollNo, password: hashedPassword, courseId, semester
    });
    await student.save();
    
    res.status(201).json({ success: true, msg: 'Student added successfully', student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Assign Teacher to Subject
const assignTeacherToSubject = async (req, res) => {
  try {
    const { teacherId, subjectId, courseId } = req.body;
    
    const assignment = new TeacherSubjectAssignment({ teacherId, subjectId, courseId });
    await assignment.save();
    
    // Update teacher's assigned subjects
    await Teacher.findByIdAndUpdate(teacherId, {
      $addToSet: { assignedSubjects: subjectId, assignedCourse: courseId }
    });
    
    res.status(201).json({ success: true, msg: 'Teacher assigned successfully', assignment });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Remove Teacher from Subject
const removeTeacherFromSubject = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;
    
    await TeacherSubjectAssignment.findOneAndUpdate(
      { teacherId, subjectId },
      { isActive: false }
    );
    
    await Teacher.findByIdAndUpdate(teacherId, {
      $pull: { assignedSubjects: subjectId }
    });
    
    res.json({ success: true, msg: 'Teacher removed from subject successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get All Data for Dashboard
const getDashboardData = async (req, res) => {
  try {
    const courses = await Course.find({ isActive: true }).populate('students');
    const subjects = await Subject.find({ isActive: true }).populate('courseId');
    const teachers = await Teacher.find({ isActive: true }).populate('assignedCourse assignedSubjects');
    const students = await Student.find({ isActive: true }).populate('courseId');
    
    const totalAttendance = await Attendance.countDocuments();
    const totalMarks = await Marks.countDocuments();
    
    res.json({
      success: true,
      data: {
        courses,
        subjects,
        teachers,
        students,
        stats: {
          totalCourses: courses.length,
          totalSubjects: subjects.length,
          totalTeachers: teachers.length,
          totalStudents: students.length,
          totalAttendance,
          totalMarks
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Course
const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    await Course.findByIdAndUpdate(courseId, { isActive: false });
    res.json({ success: true, msg: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Subject
const deleteSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    await Subject.findByIdAndUpdate(subjectId, { isActive: false });
    res.json({ success: true, msg: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    await Teacher.findByIdAndUpdate(teacherId, { isActive: false });
    res.json({ success: true, msg: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Delete Student
const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    await Student.findByIdAndUpdate(studentId, { isActive: false });
    res.json({ success: true, msg: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  adminLogin,
  addCourse,
  addSubject,
  addTeacher,
  addStudent,
  assignTeacherToSubject,
  removeTeacherFromSubject,
  getDashboardData,
  deleteCourse,
  deleteSubject,
  deleteTeacher,
  deleteStudent
};