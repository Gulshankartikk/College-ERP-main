import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/api';
import {
  FaUser, FaBook, FaClipboardList, FaBell, FaCalendarAlt, FaFileAlt,
  FaDollarSign, FaChartBar, FaBus, FaHome, FaEnvelope, FaPhone,
  FaCheckCircle, FaClock, FaExclamationTriangle, FaDownload, FaTimes
} from 'react-icons/fa';
import Cookies from 'js-cookie';
import BackButton from '../../components/BackButton';

const StudentDashboardNew = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendanceStats, setAttendanceStats] = useState({ percentage: 0, subjectWise: [] });
  const [assignments, setAssignments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token') || localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch Student Profile & Dashboard Data
        const dashboardRes = await axios.get(`${BASE_URL}/api/student/${studentId}/dashboard`, { headers });
        setStudent(dashboardRes.data.student);

        // 2. Fetch Attendance
        const attendanceRes = await axios.get(`${BASE_URL}/api/student/${studentId}/attendance`, { headers });
        if (attendanceRes.data.success) {
          const { stats, attendance } = attendanceRes.data;

          // Calculate subject-wise attendance
          const subjectMap = {};
          attendance.forEach(record => {
            const subName = record.subjectId?.subjectName || 'Unknown';
            if (!subjectMap[subName]) subjectMap[subName] = { total: 0, present: 0 };
            subjectMap[subName].total++;
            if (record.status === 'Present') subjectMap[subName].present++;
          });

          const subjectWise = Object.keys(subjectMap).map(sub => ({
            name: sub,
            attendance: subjectMap[sub].total > 0
              ? ((subjectMap[sub].present / subjectMap[sub].total) * 100).toFixed(0) + '%'
              : '0%',
            status: (subjectMap[sub].present / subjectMap[sub].total) >= 0.75 ? 'good' : 'warning'
          }));

          setAttendanceStats({
            percentage: stats.attendancePercentage,
            subjectWise
          });
        }

        // 3. Fetch Assignments
        const assignmentsRes = await axios.get(`${BASE_URL}/api/student/${studentId}/assignments`, { headers });
        setAssignments(assignmentsRes.data.assignments || []);

        // 4. Fetch Notices
        const noticesRes = await axios.get(`${BASE_URL}/api/student/${studentId}/notices`, { headers });
        setNotices(noticesRes.data.notices || []);

        // 5. Fetch Timetable
        const timetableRes = await axios.get(`${BASE_URL}/api/student/${studentId}/timetable`, { headers });
        setTimetable(timetableRes.data.timetable || []);

        // 6. Fetch Fees
        const feesRes = await axios.get(`${BASE_URL}/api/student/${studentId}/fees`, { headers });
        setFees(feesRes.data.fees || []);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  // Derived Data for UI
  const summaryCards = [
    { title: 'Attendance', value: `${attendanceStats.percentage}%`, icon: FaClipboardList, color: '#10b981', bg: '#d1fae5' },
    { title: 'Assignments', value: `${assignments.filter(a => a.submissions?.some(s => s.studentId === studentId)).length}/${assignments.length}`, icon: FaFileAlt, color: '#3b82f6', bg: '#dbeafe' },
    { title: 'Pending Fees', value: fees.reduce((acc, fee) => acc + (fee.status !== 'Paid' ? fee.amount : 0), 0) > 0 ? 'Due' : 'Clear', icon: FaDollarSign, color: '#f59e0b', bg: '#fef3c7' }
  ];

  const getDayName = (dateStr) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(dateStr).getDay()];
  };

  const todayDay = getDayName(new Date());
  const todaysSchedule = timetable.filter(t => t.day === todayDay);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <BackButton />
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white fixed h-full overflow-y-auto hidden md:block">
        <div className="p-6">
          {/* Profile Section */}
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
              <FaUser className="text-5xl text-blue-900" />
            </div>
            <h3 className="font-bold text-lg">{student?.name || 'Student'}</h3>
            <p className="text-sm text-blue-200">{student?.rollNo || 'ID: --'}</p>
            <p className="text-xs text-blue-300 mt-1">{student?.courseId?.courseName || 'Course: --'}</p>
          </div>

          {/* Quick Info */}
          <div className="bg-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Semester</span>
              <span className="font-bold">{student?.semester || '1'}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">Section</span>
              <span className="font-bold">{student?.section || 'A'}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link to={`/student/${studentId}/profile`} className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition">
              <FaUser />
              <span>Profile</span>
            </Link>
            <Link to={`/student/${studentId}/attendance`} className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition">
              <FaClipboardList />
              <span>Attendance</span>
            </Link>
            <Link to={`/student/${studentId}/assignments`} className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition">
              <FaFileAlt />
              <span>Assignments</span>
            </Link>
            <Link to={`/student/${studentId}/materials`} className="flex items-center space-x-3 p-3 rounded hover:bg-blue-700 transition">
              <FaBook />
              <span>Study Materials</span>
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {student?.name}!</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {summaryCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6" style={{ borderLeft: `4px solid ${card.color}` }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                </div>
                <div className="p-4 rounded-full" style={{ backgroundColor: card.bg }}>
                  <card.icon className="text-2xl" style={{ color: card.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject-wise Attendance */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-blue-600" />
                Subject-wise Attendance
              </h2>
              <div className="space-y-3">
                {attendanceStats.subjectWise.length > 0 ? attendanceStats.subjectWise.map((subject, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{subject.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${subject.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'}`}
                          style={{ width: subject.attendance }}
                        ></div>
                      </div>
                      <span className={`font-bold ${subject.status === 'good' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {subject.attendance}
                      </span>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-4">No attendance records found.</p>
                )}
              </div>
            </div>

            {/* Assignments */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaFileAlt className="mr-2 text-blue-600" />
                Recent Assignments
              </h2>
              <div className="space-y-3">
                {assignments.slice(0, 5).map((assignment, index) => {
                  const isSubmitted = assignment.submissions?.some(s => s.studentId === studentId);
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subjectId?.subjectName}</p>
                        <p className="text-xs text-gray-500 mt-1">Due: {new Date(assignment.deadline).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {isSubmitted ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center">
                            <FaCheckCircle className="mr-1" /> Submitted
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium flex items-center">
                            <FaClock className="mr-1" /> Pending
                          </span>
                        )}
                        {assignment.fileUrl && (
                          <button
                            onClick={() => window.open(assignment.fileUrl, '_blank')}
                            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            <FaDownload />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
                {assignments.length === 0 && <p className="text-gray-500 text-center py-4">No assignments available.</p>}
              </div>
            </div>

            {/* Weekly Timetable */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-600" />
                Today's Schedule ({todayDay})
              </h2>
              <div className="space-y-2">
                {todaysSchedule.length > 0 ? todaysSchedule.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg border-l-4 border-blue-500">
                    <div>
                      <p className="font-semibold text-gray-800">{slot.subjectId?.subjectName}</p>
                      <p className="text-sm text-gray-600">{slot.timeSlot}</p>
                    </div>
                    <span className="text-sm text-gray-600 bg-white px-3 py-1 rounded-full">{slot.roomNo || 'Room --'}</span>
                  </div>
                )) : (
                  <p className="text-gray-500 text-center py-4">No classes scheduled for today.</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaBell className="mr-2 text-blue-600" />
                Notifications
              </h2>
              <div className="space-y-3">
                {notices.slice(0, 5).map((notif, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-800 text-sm">{notif.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{notif.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(notif.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
                {notices.length === 0 && <p className="text-gray-500 text-center py-4">No new notifications.</p>}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="space-y-2">
                <Link to={`/student/${studentId}/marks`} className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center">
                  <FaFileAlt className="mr-2" /> View Results
                </Link>
                <Link to={`/student/${studentId}/fees`} className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition flex items-center justify-center">
                  <FaDollarSign className="mr-2" /> Pay Fees
                </Link>
                <Link to={`/student/${studentId}/materials`} className="w-full p-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center justify-center">
                  <FaDownload className="mr-2" /> Study Materials
                </Link>
              </div>
            </div>

            {/* Footer Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold mb-1">Exam Results</h3>
                <p className="text-sm">Check your latest performance</p>
                <Link to={`/student/${studentId}/marks`} className="mt-2 inline-block text-xs bg-white text-green-600 px-3 py-1 rounded-full font-medium">View Now</Link>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-4 shadow-md">
                <h3 className="font-bold mb-1">Fee Status</h3>
                <p className="text-sm">Check pending dues</p>
                <Link to={`/student/${studentId}/fees`} className="mt-2 inline-block text-xs bg-white text-orange-600 px-3 py-1 rounded-full font-medium">Pay Now</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboardNew;
