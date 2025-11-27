import React from 'react';

const Table = ({ 
  columns = [], 
  data = [], 
  loading = false,
  emptyMessage = 'No data available',
  className = ''
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      {column.render 
                        ? column.render(row[column.accessor], row, rowIndex)
                        : row[column.accessor]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ActionButton = ({ 
  onClick, 
  icon: Icon, 
  color = 'blue', 
  tooltip,
  ...props 
}) => {
  const colors = {
    blue: 'text-blue-600 hover:text-blue-900',
    green: 'text-green-600 hover:text-green-900',
    red: 'text-red-600 hover:text-red-900',
    yellow: 'text-yellow-600 hover:text-yellow-900'
  };

  return (
    <button
      onClick={onClick}
      className={`p-1 rounded transition-colors ${colors[color]}`}
      title={tooltip}
      {...props}
    >
      <Icon />
    </button>
  );
};

export default Table;