import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import StudentHeader from '../../components/StudentHeader';
import BackButton from '../../components/BackButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import { FaMoneyBillWave, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const StudentFees = () => {
  const { studentId } = useParams();
  const [fees, setFees] = useState(null);
  const [loading, setLoading] = useState(false);

  // Mock data
  const mockFees = {
    totalAmount: 50000,
    paidAmount: 30000,
    dueAmount: 20000,
    dueDate: '2024-03-31',
    status: 'pending',
    transactions: [
      { amount: 30000, date: '2024-01-15', method: 'Online', transactionId: 'TXN123456' }
    ]
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #2d545e 0%, #12343b 100%)' }}>
      <StudentHeader currentRole="student" />
      <div className="p-6">
        <BackButton className="mb-4" />
        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          <FaMoneyBillWave /> Fee Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-xl p-6" style={{ borderLeft: '4px solid #4ade80' }}>
            <p className="text-sm font-semibold" style={{ color: '#2d545e' }}>Total Amount</p>
            <p className="text-3xl font-bold" style={{ color: '#12343b' }}>₹{mockFees.totalAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6" style={{ borderLeft: '4px solid #3b82f6' }}>
            <p className="text-sm font-semibold" style={{ color: '#2d545e' }}>Paid Amount</p>
            <p className="text-3xl font-bold" style={{ color: '#12343b' }}>₹{mockFees.paidAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-6" style={{ borderLeft: '4px solid #ef4444' }}>
            <p className="text-sm font-semibold" style={{ color: '#2d545e' }}>Due Amount</p>
            <p className="text-3xl font-bold" style={{ color: '#12343b' }}>₹{mockFees.dueAmount.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#2d545e' }}>Payment Status</h2>
          <div className="flex items-center gap-3 mb-4">
            <FaExclamationCircle size={24} style={{ color: '#fbbf24' }} />
            <div>
              <p className="font-bold">Pending Payment</p>
              <p className="text-sm text-gray-600">Due Date: {new Date(mockFees.dueDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            className="px-6 py-3 rounded-lg text-white font-bold"
            style={{ backgroundColor: '#e1b382' }}
            onClick={() => alert('Payment gateway will be integrated')}
          >
            Pay Now
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#2d545e' }}>Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ backgroundColor: '#2d545e' }}>
                <tr>
                  <th className="p-3 text-left text-white">Date</th>
                  <th className="p-3 text-left text-white">Amount</th>
                  <th className="p-3 text-left text-white">Method</th>
                  <th className="p-3 text-left text-white">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {mockFees.transactions.map((txn, idx) => (
                  <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : 'white' }}>
                    <td className="p-3">{new Date(txn.date).toLocaleDateString()}</td>
                    <td className="p-3 font-bold">₹{txn.amount.toLocaleString()}</td>
                    <td className="p-3">{txn.method}</td>
                    <td className="p-3">{txn.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFees;
