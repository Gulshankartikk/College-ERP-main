import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/AdminHeader';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    courses: [],
    students: [],
    teachers: [],
    subjects: []
  });

  const handleCreate = (type) => {
    navigate(`/admin/create-${type}`);
  };

  return (
    <div className="admin-dashboard">
      <AdminHeader />
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          
          {/* Courses Section */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Courses</h3>
              <button onClick={() => handleCreate('course')} className="create-btn">
                + Add Course
              </button>
            </div>
            <div className="card-content">
              <div className="stats">Total: {data.courses.length}</div>
              <div className="items-list">
                {data.courses.map(course => (
                  <div key={course.id} className="item">
                    <span>{course.name}</span>
                    <span className="code">{course.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Students Section */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Students</h3>
              <button onClick={() => handleCreate('student')} className="create-btn">
                + Add Student
              </button>
            </div>
            <div className="card-content">
              <div className="stats">Total: {data.students.length}</div>
              <div className="items-list">
                {data.students.map(student => (
                  <div key={student.id} className="item">
                    <span>{student.name}</span>
                    <span className="code">{student.rollNo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teachers Section */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Teachers</h3>
              <button onClick={() => handleCreate('teacher')} className="create-btn">
                + Add Teacher
              </button>
            </div>
            <div className="card-content">
              <div className="stats">Total: {data.teachers.length}</div>
              <div className="items-list">
                {data.teachers.map(teacher => (
                  <div key={teacher.id} className="item">
                    <span>{teacher.name}</span>
                    <span className="code">{teacher.empId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subjects Section */}
          <div className="dashboard-card">
            <div className="card-header">
              <h3>Subjects</h3>
              <button onClick={() => handleCreate('subject')} className="create-btn">
                + Add Subject
              </button>
            </div>
            <div className="card-content">
              <div className="stats">Total: {data.subjects.length}</div>
              <div className="items-list">
                {data.subjects.map(subject => (
                  <div key={subject.id} className="item">
                    <span>{subject.name}</span>
                    <span className="code">{subject.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;