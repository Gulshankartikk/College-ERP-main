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
  const [studentStats, setStudentStats] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });
  const [activeTab, setActiveTab] = useState("records");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const params = {
        ...dateRange,
        ...(selectedCourse && { courseId: selectedCourse }),
        ...(selectedSubject && { subjectId: selectedSubject })
      };
      
      const response = await axios.get(`${BASE_URL}/teacher/${id}/attendance`, { params });
      if (response.data.success) {
        setAttendanceData(response.data.attendance || []);
        setStudentStats(response.data.studentStats || []);
      }
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = (type = "records") => {
    let csvContent = "";
    let filename = "";
    
    if (type === "records") {
      csvContent = "Date,Student,Subject,Course,Status\n";
      attendanceData.forEach(record => {
        csvContent += `${new Date(record.date).toLocaleDateString()},${record.student?.name || 'N/A'},${record.subject?.subject_name || 'N/A'},${record.course?.courseName || 'N/A'},${record.isPresent ? 'Present' : 'Absent'}\n`;
      });
      filename = "attendance_records.csv";
    } else if (type === "stats") {
      csvContent = "Student Name,Course,Total Classes,Present,Absent,Attendance %\n";
      studentStats.forEach(student => {
        csvContent += `${student.student.name},${student.course.courseName},${student.totalClasses},${student.presentClasses},${student.absentClasses},${student.attendancePercentage}%\n`;
      });
      filename = "student_attendance_stats.csv";
    }
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
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
          {/* Filters Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Filters & Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  setSelectedSubject("");
                }}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start Date"
              />
              
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="End Date"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={fetchAttendanceReport}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Generate Report"}
              </button>
              
              <button
                onClick={() => {
                  setSelectedCourse("");
                  setSelectedSubject("");
                  setDateRange({ startDate: "", endDate: "" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Tabs */}
          {(attendanceData.length > 0 || studentStats.length > 0) && (
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  <button
                    onClick={() => setActiveTab("records")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "records"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Attendance Records ({attendanceData.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("statistics")}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === "statistics"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    Student Statistics ({studentStats.length})
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* Content based on active tab */}
          {activeTab === "records" && attendanceData.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Attendance Records</h3>
                  <button
                    onClick={() => downloadReport("records")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Download Records CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
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
            </div>
          )}

          {/* Student Statistics Tab */}
          {activeTab === "statistics" && studentStats.length > 0 && (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Student Attendance Statistics</h3>
                  <button
                    onClick={() => downloadReport("stats")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Download Statistics CSV
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Classes</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {studentStats.map((student, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.course.courseName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.totalClasses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.presentClasses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.absentClasses}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            parseFloat(student.attendancePercentage) >= 75 
                              ? 'bg-green-100 text-green-800' 
                              : parseFloat(student.attendancePercentage) >= 60
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {student.attendancePercentage}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* No data message */}
          {!loading && attendanceData.length === 0 && studentStats.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No attendance data found</h3>
                <p className="text-gray-500">Try adjusting your filters or generate a report to see attendance data.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;