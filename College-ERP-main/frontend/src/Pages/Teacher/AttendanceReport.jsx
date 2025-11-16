import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import Cookies from "js-cookie";

const AttendanceReport = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const token = Cookies.get("token");

  useEffect(() => {
    fetchTeacherData();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchSubjects();
    }
  }, [selectedCourse]);

  const fetchTeacherData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacher/${id}/dashboard`);
      if (response.data.success) {
        setCourses(response.data.dashboardData.teacher.assignedCourses || []);
        setSubjects(response.data.dashboardData.teacher.assignedSubjects || []);
      }
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacher/${id}/dashboard`);
      if (response.data.success) {
        setSubjects(response.data.dashboardData.teacher.assignedSubjects || []);
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const fetchAttendanceReport = async () => {
    try {
      const params = {
        ...dateRange,
        ...(selectedCourse && { courseId: selectedCourse }),
        ...(selectedSubject && { subjectId: selectedSubject })
      };
      
      const response = await axios.get(`${BASE_URL}/teacher/${id}/attendance`, { params });
      if (response.data.success) {
        setAttendanceData(response.data.attendance || []);
      }
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    }
  };

  const downloadReport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Student ID,Name,Present Days,Total Days,Percentage\n"
      + attendanceData.map(row => 
          `${row.studentId},${row.name},${row.presentDays},${row.totalDays},${row.percentage}%`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Attendance Report
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedSubject("");
                }}
                className="border rounded px-3 py-2"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName} ({course.courseCode})
                  </option>
                ))}
              </select>
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subject_name} ({subject.subject_code})
                  </option>
                ))}
              </select>
              
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                className="border rounded px-3 py-2"
                placeholder="Start Date"
              />
              
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className="border rounded px-3 py-2"
                placeholder="End Date"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={fetchAttendanceReport}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Generate Report
              </button>
              
              {attendanceData.length > 0 && (
                <button
                  onClick={downloadReport}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Download CSV
                </button>
              )}
            </div>
          </div>

          {attendanceData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {attendanceData.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.student?.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.subject?.subject_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.course?.courseName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          record.isPresent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {record.isPresent ? 'Present' : 'Absent'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;