import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Card, { CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';

const StudentLeave = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: 'Sick Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const leaveTypes = [
    { value: 'Sick Leave', label: 'Sick Leave' },
    { value: 'Casual Leave', label: 'Casual Leave' },
    { value: 'Emergency Leave', label: 'Emergency Leave' },
    { value: 'Family Function', label: 'Family Function' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Leave request submitted successfully!');
    setShowModal(false);
    setFormData({ leaveType: 'Sick Leave', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-secondary font-heading">Leave Requests</h1>
          <Button
            onClick={() => setShowModal(true)}
            variant="primary"
            className="flex items-center gap-2"
          >
            <FaPlus /> Request Leave
          </Button>
        </div>

        <Card className="border border-gray-200 shadow-lg">
          <CardContent className="p-12 text-center">
            <p className="text-text-muted text-lg">No leave requests yet</p>
          </CardContent>
        </Card>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Request Leave"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Leave Type"
            name="leaveType"
            value={formData.leaveType}
            onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
            options={leaveTypes}
            required
          />
          <Input
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
          <Input
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Reason</label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
              rows="3"
              required
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentLeave;
