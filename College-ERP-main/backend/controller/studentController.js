const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  Student,
  Course,
  Subject,
  Attendance,
  Notes,
  StudyMaterial,
  Assignments,
  Marks,
  Notices
} = require('../models/CompleteModels');

// Student Login
const studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const student = await Student.findOne({ email, isActive: true });
    if (!student) {
      return res.status(400).json({ success: false, msg: 'Student not found' });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token);
    
    res.json({ success: true, token, student: { id: student._id, name: student.name, role: 'student' } });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Profile
const getStudentProfile = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const student = await Student.findById(studentId).populate('courseId', 'courseName courseCode courseDuration');
    
    res.json({ success: true, student });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Attendance
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId, month, year } = req.query;
    
    let query = { studentId };
    if (subjectId) query.subjectId = subjectId;
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const attendance = await Attendance.find(query)
      .populate('subjectId', 'subjectName subjectCode')
      .sort({ date: -1 });
    
    // Calculate attendance percentage
    const totalClasses = attendance.length;
    const presentClasses = attendance.filter(a => a.status === 'Present').length;
    const attendancePercentage = totalClasses > 0 ? ((presentClasses / totalClasses) * 100).toFixed(2) : 0;
    
    res.json({ 
      success: true, 
      attendance, 
      stats: {
        totalClasses,
        presentClasses,
        absentClasses: totalClasses - presentClasses,
        attendancePercentage
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Subjects
const getStudentSubjects = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const student = await Student.findById(studentId);
    const subjects = await Subject.find({ courseId: student.courseId, isActive: true });
    
    res.json({ success: true, subjects });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Notes by Subject
const getNotesBySubject = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;
    
    const student = await Student.findById(studentId);
    const subjects = await Subject.find({ courseId: student.courseId });
    const subjectIds = subjectId ? [subjectId] : subjects.map(s => s._id);
    
    const notes = await Notes.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Study Materials
const getStudyMaterials = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;
    
    const student = await Student.findById(studentId);
    const subjects = await Subject.find({ courseId: student.courseId });
    const subjectIds = subjectId ? [subjectId] : subjects.map(s => s._id);
    
    const materials = await StudyMaterial.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, materials });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Assignments
const getAssignments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId } = req.query;
    
    const student = await Student.findById(studentId);
    const subjects = await Subject.find({ courseId: student.courseId });
    const subjectIds = subjectId ? [subjectId] : subjects.map(s => s._id);
    
    const assignments = await Assignments.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ deadline: 1 });
    
    res.json({ success: true, assignments });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Submit Assignment
const submitAssignment = async (req, res) => {
  try {
    const { studentId, assignmentId } = req.params;
    const { fileUrl } = req.body;
    
    const assignment = await Assignments.findById(assignmentId);
    
    // Check if already submitted
    const existingSubmission = assignment.submissions.find(s => s.studentId.toString() === studentId);
    if (existingSubmission) {
      return res.status(400).json({ success: false, msg: 'Assignment already submitted' });
    }
    
    assignment.submissions.push({ studentId, fileUrl });
    await assignment.save();
    
    res.json({ success: true, msg: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Marks
const getStudentMarks = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { subjectId, examType } = req.query;
    
    let query = { studentId };
    if (subjectId) query.subjectId = subjectId;
    if (examType) query.examType = examType;
    
    const marks = await Marks.find(query)
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, marks });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Notices
const getNotices = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const student = await Student.findById(studentId);
    const notices = await Notices.find({ courseId: student.courseId, isActive: true })
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, notices });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Comprehensive Student Dashboard
const getStudentDashboard = async (req, res) => {
  try {
    const { studentId } = req.params;
    
    const student = await Student.findById(studentId).populate('courseId');
    
    // Get all subjects for the student's course
    const subjects = await Subject.find({ courseId: student.courseId, isActive: true });
    const subjectIds = subjects.map(s => s._id);
    
    // Get attendance with subject-wise breakdown
    const attendance = await Attendance.find({ studentId })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ date: -1 });
    
    // Calculate subject-wise attendance
    const subjectAttendance = {};
    subjects.forEach(subject => {
      subjectAttendance[subject._id] = {
        subject,
        total: 0,
        present: 0,
        absent: 0,
        percentage: 0
      };
    });
    
    attendance.forEach(record => {
      const subjectId = record.subjectId._id.toString();
      if (subjectAttendance[subjectId]) {
        subjectAttendance[subjectId].total++;
        if (record.status === 'Present') {
          subjectAttendance[subjectId].present++;
        } else {
          subjectAttendance[subjectId].absent++;
        }
      }
    });
    
    // Calculate percentages
    Object.keys(subjectAttendance).forEach(subjectId => {
      const data = subjectAttendance[subjectId];
      data.percentage = data.total > 0 ? ((data.present / data.total) * 100).toFixed(2) : 0;
    });
    
    // Get all assignments with submission status
    const assignments = await Assignments.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ deadline: 1 });
    
    const assignmentsWithStatus = assignments.map(assignment => {
      const submission = assignment.submissions.find(sub => 
        sub.studentId.toString() === studentId
      );
      return {
        ...assignment.toObject(),
        isSubmitted: !!submission,
        submissionDate: submission ? submission.submittedAt : null,
        isOverdue: new Date() > assignment.deadline && !submission
      };
    });
    
    // Get all marks subject-wise
    const marks = await Marks.find({ studentId })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    // Group marks by subject
    const subjectMarks = {};
    marks.forEach(mark => {
      const subjectId = mark.subjectId._id.toString();
      if (!subjectMarks[subjectId]) {
        subjectMarks[subjectId] = {
          subject: mark.subjectId,
          marks: [],
          totalMarks: 0,
          totalPossible: 0,
          percentage: 0
        };
      }
      subjectMarks[subjectId].marks.push(mark);
      subjectMarks[subjectId].totalMarks += mark.marks;
      subjectMarks[subjectId].totalPossible += mark.totalMarks;
    });
    
    // Calculate subject-wise percentages
    Object.keys(subjectMarks).forEach(subjectId => {
      const data = subjectMarks[subjectId];
      data.percentage = data.totalPossible > 0 ? 
        ((data.totalMarks / data.totalPossible) * 100).toFixed(2) : 0;
    });
    
    // Get all notices
    const notices = await Notices.find({ courseId: student.courseId, isActive: true })
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    // Get all notes and study materials
    const notes = await Notes.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    const studyMaterials = await StudyMaterial.find({ subjectId: { $in: subjectIds } })
      .populate('subjectId', 'subjectName subjectCode')
      .populate('teacherId', 'name')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      dashboard: {
        student,
        subjects,
        subjectAttendance: Object.values(subjectAttendance),
        assignments: assignmentsWithStatus,
        subjectMarks: Object.values(subjectMarks),
        notices,
        notes,
        studyMaterials,
        overallStats: {
          totalSubjects: subjects.length,
          totalAssignments: assignments.length,
          submittedAssignments: assignmentsWithStatus.filter(a => a.isSubmitted).length,
          overdueAssignments: assignmentsWithStatus.filter(a => a.isOverdue).length,
          totalNotices: notices.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  studentLogin,
  getStudentProfile,
  getStudentAttendance,
  getStudentSubjects,
  getNotesBySubject,
  getStudyMaterials,
  getAssignments,
  submitAssignment,
  getStudentMarks,
  getNotices,
  getStudentDashboard
};