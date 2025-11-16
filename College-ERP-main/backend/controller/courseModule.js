const Course = require("../models/Course");
const Teacher = require("../models/Teacher");

// Create Course
const createCourse = async (req, res) => {
  try {
    const courseData = req.body;
    
    // Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode: courseData.courseCode });
    if (existingCourse) {
      return res.status(400).json({ success: false, msg: "Course code already exists" });
    }

    const course = new Course(courseData);
    await course.save();

    res.status(201).json({
      success: true,
      msg: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get All Courses
const getAllCourses = async (req, res) => {
  try {
    const { department, courseType, isActive } = req.query;
    
    let query = {};
    if (department) query.department = department;
    if (courseType) query.courseType = courseType;
    if (isActive !== undefined) query.isActive = isActive === 'true';

    const courses = await Course.find(query)
      .populate('students', 'name rollNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses,
      totalCourses: courses.length
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Course by ID
const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    
    const course = await Course.findById(courseId)
      .populate('students', 'name rollNumber email')
      .populate('semesterWiseSubjects.subjectList.assignedTeacher', 'name teacher_Id');

    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Update Course
const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const updateData = req.body;

    const course = await Course.findByIdAndUpdate(
      courseId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    res.status(200).json({
      success: true,
      msg: "Course updated successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Add Subject to Semester
const addSubjectToSemester = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { semester, subjectData } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    // Find existing semester or create new one
    let semesterIndex = course.semesterWiseSubjects.findIndex(s => s.semester === semester);
    
    if (semesterIndex === -1) {
      course.semesterWiseSubjects.push({
        semester,
        subjectList: [subjectData]
      });
    } else {
      course.semesterWiseSubjects[semesterIndex].subjectList.push(subjectData);
    }

    await course.save();

    res.status(200).json({
      success: true,
      msg: "Subject added successfully",
      course
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Assign Teacher to Subject
const assignTeacherToSubject = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { semester, subjectCode, teacherId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ success: false, msg: "Teacher not found" });
    }

    // Find semester and subject
    const semesterData = course.semesterWiseSubjects.find(s => s.semester === semester);
    if (!semesterData) {
      return res.status(404).json({ success: false, msg: "Semester not found" });
    }

    const subject = semesterData.subjectList.find(s => s.code === subjectCode);
    if (!subject) {
      return res.status(404).json({ success: false, msg: "Subject not found" });
    }

    subject.assignedTeacher = teacherId;
    await course.save();

    // Update teacher's assigned courses
    if (!teacher.assignedCourses.includes(courseId)) {
      teacher.assignedCourses.push(courseId);
      await teacher.save();
    }

    res.status(200).json({
      success: true,
      msg: "Teacher assigned successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Upload Course Files
const uploadCourseFiles = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { fileType, fileName, fileUrl } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    const uploadData = {
      fileName,
      fileUrl,
      uploadedAt: new Date()
    };

    switch (fileType) {
      case 'syllabus':
        course.uploads.syllabusPDF = uploadData;
        break;
      case 'calendar':
        course.uploads.academicCalendar = uploadData;
        break;
      case 'brochure':
        course.uploads.courseBrochure = uploadData;
        break;
      default:
        return res.status(400).json({ success: false, msg: "Invalid file type" });
    }

    await course.save();

    res.status(200).json({
      success: true,
      msg: "File uploaded successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

// Get Course Statistics
const getCourseStats = async (req, res) => {
  try {
    const totalCourses = await Course.countDocuments({ isActive: true });
    const coursesByType = await Course.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$courseType", count: { $sum: 1 } } }
    ]);
    const coursesByDepartment = await Course.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalCourses,
        coursesByType,
        coursesByDepartment
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

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, msg: "Course not found" });
    }

    // Check if course has students
    if (course.students.length > 0) {
      return res.status(400).json({ 
        success: false, 
        msg: "Cannot delete course with enrolled students" 
      });
    }

    await Course.findByIdAndDelete(courseId);

    res.status(200).json({
      success: true,
      msg: "Course deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  addSubjectToSemester,
  assignTeacherToSubject,
  uploadCourseFiles,
  getCourseStats,
  deleteCourse
};