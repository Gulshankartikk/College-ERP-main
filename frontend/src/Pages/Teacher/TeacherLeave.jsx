import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card, { CardContent } from '../../components/ui/Card';

const TeacherLeave = () => {
  const { id: teacherId } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const leaveTypes = ['Sick Leave', 'Casual Leave', 'Emergency Leave', 'Personal Leave'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Leave application submitted successfully!');
    setShowModal(false);
    setFormData({ leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-secondary font-heading">Leave Applications</h1>
            <p className="text-text-secondary mt-1">Manage your leave requests</p>
          </div>
          <Button onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <FaPlus /> Apply Leave
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaves.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-text-secondary text-lg">No leave applications yet</p>
            </div>
          ) : (
            leaves.map((leave, index) => (
              <Card key={index}>
                <CardContent>
                  {/* Leave details would go here */}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-secondary font-heading">Apply for Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Select
                label="Leave Type"
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
                required
              >
                {leaveTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>

              <Input
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />

              <Input
                label="End Date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
              />

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-1">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  rows="3"
                  required
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherLeave;
