import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const NoticesManagement = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [noticeType, setNoticeType] = useState("class");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeContent, setNoticeContent] = useState("");
  const [priority, setPriority] = useState("normal");
  const [notices, setNotices] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
    fetchNotices();
  }, []);

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

  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notices/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(response.data.notices || []);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const createNotice = async () => {
    if (!noticeTitle.trim() || !noticeContent.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/notices/create`, {
        title: noticeTitle,
        content: noticeContent,
        type: noticeType,
        priority,
        courseId: selectedCourse,
        teacherId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Notice created successfully");
      setNoticeTitle("");
      setNoticeContent("");
      fetchNotices();
    } catch (error) {
      console.error("Error creating notice:", error);
      toast.error("Failed to create notice");
    }
  };

  const deleteNotice = async (noticeId) => {
    try {
      await axios.delete(`${BASE_URL}/notices/${noticeId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Notice deleted successfully");
      fetchNotices();
    } catch (error) {
      console.error("Error deleting notice:", error);
      toast.error("Failed to delete notice");
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "bg-green-100 text-green-800",
      normal: "bg-blue-100 text-blue-800",
      high: "bg-yellow-100 text-yellow-800",
      urgent: "bg-red-100 text-red-800"
    };
    return colors[priority] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Notices Management
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Create New Notice</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select
                value={noticeType}
                onChange={(e) => setNoticeType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="class">Class Notice</option>
                <option value="homework">Homework Notice</option>
                <option value="exam">Exam Notice</option>
                <option value="announcement">Important Announcement</option>
              </select>
              
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Course (Optional)</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="low">Low Priority</option>
                <option value="normal">Normal Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <input
              type="text"
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="Notice Title"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            
            <textarea
              value={noticeContent}
              onChange={(e) => setNoticeContent(e.target.value)}
              placeholder="Notice Content"
              className="w-full border rounded px-3 py-2 h-32 mb-4"
            />
            
            <button
              onClick={createNotice}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Create Notice
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">My Notices</h3>
            </div>
            
            <div className="p-6">
              {notices.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No notices created yet</p>
              ) : (
                <div className="space-y-4">
                  {notices.map((notice, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{notice.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notice.priority)}`}>
                            {notice.priority}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {new Date(notice.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteNotice(notice._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {notice.type.charAt(0).toUpperCase() + notice.type.slice(1)}
                        </span>
                        {notice.courseName && (
                          <span className="text-sm bg-blue-100 px-2 py-1 rounded ml-2">
                            {notice.courseName}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700">{notice.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticesManagement;