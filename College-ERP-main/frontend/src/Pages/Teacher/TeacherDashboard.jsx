import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import TeacherNav from './TeacherNav';
import { 
  FaUsers, 
  FaBook, 
  FaClipboardList, 
  FaBell, 
  FaCalendarAlt,
  FaChartLine,
  FaFileAlt,
  FaClock
} from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';

const TeacherDashboard = () => {
  const { id } = useParams();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchDashboardData();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [id]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/teacher/${id}/dashboard`);
      if (response.data.success) {
        setDashboardData(response.data.dashboardData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex w-full">
        <div className="fixed">
          <TeacherNav />
        </div>
        <div className="w-full lg:ps-[24%] xl:ps-[15%] min-h-[100vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-gray-50">
      <div className="fixed">
        <TeacherNav />
      </div>

      <div className="w-full lg:ps-[24%] xl:ps-[15%] min-h-[100vh] p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                Welcome, {dashboardData?.teacher?.name}
              </h1>
              <p className="text-gray-600 mt-2">
                {dashboardData?.teacher?.designation} - {dashboardData?.teacher?.department}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {formatTime(currentTime)}
              </div>
              <div className="text-gray-600">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData?.totalStudents || 0}
                </p>
              </div>
              <FaUsers className="text-blue-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Subjects</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData?.totalSubjects || 0}
                </p>
              </div>
              <FaBook className="text-green-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Courses</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData?.totalCourses || 0}
                </p>
              </div>
              <FaClipboardList className="text-yellow-500 text-3xl" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Assignments</p>
                <p className="text-3xl font-bold text-gray-800">
                  {dashboardData?.pendingAssignments || 0}
                </p>
              </div>
              <FaFileAlt className="text-red-500 text-3xl" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Classes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaCalendarAlt className="text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Today's Classes</h2>
            </div>
            <div className="space-y-3">
              {dashboardData?.todayClasses?.length > 0 ? (
                dashboardData.todayClasses.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">
                        {classItem.subject?.subject_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {classItem.course?.courseName} - Room {classItem.room}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">
                        {classItem.startTime} - {classItem.endTime}
                      </p>
                      <p className="text-xs text-gray-500">
                        Period {classItem.periodNumber}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaClock className="mx-auto text-4xl mb-2" />
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </div>
          </div>

          {/* Recent Notices */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <FaBell className="text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Recent Notices</h2>
            </div>
            <div className="space-y-3">
              {dashboardData?.recentNotices?.length > 0 ? (
                dashboardData.recentNotices.map((notice, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800 flex-1">
                        {notice.title}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notice.content.substring(0, 100)}...
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {notice.course?.courseName}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        notice.priority === 'High' ? 'bg-red-100 text-red-800' :
                        notice.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {notice.priority}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaBell className="mx-auto text-4xl mb-2" />
                  <p>No recent notices</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <FaClipboardList className="text-blue-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-700">Mark Attendance</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <FaFileAlt className="text-green-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-700">Create Assignment</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
              <FaBell className="text-yellow-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-700">Send Notice</span>
            </button>
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <FaBook className="text-purple-500 text-2xl mb-2" />
              <span className="text-sm font-medium text-gray-700">Upload Material</span>
            </button>
          </div>
        </div>

        {/* Assigned Subjects & Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Assigned Subjects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Subjects</h2>
            <div className="space-y-2">
              {dashboardData?.teacher?.assignedSubjects?.map((subject, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{subject.subject_name}</p>
                    <p className="text-sm text-gray-600">{subject.subject_code}</p>
                  </div>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {subject.credits} Credits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assigned Courses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Assigned Courses</h2>
            <div className="space-y-2">
              {dashboardData?.teacher?.assignedCourses?.map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{course.courseName}</p>
                    <p className="text-sm text-gray-600">{course.courseCode}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {course.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;