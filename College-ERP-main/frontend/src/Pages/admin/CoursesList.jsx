import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/baseUrl';
import Cookies from 'js-cookie';
import { FaPlus, FaEdit, FaTrash, FaEye, FaBook } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course-module/`);
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const token = Cookies.get('token');
      await axios.delete(`${BASE_URL}/course-module/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Course deleted successfully');
      fetchCourses();
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <Link
            to="/admin/add-course"
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaPlus /> Add New Course
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{course.courseName}</h3>
                  <p className="text-gray-600">{course.courseCode}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  course.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {course.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Department:</strong> {course.department}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Type:</strong> {course.courseType}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Duration:</strong> {course.duration}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Students:</strong> {course.currentStudents || 0}/{course.maxStudents || 'N/A'}
                </p>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-3 py-2 rounded text-sm hover:bg-blue-600">
                  <FaEye /> View
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600">
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => deleteCourse(course._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No Courses Found</h3>
            <p className="text-gray-500 mb-4">Start by adding your first course</p>
            <Link
              to="/admin/add-course"
              className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              <FaPlus /> Add First Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;