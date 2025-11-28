import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import BackButton from '../../components/BackButton';
import AdminHeader from '../../components/AdminHeader';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBook, FaChalkboardTeacher, FaSave, FaTimes } from 'react-icons/fa';

const CreateTeacher = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    department: '',
    designation: '',
    assignedCourse: [],
    assignedSubjects: []
  });

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/dashboard`);
      if (response.data.success) {
        setCourses(response.data.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/dashboard`);
      if (response.data.success) {
        setSubjects(response.data.data.subjects);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (e, field) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = Cookies.get('token');
      const response = await axios.post(`${BASE_URL}/api/admin/teachers`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        toast.success('Teacher created successfully!');
        navigate('/admin/teachers');
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to create teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <BackButton className="mb-6" />

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Header Section */}
            <div className="bg-night-blue px-8 py-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-sand-tan rounded-lg text-night-blue shadow-lg">
                  <FaChalkboardTeacher className="text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-sand-tan font-oswald tracking-wide">Create Teacher Profile</h1>
                  <p className="text-gray-300 text-sm mt-1">Add a new faculty member to the system</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-night-blue border-b border-gray-200 pb-2 mb-4">
                    Personal Information
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="Dr. Gulshan Kumar"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="gulshan@gmail.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhone className="text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-night-blue border-b border-gray-200 pb-2 mb-4">
                    Academic Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Designation</label>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue transition-all"
                        placeholder="Assistant Professor"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaBook className="inline mr-2 text-night-blue" />
                      Assigned Courses
                    </label>
                    <select
                      multiple
                      onChange={(e) => handleMultiSelect(e, 'assignedCourse')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue h-32 transition-all"
                    >
                      {courses.map(course => (
                        <option key={course._id} value={course._id} className="p-2 hover:bg-blue-50">
                          {course.courseName} ({course.courseCode})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaBook className="inline mr-2 text-night-blue" />
                      Assigned Subjects
                    </label>
                    <select
                      multiple
                      onChange={(e) => handleMultiSelect(e, 'assignedSubjects')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-night-blue focus:border-night-blue h-32 transition-all"
                    >
                      {subjects.map(subject => (
                        <option key={subject._id} value={subject._id} className="p-2 hover:bg-blue-50">
                          {subject.subjectName} ({subject.subjectCode})
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => navigate('/admin/teachers')}
                  className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <FaTimes className="mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-8 py-3 bg-sand-tan text-night-blue-shadow rounded-lg hover:bg-sand-tan-shadow transition-all font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-night-blue mr-2"></div>
                  ) : (
                    <FaSave className="mr-2" />
                  )}
                  {loading ? 'Creating...' : 'Create Teacher'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
