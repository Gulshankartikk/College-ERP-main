import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import BackButton from "../../components/back";

const AssignTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    teacherId: "",
    courseName: "B.Tech",
    branch: "",
    year: "",
    semester: "",
    section: "A",
    subjectId: "",
    courseId: ""
  });

  const branches = ["CSE", "ECE", "MECH", "CIVIL", "EEE", "IT"];
  const years = [1, 2, 3, 4];
  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const sections = ["A", "B", "C", "D"];

  const token = Cookies.get("token");

  useEffect(() => {
    fetchTeachers();
    fetchCourses();
  }, []);

  // Fetch subjects when course details change
  useEffect(() => {
    if (formData.branch && formData.semester) {
      fetchSubjects();
    }
  }, [formData.branch, formData.semester]);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teachers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTeachers(response.data.teachers || []);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      // Find matching course
      const matchingCourse = courses.find(course => 
        course.branch === formData.branch && 
        course.semester === parseInt(formData.semester)
      );
      
      if (matchingCourse) {
        setFormData(prev => ({ ...prev, courseId: matchingCourse._id }));
        const response = await axios.get(`${BASE_URL}/courses/${matchingCourse._id}/subjects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSubjects(response.data.subjects || []);
      } else {
        setSubjects([]);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setSubjects([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.teacherId || !formData.subjectId || !formData.courseId) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/courses/assignTeacher`,
        {
          teacherId: formData.teacherId,
          courseId: formData.courseId,
          subjectId: formData.subjectId,
          branch: formData.branch,
          semester: parseInt(formData.semester),
          section: formData.section
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Teacher assigned successfully");
      
      // Reset form
      setFormData({
        teacherId: "",
        courseName: "B.Tech",
        branch: "",
        year: "",
        semester: "",
        section: "A",
        subjectId: "",
        courseId: ""
      });
      setSubjects([]);
    } catch (error) {
      console.error("Error assigning teacher:", error);
      toast.error("Failed to assign teacher");
    }
  };

  const getSelectedTeacher = () => {
    return teachers.find(t => t._id === formData.teacherId);
  };

  const getSelectedSubject = () => {
    return subjects.find(s => s._id === formData.subjectId);
  };

  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-blue-400 pb-10">
      <div className="ms-5 mt-5 lg:mt-0 lg:ms-0">
        <BackButton targetRoute="/admin/adminPanel" />
      </div>
      
      <div className="text-white flex items-center justify-center py-11">
        <h1 className="font-extrabold text-5xl md:text-8xl text-center overflow-hidden">
          Assign Teacher
        </h1>
      </div>

      <div className="w-full flex justify-center px-5 lg:px-44">
        <form
          method="post"
          className="bg-white flex flex-col gap-4 justify-evenly py-10 w-full md:w-[50vw] px-10 border-2 border-black rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex justify-center items-center mb-6">
            <div className="flex items-center justify-center w-52">
              <img
                src="/src/assets/dr-ambedkar-institute-of-technology-for-handicapped-kanpur.jpeg.jpg"
                alt="logo"
                className="w-full"
              />
            </div>
          </div>

          {/* 1. Select Teacher */}
          <div className="flex flex-col">
            <label className="block text-gray-700 font-bold mb-2">
              1. Select Teacher *
            </label>
            <select
              name="teacherId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
              value={formData.teacherId}
              onChange={handleChange}
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name} | ID: {teacher.teacher_Id} | {teacher.department || 'CSE Dept'} | {teacher.email}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Select Course/Class */}
          <div className="border-t pt-4">
            <h3 className="text-gray-700 font-bold mb-4">2. Select Course/Class *</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Course</label>
                <input
                  type="text"
                  name="courseName"
                  value={formData.courseName}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100"
                  readOnly
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Branch</label>
                <select
                  name="branch"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Year</label>
                <select
                  name="year"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Year</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}{year === 1 ? 'st' : year === 2 ? 'nd' : year === 3 ? 'rd' : 'th'} Year
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Semester</label>
                <select
                  name="semester"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.semester}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Semester</option>
                  {semesters.map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 font-bold mb-2">Section (Optional)</label>
              <select
                name="section"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline md:w-32"
                value={formData.section}
                onChange={handleChange}
              >
                {sections.map(section => (
                  <option key={section} value={section}>Section {section}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Select Subject */}
          <div className="border-t pt-4">
            <label className="block text-gray-700 font-bold mb-2">
              3. Select Subject *
            </label>
            <select
              name="subjectId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
              value={formData.subjectId}
              onChange={handleChange}
              required
              disabled={!formData.branch || !formData.semester}
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.subject_name} ({subject.subject_code}) - {subject.subject_type} - {subject.credits} Credits
                </option>
              ))}
            </select>
            {(!formData.branch || !formData.semester) && (
              <p className="text-sm text-gray-500 mt-1">Please select branch and semester first</p>
            )}
          </div>

          {/* Assignment Summary */}
          {formData.teacherId && formData.subjectId && (
            <div className="border-t pt-4 bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-gray-700 mb-2">Assignment Summary:</h3>
              <p className="text-sm text-gray-600">
                <strong>{getSelectedTeacher()?.name}</strong> will teach <strong>{getSelectedSubject()?.subject_name}</strong> to <strong>{formData.courseName} {formData.branch} Semester {formData.semester} Section {formData.section}</strong>
              </p>
            </div>
          )}

          <div className="flex justify-center mt-6 w-full">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={!formData.teacherId || !formData.subjectId}
            >
              Assign Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTeacher;
