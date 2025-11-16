import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import './CreateForm.css';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    department: '',
    courseType: '',
    duration: '',
    totalSemesters: '',
    description: '',
    status: 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to create course
    console.log('Course created:', formData);
    navigate('/admin/dashboard');
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <div className="create-page">
      <AdminHeader />
      
      <div className="create-content">
        <div className="form-container">
          <div className="form-header">
            <h2>Add New Course</h2>
            <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
              ← Back to Dashboard
            </button>
          </div>

          <form onSubmit={handleSubmit} className="create-form">
            
            {/* Basic Information Section */}
            <div className="form-section">
              <h3>Basic Information</h3>
              <div className="form-grid">
                <input name="courseName" placeholder="Course Name" value={formData.courseName} onChange={handleChange} required />
                <input name="courseCode" placeholder="Course Code" value={formData.courseCode} onChange={handleChange} required />
                <input name="department" placeholder="Department" value={formData.department} onChange={handleChange} required />
                <select name="courseType" value={formData.courseType} onChange={handleChange} required>
                  <option value="">Course Type</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
            </div>

            {/* Academic Details Section */}
            <div className="form-section">
              <h3>Academic Details</h3>
              <div className="form-grid">
                <input name="duration" placeholder="Duration (Years)" value={formData.duration} onChange={handleChange} required />
                <input name="totalSemesters" placeholder="Total Semesters" value={formData.totalSemesters} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
              </div>
            </div>

            {/* System Settings Section */}
            <div className="form-section">
              <h3>System Settings</h3>
              <div className="form-grid">
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">Create Course</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;