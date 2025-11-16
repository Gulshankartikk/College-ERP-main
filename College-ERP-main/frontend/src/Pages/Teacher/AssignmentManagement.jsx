import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AssignmentManagement = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    dueDate: "",
    maxMarks: "",
    subject: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
    fetchAssignments();
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

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/assignments/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const createAssignment = async () => {
    if (!assignmentData.title || !assignmentData.dueDate || !selectedCourse) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    Object.keys(assignmentData).forEach(key => {
      formData.append(key, assignmentData[key]);
    });
    formData.append("courseId", selectedCourse);
    formData.append("teacherId", id);
    
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axios.post(`${BASE_URL}/assignments/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Assignment created successfully");
      setShowCreateForm(false);
      setAssignmentData({
        title: "",
        description: "",
        dueDate: "",
        maxMarks: "",
        subject: ""
      });
      setSelectedFile(null);
      fetchAssignments();
    } catch (error) {
      console.error("Error creating assignment:", error);
      toast.error("Failed to create assignment");
    }
  };

  const viewSubmissions = async (assignmentId) => {
    try {
      const response = await axios.get(`${BASE_URL}/assignments/${assignmentId}/submissions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Handle submissions view - could open a modal or navigate to submissions page
      console.log("Submissions:", response.data.submissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  const deleteAssignment = async (assignmentId) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/assignments/${assignmentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Assignment deleted successfully");
      fetchAssignments();
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Failed to delete assignment");
    }
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Assignment Management
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">My Assignments</h3>
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                {showCreateForm ? "Cancel" : "Create New Assignment"}
              </button>
            </div>

            {showCreateForm && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Create New Assignment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  
                  <input
                    type="text"
                    name="subject"
                    value={assignmentData.subject}
                    onChange={handleInputChange}
                    placeholder="Subject"
                    className="border rounded px-3 py-2"
                  />
                </div>

                <input
                  type="text"
                  name="title"
                  value={assignmentData.title}
                  onChange={handleInputChange}
                  placeholder="Assignment Title"
                  className="w-full border rounded px-3 py-2 mb-4"
                />

                <textarea
                  name="description"
                  value={assignmentData.description}
                  onChange={handleInputChange}
                  placeholder="Assignment Description"
                  className="w-full border rounded px-3 py-2 h-24 mb-4"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="date"
                    name="dueDate"
                    value={assignmentData.dueDate}
                    onChange={handleInputChange}
                    className="border rounded px-3 py-2"
                  />
                  
                  <input
                    type="number"
                    name="maxMarks"
                    value={assignmentData.maxMarks}
                    onChange={handleInputChange}
                    placeholder="Max Marks"
                    className="border rounded px-3 py-2"
                  />
                </div>

                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt"
                  className="w-full border rounded px-3 py-2 mb-4"
                />

                <button
                  onClick={createAssignment}
                  className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                >
                  Create Assignment
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">Assignment List</h3>
            </div>
            
            <div className="p-6">
              {assignments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No assignments created yet</p>
              ) : (
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-lg">{assignment.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            new Date(assignment.dueDate) < new Date() 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {new Date(assignment.dueDate) < new Date() ? 'Overdue' : 'Active'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <p><span className="font-medium">Subject:</span> {assignment.subject}</p>
                        <p><span className="font-medium">Due Date:</span> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        <p><span className="font-medium">Max Marks:</span> {assignment.maxMarks}</p>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{assignment.description}</p>
                      
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => viewSubmissions(assignment._id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Submissions ({assignment.submissionCount || 0})
                        </button>
                        
                        {assignment.fileName && (
                          <a
                            href={assignment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-800 text-sm"
                          >
                            Download File
                          </a>
                        )}
                        
                        <button
                          onClick={() => deleteAssignment(assignment._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
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

export default AssignmentManagement;