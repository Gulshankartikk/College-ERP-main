import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const BackButton = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is admin
  const isAdmin = () => {
    try {
      const token = Cookies.get('token') || localStorage.getItem('token');
      if (!token) return false;
      const decoded = jwtDecode(token);
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  };

  // Only show back button for admin users
  if (!isAdmin()) {
    return null;
  }

  return (
    <div className={`fixed top-4 right-4 z-50 ${className}`}>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        style={{ backgroundColor: '#2d545e', color: 'white' }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#e1b382'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#2d545e'}
      >
        <FaArrowLeft />
        <span className="font-semibold">Back</span>
      </button>
    </div>
  );
};

export default BackButton;