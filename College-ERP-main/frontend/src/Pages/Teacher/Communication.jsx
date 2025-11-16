import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Communication = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [messageType, setMessageType] = useState("individual");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messages, setMessages] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
    fetchMessages();
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

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/messages/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const selectAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map(s => s._id));
    }
  };

  const sendMessage = async () => {
    if (!messageSubject.trim() || !messageContent.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (messageType === "individual" && selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/messages/send`, {
        subject: messageSubject,
        content: messageContent,
        type: messageType,
        recipients: messageType === "class" ? [] : selectedStudents,
        courseId: messageType === "class" ? selectedCourse : null,
        senderId: id,
        senderType: "teacher"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Message sent successfully");
      setMessageSubject("");
      setMessageContent("");
      setSelectedStudents([]);
      fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Communication
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Send Message</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="individual">Individual Message</option>
                <option value="class">Class Message</option>
                <option value="group">Group Message</option>
              </select>
              
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
            </div>
            
            <input
              type="text"
              value={messageSubject}
              onChange={(e) => setMessageSubject(e.target.value)}
              placeholder="Message Subject"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Message Content"
              className="w-full border rounded px-3 py-2 h-32 mb-4"
            />

            {messageType !== "class" && students.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Select Recipients:</h4>
                  <button
                    onClick={selectAllStudents}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    {selectedStudents.length === students.length ? "Deselect All" : "Select All"}
                  </button>
                </div>
                <div className="max-h-40 overflow-y-auto border rounded p-2">
                  {students.map(student => (
                    <label key={student._id} className="flex items-center gap-2 p-1">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleStudentSelection(student._id)}
                      />
                      <span>{student.first_name} {student.last_name} ({student.student_id})</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
            
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Send Message
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">Sent Messages</h3>
            </div>
            
            <div className="p-6">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No messages sent yet</p>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{message.subject}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            message.type === 'class' ? 'bg-blue-100 text-blue-800' : 
                            message.type === 'group' ? 'bg-green-100 text-green-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {message.type}
                          </span>
                          <span className="text-sm text-gray-500">
                            {new Date(message.sentAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{message.content}</p>
                      
                      <div className="text-sm text-gray-500">
                        Recipients: {message.recipientCount} student(s)
                      </div>
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

export default Communication;