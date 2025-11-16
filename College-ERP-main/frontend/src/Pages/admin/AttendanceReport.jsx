import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/AdminHeader";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";

const AttendanceReport = () => {
  const [reportData, setReportData] = useState(null);
  const [filters, setFilters] = useState({
    courseId: "",
    subjectId: "",
    startDate: "",
    endDate: "",
    studentId: ""
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/attendance-report`);
      if (response.data.success) {
        setReportData(response.data.data);
        setCourses(response.data.data.filters.courses);
        setSubjects(response.data.data.filters.subjects);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const generateReport = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
      
      const response = await axios.get(`${BASE_URL}/api/admin/attendance-report`, { params });
      if (response.data.success) {
        setReportData(response.data.data);
      }
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (data, filename) => {
    let csvContent = "";
    
    if (activeTab === "students") {
      csvContent = "Student Name,Roll No,Course,Total Classes,Present,Absent,Attendance %\n";
      data.forEach(student => {
        csvContent += `${student.student.name},${student.student.rollNo},${student.course.courseName},${student.totalClasses},${student.presentClasses},${student.absentClasses},${student.attendancePercentage}%\n`;
      });
    } else if (activeTab === "subjects") {
      csvContent = "Subject Name,Subject Code,Total Classes,Total Students,Present Count,Absent Count,Attendance %\n";
      data.forEach(subject => {
        csvContent += `${subject.subject.subject_name},${subject.subject.subject_code},${subject.totalClasses},${subject.totalStudents},${subject.presentCount},${subject.absentCount},${subject.attendancePercentage}%\n`;
      });
    } else if (activeTab === "courses") {
      csvContent = "Course Name,Course Code,Total Classes,Total Students,Present Count,Absent Count,Attendance %\n";
      data.forEach(course => {
        csvContent += `${course.course.courseName},${course.course.courseCode},${course.totalClasses},${course.totalStudents},${course.presentCount},${course.absentCount},${course.attendancePercentage}%\n`;
      });
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

  const resetFilters = () => {
    setFilters({
      courseId: "",
      subjectId: "",
      startDate: "",
      endDate: "",
      studentId: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Report</h1>
          <p className="text-gray-600">Comprehensive attendance analysis for all courses and subjects</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <select
              value={filters.courseId}
              onChange={(e) => setFilters({...filters, courseId: e.target.value})}
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
              value={filters.subjectId}
              onChange={(e) => setFilters({...filters, subjectId: e.target.value})}
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
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start Date"
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="End Date"
            />

            <div className="flex gap-2">
              <button
                onClick={generateReport}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 flex-1"
              >
                {loading ? "Loading..." : "Generate"}
              </button>
              <button
                onClick={resetFilters}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        {reportData && (
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: "overview", label: "Overview", count: reportData.attendance.length },
                  { id: "students", label: "Students", count: reportData.studentStats.length },
                  { id: "subjects", label: "Subjects", count: reportData.subjectStats.length },
                  { id: "courses", label: "Courses", count: reportData.courseStats.length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Attendance Records</h3>
                    <button
                      onClick={() => downloadCSV(reportData.attendance, "attendance_records.csv")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Teacher</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData.attendance.slice(0, 100).map((record, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(record.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.student.name} ({record.student.rollNo})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.subject.subject_name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.course.courseName}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {record.teacher.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                record.isPresent 
                                  ? "bg-green-100 text-green-800" 
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {record.isPresent ? "Present" : "Absent"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {reportData.attendance.length > 100 && (
                      <p className="text-gray-500 text-sm mt-4">
                        Showing first 100 records. Download CSV for complete data.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Students Tab */}
              {activeTab === "students" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Student-wise Attendance</h3>
                    <button
                      onClick={() => downloadCSV(reportData.studentStats, "student_attendance.csv")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
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
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData.studentStats.map((student, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {student.student.name} ({student.student.rollNo})
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
                                  ? "bg-green-100 text-green-800" 
                                  : parseFloat(student.attendancePercentage) >= 60
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
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

              {/* Subjects Tab */}
              {activeTab === "subjects" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Subject-wise Attendance</h3>
                    <button
                      onClick={() => downloadCSV(reportData.subjectStats, "subject_attendance.csv")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Classes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present Count</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent Count</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData.subjectStats.map((subject, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subject.subject.subject_name} ({subject.subject.subject_code})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subject.totalClasses}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subject.totalStudents}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subject.presentCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {subject.absentCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                parseFloat(subject.attendancePercentage) >= 75 
                                  ? "bg-green-100 text-green-800" 
                                  : parseFloat(subject.attendancePercentage) >= 60
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {subject.attendancePercentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === "courses" && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Course-wise Attendance</h3>
                    <button
                      onClick={() => downloadCSV(reportData.courseStats, "course_attendance.csv")}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    >
                      Download CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Classes</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Present Count</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Absent Count</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attendance %</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {reportData.courseStats.map((course, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.course.courseName} ({course.course.courseCode})
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.totalClasses}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.totalStudents}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.presentCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {course.absentCount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                parseFloat(course.attendancePercentage) >= 75 
                                  ? "bg-green-100 text-green-800" 
                                  : parseFloat(course.attendancePercentage) >= 60
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}>
                                {course.attendancePercentage}%
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceReport;