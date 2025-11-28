import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import TeacherHeader from '../../components/TeacherHeader';
import BackButton from '../../components/BackButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaBell, FaCalendarAlt, FaPlus } from 'react-icons/fa';

const TeacherNotices = () => {
  const { id: teacherId } = useParams();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    description: ''
  });

  useEffect(() => {
    fetchNotices();
    fetchSubjects();
  }, [teacherId]);

  const fetchNotices = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/teacher/${teacherId}/notices`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotices(response.data.notices || []);
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/teacher/${teacherId}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubjects(response.data.teacher?.assignedSubjects || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.post(
        `${BASE_URL}/api/teacher/${teacherId}/notices`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Notice sent successfully!');
      setShowModal(false);
      setFormData({ courseId: '', title: '', description: '' });
      fetchNotices();
    } catch (error) {
      console.error('Error sending notice:', error);
      alert('Failed to send notice');
    }
  };

  if (loading) return <LoadingSpinner message="Loading notices..." />;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2d545e 0%, #12343b 100%)' }}>
      <TeacherHeader currentRole="teacher" />
      <div className="p-6">
        <BackButton className="mb-4" />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <FaBell /> My Notices
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-3 rounded-lg text-white font-bold flex items-center gap-2"
            style={{ backgroundColor: '#e1b382' }}
          >
            <FaPlus /> Create Notice
          </button>
        </div>

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
              <p className="text-gray-700 mb-2">{notice.description}</p>
              <p className="text-sm" style={{ color: '#2d545e' }}>
                Course: {notice.courseId?.courseName || 'All'}
              </p>
            </div>
          )) : (
            <div className="bg-white rounded-lg shadow-xl p-12 text-center">
              <FaBell size={48} className="mx-auto mb-4" style={{ color: '#e1b382' }} />
              <p className="text-gray-500 text-lg">No notices available</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#2d545e' }}>Create Notice</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Course/Subject</label>
                <select
                  value={formData.courseId}
                  onChange={(e) => setFormData({ ...formData, courseId: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                >
                  <option value="">-- Select Course --</option>
                  {subjects.map(subject => (
                    <option key={subject._id} value={subject.courseId?._id}>
                      {subject.courseId?.courseName} - {subject.subjectName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-lg text-white font-bold"
                  style={{ backgroundColor: '#e1b382' }}
                >
                  Send
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 rounded-lg border-2 font-bold"
                  style={{ borderColor: '#2d545e', color: '#2d545e' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherNotices;
