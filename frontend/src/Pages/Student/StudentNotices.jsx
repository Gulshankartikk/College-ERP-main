import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import StudentHeader from '../../components/StudentHeader';
import BackButton from '../../components/BackButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaBell, FaCalendarAlt } from 'react-icons/fa';

const StudentNotices = () => {
  const { studentId } = useParams();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, [studentId]);

  const fetchNotices = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/student/${studentId}/notices`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(response.data.notices || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading notices..." />;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2d545e 0%, #12343b 100%)' }}>
      <StudentHeader currentRole="student" />
      <div className="p-6">
        <BackButton className="mb-4" />
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <FaBell /> Notices & Announcements
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {notices.length > 0 ? notices.map(notice => (
            <div key={notice._id} className="bg-white rounded-lg shadow-xl p-6" style={{ borderLeft: '4px solid #e1b382' }}>
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold" style={{ color: '#2d545e' }}>{notice.title}</h3>
                <span className="text-sm" style={{ color: '#c89666' }}>
                  <FaCalendarAlt className="inline mr-1" />
                  {new Date(notice.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{notice.description}</p>
            </div>
          )) : (
            <div className="bg-white rounded-lg shadow-xl p-12 text-center">
              <FaBell size={48} className="mx-auto mb-4" style={{ color: '#e1b382' }} />
              <p className="text-gray-500 text-lg">No notices available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentNotices;
