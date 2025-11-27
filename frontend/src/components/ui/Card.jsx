import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle,
  className = '',
  headerColor = '#2d545e',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      style={{ borderTop: `4px solid ${headerColor}` }}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export const StatCard = ({ title, value, icon: Icon, color = '#2d545e', change }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6" style={{ borderLeft: `4px solid ${color}` }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
          {change && (
            <p className="text-xs font-semibold text-green-600 mt-1">{change}</p>
          )}
        </div>
        {Icon && (
          <div className="p-4 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Icon className="text-2xl" style={{ color }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;