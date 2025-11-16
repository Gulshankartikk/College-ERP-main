import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const StudentNotes = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [noteType, setNoteType] = useState("behavioral");
  const [noteContent, setNoteContent] = useState("");
  const [studentNotes, setStudentNotes] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchStudents();
    }
  }, [selectedCourse]);

  useEffect(() => {
    if (selectedStudent) {
      fetchStudentNotes();
    }
  }, [selectedStudent]);

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

  const fetchStudentNotes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/student-notes/${selectedStudent}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudentNotes(response.data.notes || []);
    } catch (error) {
      console.error("Error fetching student notes:", error);
    }
  };

  const addNote = async () => {
    if (!noteContent.trim()) {
      toast.error("Please enter note content");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/student-notes/add`, {
        studentId: selectedStudent,
        noteType,
        content: noteContent,
        teacherId: id
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Note added successfully");
      setNoteContent("");
      fetchStudentNotes();
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  };

  const getNoteTypeColor = (type) => {
    const colors = {
      behavioral: "bg-blue-100 text-blue-800",
      progress: "bg-green-100 text-green-800",
      homework: "bg-yellow-100 text-yellow-800",
      improvement: "bg-red-100 text-red-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Student Notes
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
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
              
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student._id} value={student._id}>
                    {student.first_name} {student.last_name} ({student.student_id})
                  </option>
                ))}
              </select>
            </div>

            {selectedStudent && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-4">Add New Note</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <select
                    value={noteType}
                    onChange={(e) => setNoteType(e.target.value)}
                    className="border rounded px-3 py-2"
                  >
                    <option value="behavioral">Behavioral Note</option>
                    <option value="progress">Progress Comment</option>
                    <option value="homework">Homework Status</option>
                    <option value="improvement">Improvement Note</option>
                  </select>
                </div>
                
                <textarea
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Enter your note here..."
                  className="w-full border rounded px-3 py-2 h-24 mb-4"
                />
                
                <button
                  onClick={addNote}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Note
                </button>
              </div>
            )}
          </div>

          {studentNotes.length > 0 && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold">Previous Notes</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {studentNotes.map((note, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNoteTypeColor(note.noteType)}`}>
                          {note.noteType.charAt(0).toUpperCase() + note.noteType.slice(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{note.content}</p>
                      <p className="text-sm text-gray-500 mt-2">By: {note.teacherName}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNotes;