import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Modal from "../Common/Modal";

const MarkAttendance = () => {
  const { id } = useParams();
  const [isModalVisible, setModalVisible] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  // Form state
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState({});
  const [showStudentList, setShowStudentList] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchSubjects();
      setSelectedSubject("");
      setShowStudentList(false);
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedCourse && selectedSubject && selectedDate) {
      fetchStudents();
    }
  }, [selectedCourse, selectedSubject, selectedDate]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses");
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/${selectedCourse}/subjects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(response.data.subjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      toast.error("Failed to fetch subjects");
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses/${selectedCourse}/students`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sortedStudents = response.data.students.sort((a, b) => a.student_id.localeCompare(b.student_id));
      setStudents(sortedStudents);
      
      // Initialize attendance data
      const initialAttendance = {};
      sortedStudents.forEach(student => {
        initialAttendance[student._id] = "present"; // Default to present
      });
      setAttendanceData(initialAttendance);
      setShowStudentList(true);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error("Failed to fetch students");
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = async () => {
    if (!selectedCourse || !selectedSubject || !selectedDate) {
      toast.error("Please select course, subject, and date");
      return;
    }

    const presentStudents = Object.entries(attendanceData)
      .filter(([studentId, status]) => status === "present")
      .map(([studentId]) => ({ studentId }));

    try {
      const response = await axios.post(
        `${BASE_URL}/courses/course/attendance`,
        {
          courseId: selectedCourse,
          subjectId: selectedSubject,
          date: selectedDate,
          attendanceRecords: presentStudents,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Attendance marked successfully");
        setAttendanceData({});
        setShowStudentList(false);
        setSelectedCourse("");
        setSelectedSubject("");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to mark attendance");
    }
  };

  const getPresentCount = () => {
    return Object.values(attendanceData).filter(status => status === "present").length;
  };

  const getAbsentCount = () => {
    return Object.values(attendanceData).filter(status => status === "absent").length;
  };

  return (
    <>
      <div className="flex w-full">
        <div className="fixed">
          <TeacherNav />
        </div>

        <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
          <div className="w-full cursor-default">
            <h1 className="cursor-default overflow-hidden w-full text-center font-oswald font-bold text-5xl md:text-8xl lg:text-7xl xl:text-9xl my-9">
              Mark Attendance
            </h1>
          </div>

          {/* Selection Form */}
          <div className="px-10 py-5">
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-lg font-semibold mb-4">Select Class, Subject & Date</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Class/Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="">Select Course</option>
                    {courses.map(course => (
                      <option key={course._id} value={course._id}>
                        {course.courseName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                    disabled={!selectedCourse}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject._id} value={subject._id}>
                        {subject.subject_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>

            {/* Student List */}
            {showStudentList && students.length > 0 && (
              <div className="bg-white rounded-lg shadow-md">
                <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Student List - {students.length} Students</h3>
                  <div className="flex gap-4 text-sm">
                    <span className="text-green-600 font-medium">Present: {getPresentCount()}</span>
                    <span className="text-red-600 font-medium">Absent: {getAbsentCount()}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="space-y-3">
                    {students.map((student) => (
                      <div
                        key={student._id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="font-medium text-gray-600">
                              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {student.first_name} {student.last_name}
                            </p>
                            <p className="text-sm text-gray-500">Roll No: {student.student_id}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`attendance_${student._id}`}
                              value="present"
                              checked={attendanceData[student._id] === "present"}
                              onChange={() => handleAttendanceChange(student._id, "present")}
                              className="text-green-600"
                            />
                            <span className="text-green-600 font-medium">Present</span>
                          </label>
                          
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={`attendance_${student._id}`}
                              value="absent"
                              checked={attendanceData[student._id] === "absent"}
                              onChange={() => handleAttendanceChange(student._id, "absent")}
                              className="text-red-600"
                            />
                            <span className="text-red-600 font-medium">Absent</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex justify-end gap-4">
                    <button
                      onClick={() => {
                        const allPresent = {};
                        students.forEach(student => {
                          allPresent[student._id] = "present";
                        });
                        setAttendanceData(allPresent);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Mark All Present
                    </button>
                    
                    <button
                      onClick={() => setModalVisible(true)}
                      className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 font-medium"
                    >
                      Submit Attendance
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Modal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onYes={submitAttendance}
        onNo={() => setModalVisible(false)}
        title="Confirm Attendance"
        desc={`Submit attendance for ${selectedDate}? Present: ${getPresentCount()}, Absent: ${getAbsentCount()}`}
        note="Note: Once submitted, attendance can only be modified on the same day"
      />
    </>
  );
};

export default MarkAttendance;
