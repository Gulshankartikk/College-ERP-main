import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherNav from './TeacherNav';
import { 
  FaUsers, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaPlus,
  FaExclamationTriangle,
  FaStar,
  FaCommentAlt,
  FaGraduationCap,
  FaCalendarAlt
} from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import { toast } from 'react-toastify';

const EnhancedStudentManagement = () => {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [courses, setCourses] = useState([]);
  const [showRemarkModal, setShowRemarkModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [remarkForm, setRemarkForm] = useState({
    remarkType: 'General',
    title: '',
    description: '',
    severity: 'Medium',
    followUpRequired: false,
    followUpDate: ''
  });

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, [id]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, selectedCourse]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${baseUrl}/teacher/${id}/students`);
      if (response.data.success) {
        setStudents(response.data.students);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/courses`);
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const filterStudents = () => {
    let filtered = students;

    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCourse) {
      filtered = filtered.filter(student => student.course._id === selectedCourse);
    }

    setFilteredStudents(filtered);
  };

  const handleAddRemark = async () => {
    try {
      const response = await axios.post(`${baseUrl}/teacher/${id}/students/remarks`, {
        studentId: selectedStudent._id,
        ...remarkForm
      });

      if (response.data.success) {
        toast.success('Remark added successfully');
        setShowRemarkModal(false);
        setRemarkForm({
          remarkType: 'General',
          title: '',
          description: '',
          severity: 'Medium',
          followUpRequired: false,
          followUpDate: ''
        });
        setSelectedStudent(null);
      }
    } catch (error) {
      console.error('Error adding remark:', error);
      toast.error('Failed to add remark');
    }
  };

  const openRemarkModal = (student) => {
    setSelectedStudent(student);
    setShowRemarkModal(true);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-orange-600 bg-orange-100';
      case 'Critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRemarkTypeIcon = (type) => {
    switch (type) {
      case 'Behavior': return <FaExclamationTriangle className="text-orange-500" />;
      case 'Performance': return <FaStar className="text-blue-500" />;
      case 'Attendance': return <FaCalendarAlt className="text-purple-500" />;
      case 'Warning': return <FaExclamationTriangle className="text-red-500" />;
      case 'Appreciation': return <FaStar className="text-green-500" />;
      default: return <FaCommentAlt className="text-gray-500" />;
    }
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Student Management</h1>
            <p className="text-gray-600 mt-2">Manage and monitor your students</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <FaUsers />
            <span className="font-medium">{filteredStudents.length} Students</span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName} ({course.courseCode})
                  </option>
                ))}
              </select>
            </div>

            <button className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
              <FaPlus />
              Bulk Actions
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              {/* Student Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3 overflow-hidden">
                  {student.profilePhoto ? (
                    <img 
                      src={student.profilePhoto} 
                      alt={student.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaGraduationCap className="text-gray-400 text-xl" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-gray-600">{student.rollNumber}</p>
                </div>
              </div>

              {/* Student Info */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Course:</span>
                  <span className="text-sm font-medium">{student.course.courseCode}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Semester:</span>
                  <span className="text-sm font-medium">{student.semester || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm text-blue-600 truncate">{student.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button 
                  onClick={() => {/* Navigate to student details */}}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <FaEye />
                  View Details
                </button>
                <button 
                  onClick={() => openRemarkModal(student)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm"
                >
                  <FaCommentAlt />
                  Add Remark
                </button>
              </div>

              {/* Recent Remarks Preview */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Activity</h4>
                <div className="space-y-1">
                  {/* This would be populated with actual remarks */}
                  <div className="text-xs text-gray-500">No recent remarks</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No Students Found</h3>
            <p className="text-gray-500">
              {searchTerm || selectedCourse 
                ? 'Try adjusting your search criteria' 
                : 'No students are assigned to your courses yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Add Remark Modal */}
      {showRemarkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Add Remark for {selectedStudent?.name}
              </h3>
              <button
                onClick={() => setShowRemarkModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remark Type
                </label>
                <select
                  value={remarkForm.remarkType}
                  onChange={(e) => setRemarkForm(prev => ({ ...prev, remarkType: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="General">General</option>
                  <option value="Behavior">Behavior</option>
                  <option value="Performance">Performance</option>
                  <option value="Attendance">Attendance</option>
                  <option value="Warning">Warning</option>
                  <option value="Appreciation">Appreciation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={remarkForm.title}
                  onChange={(e) => setRemarkForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief title for the remark"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={remarkForm.description}
                  onChange={(e) => setRemarkForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the remark"
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Severity
                </label>
                <select
                  value={remarkForm.severity}
                  onChange={(e) => setRemarkForm(prev => ({ ...prev, severity: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="followUp"
                  checked={remarkForm.followUpRequired}
                  onChange={(e) => setRemarkForm(prev => ({ ...prev, followUpRequired: e.target.checked }))}
                  className="mr-2"
                />
                <label htmlFor="followUp" className="text-sm text-gray-700">
                  Requires follow-up
                </label>
              </div>

              {remarkForm.followUpRequired && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={remarkForm.followUpDate}
                    onChange={(e) => setRemarkForm(prev => ({ ...prev, followUpDate: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddRemark}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Add Remark
              </button>
              <button
                onClick={() => setShowRemarkModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedStudentManagement;