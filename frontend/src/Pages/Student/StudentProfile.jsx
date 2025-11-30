import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import {
  FaUser, FaEnvelope, FaPhone, FaIdCard, FaGraduationCap, FaChartLine,
  FaCalendarAlt, FaFilePdf, FaBus, FaBuilding, FaBook, FaMoneyBillWave,
  FaEdit, FaSave, FaTimes, FaClipboardList, FaBell
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import Card, { CardContent } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const StudentProfile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    name: '', email: '', phone: '', cvUrl: '',
    gender: '', dob: '', hostelInfo: '', transportInfo: ''
  });

  useEffect(() => {
    fetchStudentProfile();
    fetchAttendance();
    fetchMarks();
    fetchAssignments();
  }, [studentId]);

  const fetchStudentProfile = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/student/${studentId}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const sData = response.data.student;
      setStudent(sData);
      setEditData({
        name: sData?.name || '',
        email: sData?.email || '',
        phone: sData?.phone || '',
        cvUrl: sData?.cvUrl || '',
        gender: sData?.gender || '',
        dob: sData?.dob ? new Date(sData.dob).toISOString().split('T')[0] : '',
        hostelInfo: sData?.hostelInfo || '',
        transportInfo: sData?.transportInfo || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && student) {
      setEditData({
        name: student.name || '',
        email: student.email || '',
        phone: student.phone || '',
        cvUrl: student.cvUrl || '',
        gender: student.gender || '',
        dob: student.dob ? new Date(student.dob).toISOString().split('T')[0] : '',
        hostelInfo: student.hostelInfo || '',
        transportInfo: student.transportInfo || ''
      });
    }
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(`${BASE_URL}/api/student/${studentId}/profile`, editData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudent({ ...student, ...editData });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const fetchAttendance = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/student/${studentId}/attendance`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAttendance(response.data.attendanceBySubject || []);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchMarks = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/student/${studentId}/marks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMarks(response.data.marks || []);
    } catch (error) {
      console.error('Error fetching marks:', error);
    }
  };

  const fetchAssignments = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get(`${BASE_URL}/api/student/${studentId}/assignments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAssignments(response.data.assignments || []);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-sky-blue"></div>
      </div>
    );
  }

  const overallAttendance = attendance.length > 0
    ? (attendance.reduce((sum, s) => sum + parseFloat(s.percentage || 0), 0) / attendance.length).toFixed(2)
    : '0.00';

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header Section */}
      <div className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-end">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center text-4xl border-4 border-white/20">
              <FaUser />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">{student?.name}</h1>
              <div className="flex gap-4 text-sm text-gray-300">
                <span className="flex items-center gap-1"><FaIdCard /> {student?.rollNo || 'Roll No N/A'}</span>
                <span className="flex items-center gap-1"><FaGraduationCap /> {student?.courseId?.courseName || 'Course N/A'}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleEditToggle}
            className={`mt-4 md:mt-0 flex items-center gap-2 ${isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-blue hover:bg-sky-600'}`}
          >
            {isEditing ? <><FaTimes /> Cancel Editing</> : <><FaEdit /> Edit Profile</>}
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column - Detailed Info */}
        <div className="lg:col-span-2 space-y-8">

          {/* 1. Basic Information */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2">
                <FaUser className="text-sky-blue" /> Basic Information
              </h2>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Full Name" name="name" value={editData.name} onChange={handleInputChange} />
                  <InputGroup label="Email" name="email" value={editData.email} onChange={handleInputChange} />
                  <InputGroup label="Phone" name="phone" value={editData.phone} onChange={handleInputChange} />
                  <InputGroup label="Gender" name="gender" value={editData.gender} onChange={handleInputChange} placeholder="Male/Female/Other" />
                  <InputGroup label="Date of Birth" name="dob" type="date" value={editData.dob} onChange={handleInputChange} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <InfoRow label="Full Name" value={student?.name} />
                  <InfoRow label="Roll Number" value={student?.rollNo} />
                  <InfoRow label="Email" value={student?.email} />
                  <InfoRow label="Phone" value={student?.phone} />
                  <InfoRow label="Gender" value={student?.gender} />
                  <InfoRow label="Date of Birth" value={student?.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'} />
                  <InfoRow label="Course" value={student?.courseId?.courseName} />
                  <InfoRow label="Joined" value={new Date(student?.createdAt).toLocaleDateString()} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* 2. Additional Details (Hostel, Transport) */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2">
                <FaBus className="text-sky-blue" /> Additional Details
              </h2>
              {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Hostel Info" name="hostelInfo" value={editData.hostelInfo} onChange={handleInputChange} placeholder="Block/Room No" />
                  <InputGroup label="Transport Info" name="transportInfo" value={editData.transportInfo} onChange={handleInputChange} placeholder="Bus Route/Stop" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <InfoRow label="Hostel Info" value={student?.hostelInfo} />
                    <InfoRow label="Transport Info" value={student?.transportInfo} />
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full md:w-auto flex items-center justify-center gap-2" onClick={() => toast.info("ID Card download started...")}>
                      <FaIdCard /> Download ID Card
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 3. CV / Resume Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2">
                <FaFilePdf className="text-sky-blue" /> CV / Resume
              </h2>
              {isEditing ? (
                <div>
                  <InputGroup label="CV URL (Public Link)" name="cvUrl" value={editData.cvUrl} onChange={handleInputChange} placeholder="https://drive.google.com/..." />
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-100 rounded text-red-600"><FaFilePdf size={24} /></div>
                    <div>
                      <p className="font-bold text-navy">Curriculum Vitae</p>
                      <p className="text-xs text-gray-500">PDF Document</p>
                    </div>
                  </div>
                  {student?.cvUrl ? (
                    <a href={student.cvUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">View CV</Button>
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 italic">No CV Uploaded</span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex justify-end">
              <Button onClick={handleSaveProfile} className="flex items-center gap-2 text-lg px-8">
                <FaSave /> Save All Changes
              </Button>
            </div>
          )}

          {/* 4. Academic Performance (Marks) */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center gap-2 border-b pb-2">
                <FaBook className="text-sky-blue" /> Academic Performance
              </h2>
              {marks.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Subject</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Exam</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">Score</th>
                        <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase">%</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {marks.map((mark, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 text-sm font-medium text-navy">{mark.subjectId?.subjectName}</td>
                          <td className="px-4 py-3 text-sm text-gray-500">{mark.examType}</td>
                          <td className="px-4 py-3 text-sm font-bold text-sky-blue">{mark.marks} / {mark.totalMarks}</td>
                          <td className="px-4 py-3 text-sm font-bold text-navy">{((mark.marks / mark.totalMarks) * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No marks recorded yet.</p>
              )}
            </CardContent>
          </Card>

        </div>

        {/* Right Column - Dashboard Widgets */}
        <div className="space-y-6">

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-sky-blue">{overallAttendance}%</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Attendance</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center">
              <p className="text-3xl font-bold text-navy">{assignments.length}</p>
              <p className="text-xs text-gray-500 uppercase font-bold mt-1">Assignments</p>
            </div>
          </div>

          {/* Fee & Financial (Mock) */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                <FaMoneyBillWave className="text-sky-blue" /> Fee Status
              </h3>
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg mb-3">
                <p className="text-sm text-green-800 font-bold">No Dues Pending</p>
                <p className="text-xs text-green-600">Last payment: 15th Nov 2024</p>
              </div>
              <button className="w-full text-center py-2 border border-navy text-navy rounded-lg hover:bg-navy hover:text-white transition-colors text-sm font-bold">
                View Receipts
              </button>
            </CardContent>
          </Card>

          {/* Learning Materials */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                <FaBook className="text-sky-blue" /> Learning Materials
              </h3>
              <div className="space-y-2">
                <Link to={`/student/${studentId}/materials`} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  • Download Notes
                </Link>
                <Link to={`/student/${studentId}/assignments`} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  • View Assignments
                </Link>
                <button className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  • Previous Year Papers
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Support & Communication */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                <FaBell className="text-sky-blue" /> Support
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  • Complaint Box
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                  • Teacher Chat
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Attendance Breakdown */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                <FaChartLine className="text-sky-blue" /> Attendance
              </h3>
              <div className="space-y-3">
                {attendance.slice(0, 3).map((record, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-600 font-medium">{record.subjectName}</span>
                      <span className={`font-bold ${parseFloat(record.percentage) < 75 ? 'text-red-500' : 'text-green-600'}`}>
                        {record.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${parseFloat(record.percentage) < 75 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${record.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoRow = ({ label, value }) => (
  <div className="border-b border-gray-50 pb-2 last:border-0">
    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">{label}</p>
    <p className="text-navy font-medium text-base mt-0.5">{value || 'N/A'}</p>
  </div>
);

const InputGroup = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-blue focus:border-sky-blue outline-none transition-all"
    />
  </div>
);

export default StudentProfile;
