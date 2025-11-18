import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import { BASE_URL } from '../constants/baseUrl';

const AdminHeader = ({ currentRole = 'admin' }) => {
  const navigate = useNavigate();
  const [teacherId, setTeacherId] = useState(null);
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    fetchIds();
  }, []);

  const fetchIds = async () => {
    try {
      const token = Cookies.get('token');
      const [teachersRes, studentsRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/teachers`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${BASE_URL}/api/admin/students`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (teachersRes.data.teachers?.length > 0) {
        setTeacherId(teachersRes.data.teachers[0]._id);
      }
      if (studentsRes.data.students?.length > 0) {
        setStudentId(studentsRes.data.students[0]._id);
      }
    } catch (error) {
      console.error('Error fetching IDs:', error);
    }
  };

  const handleRoleSwitch = (role) => {
    if (role === 'teacher' && teacherId) {
      navigate(`/teacher/${teacherId}/dashboard`);
    } else if (role === 'student' && studentId) {
      navigate(`/student/${studentId}/dashboard`);
    } else {
      navigate('/admin/dashboard');
    }
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/');
  };

  return (
    <div className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold text-gray-800">College ERP System</h1>
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'admin' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaUserShield className="mr-2" />
              Admin
            </button>
            <button
              onClick={() => handleRoleSwitch('teacher')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'teacher' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaChalkboardTeacher className="mr-2" />
              Teacher View
            </button>
            <button
              onClick={() => handleRoleSwitch('student')}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentRole === 'student' 
                  ? 'bg-purple-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FaUserGraduate className="mr-2" />
              Student View
            </button>
          </div>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;