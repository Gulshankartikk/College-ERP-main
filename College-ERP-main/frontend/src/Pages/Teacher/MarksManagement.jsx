import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const MarksManagement = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [examType, setExamType] = useState("assignment");
  const [marks, setMarks] = useState({});
  const [examTitle, setExamTitle] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchStudents();
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/${selectedCourse}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleMarkChange = (studentId, mark) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: mark
    }));
  };

  const submitMarks = async () => {
    if (!examTitle || !maxMarks) {
      toast.error("Please fill exam title and max marks");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/marks/add`, {
        courseId: selectedCourse,
        examType,
        examTitle,
        maxMarks: parseInt(maxMarks),
        marks: Object.entries(marks).map(([studentId, mark]) => ({
          studentId,
          marks: parseInt(mark) || 0
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Marks submitted successfully");
      setMarks({});
      setExamTitle("");
      setMaxMarks("");
    } catch (error) {
      console.error("Error submitting marks:", error);
      toast.error("Failed to submit marks");
    }
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Marks Management
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="assignment">Assignment</option>
                <option value="midterm">Mid-term</option>
                <option value="final">Final Exam</option>
                <option value="internal">Internal Assessment</option>
              </select>
              
              <input
                type="text"
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                placeholder="Exam/Assignment Title"
                className="border rounded px-3 py-2"
              />
              
              <input
                type="number"
                value={maxMarks}
                onChange={(e) => setMaxMarks(e.target.value)}
                placeholder="Max Marks"
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {students.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold">Enter Marks for {examTitle || examType}</h3>
              </div>
              
              <div className="p-6">
                <div className="grid gap-4">
                  {students.map(student => (
                    <div key={student._id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <span className="font-medium">{student.first_name} {student.last_name}</span>
                        <span className="text-gray-500 ml-2">({student.student_id})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={marks[student._id] || ""}
                          onChange={(e) => handleMarkChange(student._id, e.target.value)}
                          placeholder="0"
                          min="0"
                          max={maxMarks}
                          className="border rounded px-3 py-1 w-20 text-center"
                        />
                        <span className="text-gray-500">/ {maxMarks}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={submitMarks}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  >
                    Submit Marks
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksManagement;