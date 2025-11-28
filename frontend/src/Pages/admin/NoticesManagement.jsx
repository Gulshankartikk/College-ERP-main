import React, { useState } from 'react';
import { FaBell, FaPlus, FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa';
import AdminHeader from '../../components/AdminHeader';
import BackButton from '../../components/BackButton';
import { toast } from 'react-toastify';

const NoticesManagement = () => {
  const [notices, setNotices] = useState([
    { 
      id: 1, 
      title: 'Mid-Term Examination Schedule', 
      content: 'Mid-term examinations will be conducted from February 15-25, 2024.',
      date: '2024-01-20',
      priority: 'High',
      status: 'Active',
      audience: 'All Students'
    },
    { 
      id: 2, 
      title: 'Library Maintenance Notice', 
      content: 'The library will be closed for maintenance on January 30, 2024.',
      date: '2024-01-18',
      priority: 'Medium',
      status: 'Active',
      audience: 'All Users'
    },
    { 
      id: 3, 
      title: 'Fee Payment Deadline', 
      content: 'Last date for fee payment is February 10, 2024. Late fees will be applicable after this date.',
      date: '2024-01-15',
      priority: 'High',
      status: 'Active',
      audience: 'Students'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'Medium',
    audience: 'All Users',
    expiryDate: ''
  });

  const handleCreate = () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill all required fields');
      return;
    }
    const newNotice = {
      id: notices.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    setNotices([newNotice, ...notices]);
    setFormData({ title: '', content: '', priority: 'Medium', audience: 'All Users', expiryDate: '' });
    setShowCreateModal(false);
    toast.success('Notice created successfully');
  };

  const handleEdit = () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill all required fields');
      return;
    }
    setNotices(notices.map(n => n.id === selectedNotice.id ? { ...n, ...formData } : n));
    setShowEditModal(false);
    setSelectedNotice(null);
    toast.success('Notice updated successfully');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      setNotices(notices.filter(n => n.id !== id));
      toast.success('Notice deleted successfully');
    }
  };

  const openEditModal = (notice) => {
    setSelectedNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content,
      priority: notice.priority,
      audience: notice.audience,
      expiryDate: notice.expiryDate || ''
    });
    setShowEditModal(true);
  };

  const openViewModal = (notice) => {
    setSelectedNotice(notice);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notices Management</h1>
            <p className="text-gray-600">Create and manage institutional notices</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaPlus />
            <span>Create Notice</span>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaBell className="text-3xl text-blue-500 mr-4" />
              <div>
                <p className="text-gray-600">Total Notices</p>
                <p className="text-2xl font-bold">45</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaBell className="text-3xl text-green-500 mr-4" />
              <div>
                <p className="text-gray-600">Active</p>
                <p className="text-2xl font-bold">32</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaBell className="text-3xl text-yellow-500 mr-4" />
              <div>
                <p className="text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold">8</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaBell className="text-3xl text-red-500 mr-4" />
              <div>
                <p className="text-gray-600">Expired</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </div>



        {/* Notices List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">Recent Notices</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Audience</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {notices.map((notice) => (
                  <tr key={notice.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaBell className="text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{notice.title}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{notice.content}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{notice.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                        notice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notice.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{notice.audience}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        {notice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button onClick={() => openViewModal(notice)} className="text-blue-600 hover:text-blue-900"><FaEye /></button>
                      <button onClick={() => openEditModal(notice)} className="text-green-600 hover:text-green-900"><FaEdit /></button>
                      <button onClick={() => handleDelete(notice.id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Notice</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter notice title..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select 
                      value={formData.audience}
                      onChange={(e) => setFormData({...formData, audience: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>All Users</option>
                      <option>Students</option>
                      <option>Teachers</option>
                      <option>Staff</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="4"
                    placeholder="Enter notice content..."
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Create Notice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Notice</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select 
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                    <select 
                      value={formData.audience}
                      onChange={(e) => setFormData({...formData, audience: e.target.value})}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option>All Users</option>
                      <option>Students</option>
                      <option>Teachers</option>
                      <option>Staff</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notice Content *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                  Cancel
                </button>
                <button onClick={handleEdit} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Update Notice
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Modal */}
        {showViewModal && selectedNotice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Notice Details</h2>
                <button onClick={() => setShowViewModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedNotice.title}</h3>
                  <p className="text-sm text-gray-500">Posted on: {selectedNotice.date}</p>
                </div>
                <div className="flex space-x-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    selectedNotice.priority === 'High' || selectedNotice.priority === 'Urgent' ? 'bg-red-100 text-red-800' :
                    selectedNotice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedNotice.priority} Priority
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
                    {selectedNotice.audience}
                  </span>
                  <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                    {selectedNotice.status}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedNotice.content}</p>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button onClick={() => setShowViewModal(false)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesManagement;