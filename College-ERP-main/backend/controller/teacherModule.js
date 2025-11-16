const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Subject = require("../models/Subject");
const Assignment = require("../models/Assignment");
const Notice = require("../models/Notice");
const StudyMaterial = require("../models/StudyMaterial");
const StudentRemark = require("../models/StudentRemark");
const TeacherTimetable = require("../models/TeacherTimetable");
const Attendance = require("../models/Attendance");

// ============= PROFILE MANAGEMENT =============

// Update Teacher Profile
const updateTeacherProfile = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const updateData = req.body;

    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedSubjects assignedCourses');

    if (!teacher) {
      return res.status(404).json({ success: false, msg: "Teacher not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Profile updated successfully",
      teacher
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Upload Profile Photo
const uploadProfilePhoto = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { profilePhoto } = req.body; // Base64 or URL

    const teacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { profilePhoto },
      { new: true }
    );

    res.status(200).json({
      success: true,
      msg: "Profile photo updated successfully",
      profilePhoto: teacher.profilePhoto
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= STUDENT MANAGEMENT =============

// Get Students in Teacher's Courses
const getMyStudents = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { courseId, subjectId } = req.query;

    const teacher = await Teacher.findById(teacherId).populate('assignedCourses');
    
    let query = {};
    if (courseId) {
      query.course = courseId;
    } else {
      // Get all courses assigned to teacher
      const courseIds = teacher.assignedCourses.map(course => course._id);
      query.course = { $in: courseIds };
    }

    const students = await Student.find(query)
      .populate('course', 'courseName courseCode')
      .select('name email rollNumber profilePhoto course semester');

    res.status(200).json({
      success: true,
      students,
      totalStudents: students.length
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Student Details
const getStudentDetails = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
      .populate('course', 'courseName courseCode')
      .populate('subjects', 'subject_name subject_code');

    if (!student) {
      return res.status(404).json({ success: false, msg: "Student not found" });
    }

    // Get student's attendance summary
    const attendanceData = await Attendance.find({ student: studentId });
    
    // Get student remarks
    const remarks = await StudentRemark.find({ student: studentId })
      .populate('teacher', 'name')
      .populate('subject', 'subject_name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      student,
      attendanceData,
      remarks
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Student Remark
const addStudentRemark = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { studentId, remarkType, title, description, severity, subjectId, followUpRequired, followUpDate } = req.body;

    const remark = new StudentRemark({
      student: studentId,
      teacher: teacherId,
      subject: subjectId,
      remarkType,
      title,
      description,
      severity,
      followUpRequired,
      followUpDate
    });

    await remark.save();
    await remark.populate('student', 'name rollNumber');
    await remark.populate('subject', 'subject_name');

    res.status(201).json({
      success: true,
      msg: "Student remark added successfully",
      remark
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= ATTENDANCE MANAGEMENT =============

// Create Daily Attendance
const createAttendance = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { courseId, subjectId, date, attendanceData } = req.body;

    // attendanceData: [{ studentId, isPresent }]
    
    const attendanceRecords = attendanceData.map(record => ({
      student: record.studentId,
      subject: subjectId,
      course: courseId,
      teacher: teacherId,
      date: new Date(date),
      isPresent: record.isPresent,
      markedBy: teacherId
    }));

    await Attendance.insertMany(attendanceRecords);

    res.status(201).json({
      success: true,
      msg: "Attendance marked successfully",
      totalStudents: attendanceRecords.length
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Attendance Summary
const getAttendanceSummary = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { courseId, subjectId, startDate, endDate } = req.query;

    let query = { teacher: teacherId };
    
    if (courseId) query.course = courseId;
    if (subjectId) query.subject = subjectId;
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendance = await Attendance.find(query)
      .populate('student', 'name rollNumber')
      .populate('subject', 'subject_name')
      .populate('course', 'courseName')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      attendance
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= ASSIGNMENT MANAGEMENT =============

// Create Assignment
const createAssignment = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { title, description, subject, courseId, dueDate, maxMarks, attachments } = req.body;

    const assignment = new Assignment({
      title,
      description,
      subject,
      courseId,
      teacherId,
      dueDate: new Date(dueDate),
      maxMarks,
      attachments: attachments || []
    });

    await assignment.save();
    await assignment.populate('courseId', 'courseName courseCode');

    res.status(201).json({
      success: true,
      msg: "Assignment created successfully",
      assignment
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Teacher's Assignments
const getMyAssignments = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { courseId, status } = req.query;

    let query = { teacherId };
    if (courseId) query.courseId = courseId;
    if (status) query.isActive = status === 'active';

    const assignments = await Assignment.find(query)
      .populate('courseId', 'courseName courseCode')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      assignments
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Grade Assignment Submission
const gradeSubmission = async (req, res) => {
  try {
    const { assignmentId, submissionId } = req.params;
    const { marks, feedback } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    const submission = assignment.submissions.id(submissionId);
    
    if (!submission) {
      return res.status(404).json({ success: false, msg: "Submission not found" });
    }

    submission.marks = marks;
    submission.feedback = feedback;
    
    await assignment.save();

    res.status(200).json({
      success: true,
      msg: "Submission graded successfully",
      submission
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= STUDY MATERIALS =============

// Upload Study Material
const uploadStudyMaterial = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { title, description, subject, course, materialType, fileUrl, fileName } = req.body;

    const material = new StudyMaterial({
      title,
      description,
      subject,
      course,
      materialType,
      fileUrl,
      fileName,
      uploadedBy: teacherId
    });

    await material.save();
    await material.populate('subject', 'subject_name');
    await material.populate('course', 'courseName');

    res.status(201).json({
      success: true,
      msg: "Study material uploaded successfully",
      material
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= NOTICES =============

// Create Class Notice
const createNotice = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { title, content, noticeType, targetAudience, courseId, subjectId, priority } = req.body;

    const notice = new Notice({
      title,
      content,
      noticeType,
      targetAudience,
      course: courseId,
      subject: subjectId,
      createdBy: teacherId,
      priority: priority || 'Medium'
    });

    await notice.save();
    await notice.populate('course', 'courseName');
    await notice.populate('subject', 'subject_name');

    res.status(201).json({
      success: true,
      msg: "Notice created successfully",
      notice
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= TIMETABLE MANAGEMENT =============

// Get Teacher Timetable
const getMyTimetable = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { academicYear, semester } = req.query;

    let query = { teacher: teacherId };
    if (academicYear) query.academicYear = academicYear;
    if (semester) query.semester = parseInt(semester);

    const timetable = await TeacherTimetable.findOne(query)
      .populate('schedule.periods.subject', 'subject_name subject_code')
      .populate('schedule.periods.course', 'courseName courseCode')
      .populate('extraClasses.subject', 'subject_name')
      .populate('extraClasses.course', 'courseName');

    res.status(200).json({
      success: true,
      timetable
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Request Extra Class
const requestExtraClass = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { date, startTime, endTime, subjectId, courseId, room, reason } = req.body;

    let timetable = await TeacherTimetable.findOne({ teacher: teacherId });
    
    if (!timetable) {
      timetable = new TeacherTimetable({
        teacher: teacherId,
        academicYear: "2024-25",
        semester: 1,
        schedule: [],
        extraClasses: []
      });
    }

    timetable.extraClasses.push({
      date: new Date(date),
      startTime,
      endTime,
      subject: subjectId,
      course: courseId,
      room,
      reason,
      status: "Requested"
    });

    await timetable.save();

    res.status(201).json({
      success: true,
      msg: "Extra class request submitted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// ============= DASHBOARD DATA =============

// Get Teacher Dashboard Data
const getDashboardData = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const teacher = await Teacher.findById(teacherId)
      .populate('assignedSubjects', 'subject_name subject_code')
      .populate('assignedCourses', 'courseName courseCode');

    // Get total students
    const courseIds = teacher.assignedCourses.map(course => course._id);
    const totalStudents = await Student.countDocuments({ 
      course: { $in: courseIds } 
    });

    // Get pending assignments
    const pendingAssignments = await Assignment.countDocuments({
      teacherId,
      dueDate: { $gte: new Date() },
      isActive: true
    });

    // Get recent notices
    const recentNotices = await Notice.find({ createdBy: teacherId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('course', 'courseName');

    // Get today's classes
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const timetable = await TeacherTimetable.findOne({ teacher: teacherId })
      .populate('schedule.periods.subject', 'subject_name')
      .populate('schedule.periods.course', 'courseName');

    let todayClasses = [];
    if (timetable) {
      const todaySchedule = timetable.schedule.find(day => day.day === today);
      if (todaySchedule) {
        todayClasses = todaySchedule.periods.filter(period => !period.isBreak);
      }
    }

    res.status(200).json({
      success: true,
      dashboardData: {
        teacher,
        totalStudents,
        totalSubjects: teacher.assignedSubjects.length,
        totalCourses: teacher.assignedCourses.length,
        pendingAssignments,
        recentNotices,
        todayClasses
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  // Profile Management
  updateTeacherProfile,
  uploadProfilePhoto,
  
  // Student Management
  getMyStudents,
  getStudentDetails,
  addStudentRemark,
  
  // Attendance Management
  createAttendance,
  getAttendanceSummary,
  
  // Assignment Management
  createAssignment,
  getMyAssignments,
  gradeSubmission,
  
  // Study Materials
  uploadStudyMaterial,
  
  // Notices
  createNotice,
  
  // Timetable
  getMyTimetable,
  requestExtraClass,
  
  // Dashboard
  getDashboardData
};