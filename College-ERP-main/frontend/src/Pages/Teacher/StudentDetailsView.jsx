import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const StudentDetailsView = () => {
  const { id, studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [marksData, setMarksData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [newRemark, setNewRemark] = useState("");
  const [remarkType, setRemarkType] = useState("positive");
  const [activeTab, setActiveTab] = useState("details");

  const token = Cookies.get("token");

  useEffect(() => {
    fetchStudentDetails();
    fetchAttendanceData();
    fetchMarksData();
    fetchRemarks();
  }, [studentId]);

  const fetchStudentDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}/teacher-view`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent(response.data.student);
    } catch (error) {
      console.error("Error fetching student details:", error);
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}/attendance-summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendanceData(response.data.attendance || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  const fetchMarksData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}/marks-summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMarksData(response.data.marks || []);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  const fetchRemarks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student/${studentId}/remarks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRemarks(response.data.remarks || []);
    } catch (error) {
      console.error("Error fetching remarks:", error);
    }
  };

  const addRemark = async () => {
    if (!newRemark.trim()) {
      toast.error("Please enter a remark");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/student/${studentId}/add-remark`, {
        remark: newRemark,
        type: remarkType,
        teacherId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Remark added successfully");
      setNewRemark("");
      fetchRemarks();
    } catch (error) {
      console.error("Error adding remark:", error);
      toast.error("Failed to add remark");
    }
  };

  const getRemarkTypeColor = (type) => {
    const colors = {
      positive: "bg-green-100 text-green-800",
      behavior: "bg-yellow-100 text-yellow-800",
      improvement: "bg-red-100 text-red-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  if (!student) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-3xl md:text-5xl my-6">
          Student Details
        </h1>
        
        <div className="px-10 py-5">
          {/* Student Basic Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {student.first_name.charAt(0)}{student.last_name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student.first_name} {student.last_name}</h2>
                <p className="text-gray-600">Roll No: {student.student_id}</p>
                <p className="text-gray-600">Email: {student.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {["details", "attendance", "marks", "remarks"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Academic Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Course:</span> {student.courseName}</p>
                      <p><span className="font-medium">Enrollment Date:</span> {new Date(student.createdAt).toLocaleDateString()}</p>
                      <p><span className="font-medium">Status:</span> <span className="text-green-600">Active</span></p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    <div className="space-y-2">
                      <p><span className="font-medium">Email:</span> {student.email}</p>
                      <p><span className="font-medium">Phone:</span> {student.phone || "Not provided"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "attendance" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
                  {attendanceData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border p-3 text-left">Subject</th>
                            <th className="border p-3 text-left">Present Days</th>
                            <th className="border p-3 text-left">Total Days</th>
                            <th className="border p-3 text-left">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {attendanceData.map((item, index) => (
                            <tr key={index}>
                              <td className="border p-3">{item.subject}</td>
                              <td className="border p-3">{item.presentDays}</td>
                              <td className="border p-3">{item.totalDays}</td>
                              <td className="border p-3">
                                <span className={`font-semibold ${item.percentage < 75 ? 'text-red-600' : 'text-green-600'}`}>
                                  {item.percentage}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No attendance data available</p>
                  )}
                </div>
              )}

              {activeTab === "marks" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Marks Summary</h3>
                  {marksData.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border p-3 text-left">Subject</th>
                            <th className="border p-3 text-left">Exam Type</th>
                            <th className="border p-3 text-left">Marks Obtained</th>
                            <th className="border p-3 text-left">Total Marks</th>
                            <th className="border p-3 text-left">Percentage</th>
                          </tr>
                        </thead>
                        <tbody>
                          {marksData.map((item, index) => (
                            <tr key={index}>
                              <td className="border p-3">{item.subject}</td>
                              <td className="border p-3">{item.examType}</td>
                              <td className="border p-3">{item.marksObtained}</td>
                              <td className="border p-3">{item.totalMarks}</td>
                              <td className="border p-3">
                                <span className={`font-semibold ${item.percentage < 50 ? 'text-red-600' : 'text-green-600'}`}>
                                  {item.percentage}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">No marks data available</p>
                  )}
                </div>
              )}

              {activeTab === "remarks" && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">Add New Remark</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <select
                        value={remarkType}
                        onChange={(e) => setRemarkType(e.target.value)}
                        className="border rounded px-3 py-2"
                      >
                        <option value="positive">Positive Remark</option>
                        <option value="behavior">Behavior Remark</option>
                        <option value="improvement">Improvement Needed</option>
                      </select>
                    </div>
                    <textarea
                      value={newRemark}
                      onChange={(e) => setNewRemark(e.target.value)}
                      placeholder="Enter your remark here..."
                      className="w-full border rounded px-3 py-2 h-24 mb-4"
                    />
                    <button
                      onClick={addRemark}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Add Remark
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Previous Remarks</h3>
                    {remarks.length > 0 ? (
                      <div className="space-y-4">
                        {remarks.map((remark, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRemarkTypeColor(remark.type)}`}>
                                {remark.type}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(remark.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700">{remark.content}</p>
                            <p className="text-sm text-gray-500 mt-2">By: {remark.teacherName}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No remarks added yet</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsView;