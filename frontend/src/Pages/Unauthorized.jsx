import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import Button from '../components/ui/Button';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
        <FaExclamationTriangle className="text-6xl text-danger mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-secondary mb-2 font-heading">Access Denied</h1>
        <p className="text-text-secondary mb-6">
          You don't have permission to access this page.
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => navigate(-1)}
            variant="primary"
          >
            Go Back
          </Button>
          <Button
            onClick={() => navigate('/login')}
            variant="outline"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
