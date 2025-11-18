import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaBook, FaFileAlt, FaClipboardList, FaTasks } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const StudentHeader = ({ studentId, studentName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItems = [
    { path: `/student/${studentId}/dashboard`, label: 'Dashboard', icon: <FaUser /> },
    { path: `/student/${studentId}/notes`, label: 'Notes', icon: <FaFileAlt /> },
    { path: `/student/${studentId}/materials`, label: 'Study Materials', icon: <FaBook /> },
    { path: `/student/${studentId}/assignments`, label: 'Assignments', icon: <FaTasks /> },
    { path: `/student/${studentId}/attendance`, label: 'Attendance', icon: <FaClipboardList /> }
  ];

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold">Student Portal</h1>
            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'bg-blue-700 text-white'
                      : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {studentName || 'Student'}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default StudentHeader;