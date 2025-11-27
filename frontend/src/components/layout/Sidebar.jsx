import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  menuItems = [], 
  onLogout,
  className = '',
  bgColor = 'from-gray-900 to-gray-800'
}) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`w-64 bg-gradient-to-b ${bgColor} text-white fixed h-full overflow-y-auto ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          {Icon && (
            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
              <Icon className="text-3xl" />
            </div>
          )}
          <h2 className="font-bold text-xl">{title}</h2>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded transition ${
                isActive(item.path) 
                  ? 'bg-gray-700' 
                  : 'hover:bg-gray-700'
              }`}
            >
              {item.icon && <item.icon />}
              <span>{item.label}</span>
            </Link>
          ))}
          
          {onLogout && (
            <button 
              onClick={onLogout}
              className="w-full flex items-center space-x-3 p-3 rounded hover:bg-red-600 transition"
            >
              <span>Logout</span>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;