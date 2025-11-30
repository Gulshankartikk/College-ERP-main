import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../../constants/api';
import {
  User, FileText, Bell, CheckCircle, Clock
} from 'lucide-react';
import { toast } from 'react-toastify';

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-soft-grey overflow-hidden ${className}`}>
    {children}
  </div>
);

const Badge = ({ children, type = "primary" }) => {
  const styles = {
    primary: "bg-sky-blue/10 text-sky-blue",
    success: "bg-sky-blue/10 text-sky-blue",
    warning: "bg-navy/10 text-navy",
    danger: "bg-red-100 text-red-700",
    neutral: "bg-soft-grey/20 text-text-grey",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};

const StudentDashboardNew = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Data States
  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [notices, setNotices] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [marks, setMarks] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token') || localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        // Parallel data fetching
        const [
          profileRes,
          attendanceRes,
          assignmentsRes,
          noticesRes,
          subjectsRes,
          marksRes,
          materialsRes
        ] = await Promise.all([
          axios.get(`${BASE_URL}/api/student/${studentId}/profile`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/attendance`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/assignments`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/notices`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/subjects`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/marks`, { headers }),
          axios.get(`${BASE_URL}/api/student/${studentId}/materials`, { headers })
        ]);

        setStudent(profileRes.data.student);
        setAttendance(attendanceRes.data.attendance || []);
        setAssignments(assignmentsRes.data.assignments || []);
        setNotices(noticesRes.data.notices || []);
        setSubjects(subjectsRes.data.subjects || []);
        setMarks(marksRes.data.marks || []);
        setMaterials(materialsRes.data.materials || []);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy to-sky-blue rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <User size={150} />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {student?.name}!</h1>
          <p className="text-sky-blue/20 text-lg mb-6">
            Roll No: <span className="font-mono font-semibold bg-white/20 px-2 py-1 rounded">{student?.rollNo}</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sky-blue/80 text-sm">Course</p>
              <p className="font-semibold text-lg">{student?.courseId?.courseName || 'N/A'}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sky-blue/80 text-sm">Email</p>
              <p className="font-semibold text-lg truncate">{student?.email}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <p className="text-sky-blue/80 text-sm">Phone</p>
              <p className="font-semibold text-lg">{student?.phone || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-l-4 border-sky-blue">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-grey text-sm font-medium">Pending Assignments</p>
              <h3 className="text-3xl font-bold text-navy mt-2">
                {assignments.filter(a => !a.submitted).length}
              </h3>
            </div>
            <div className="p-3 bg-sky-blue/10 rounded-lg text-sky-blue">
              <FileText size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-sky-blue">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-grey text-sm font-medium">Attendance</p>
              <h3 className="text-3xl font-bold text-navy mt-2">
                {attendance.length > 0
                  ? `${Math.round((attendance.filter(a => a.status === 'Present').length / attendance.length) * 100)}%`
                  : 'N/A'}
              </h3>
            </div>
            <div className="p-3 bg-sky-blue/10 rounded-lg text-sky-blue">
              <CheckCircle size={24} />
            </div>
          </div>
        </Card>
        <Card className="p-6 border-l-4 border-navy">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-text-grey text-sm font-medium">New Notices</p>
              <h3 className="text-3xl font-bold text-navy mt-2">{notices.length}</h3>
            </div>
            <div className="p-3 bg-navy/10 rounded-lg text-navy">
              <Bell size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity / Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center">
            <Bell className="mr-2 text-sky-blue" size={20} /> Recent Announcements
          </h3>
          <div className="space-y-4">
            {notices.slice(0, 3).map((notice) => (
              <div key={notice._id} className="p-4 bg-background rounded-lg border border-soft-grey hover:bg-sky-blue/5 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-navy">{notice.title}</h4>
                  <span className="text-xs text-text-grey">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-text-grey line-clamp-2">{notice.description}</p>
              </div>
            ))}
            {notices.length === 0 && <p className="text-gray-500 text-center py-4">No new announcements.</p>}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center">
            <Clock className="mr-2 text-sky-blue" size={20} /> Upcoming Deadlines
          </h3>
          <div className="space-y-4">
            {assignments.filter(a => !a.submitted).slice(0, 3).map((assignment) => (
              <div key={assignment._id} className="flex items-center justify-between p-4 bg-background rounded-lg border border-soft-grey">
                <div>
                  <h4 className="font-semibold text-navy">{assignment.title}</h4>
                  <p className="text-xs text-red-500 font-medium mt-1">
                    Due: {new Date(assignment.deadline).toLocaleDateString()}
                  </p>
                </div>
                <Badge type="warning">Pending</Badge>
              </div>
            ))}
            {assignments.filter(a => !a.submitted).length === 0 && (
              <p className="text-gray-500 text-center py-4">No pending assignments!</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboardNew;
