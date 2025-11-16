import React from 'react';
import './AdminHeader.css';

const AdminHeader = () => {
  return (
    <div className="admin-header">
      <div className="header-left">
        <h1>College ERP Admin Panel</h1>
      </div>
      <div className="header-right">
        <div className="creation-details">
          <div className="detail-item">
            <span className="label">Created by:</span>
            <span className="value">System Administrator</span>
          </div>
          <div className="detail-item">
            <span className="label">Version:</span>
            <span className="value">v1.0.0</span>
          </div>
          <div className="detail-item">
            <span className="label">Created:</span>
            <span className="value">2024-01-01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;