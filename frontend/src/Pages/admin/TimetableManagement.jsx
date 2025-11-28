import React, { useState } from 'react';
import { FaCalendarAlt, FaPlus, FaClock, FaEdit, FaDownload, FaTimes, FaEye, FaSearch, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';
import AdminHeader from '../../components/AdminHeader';
import BackButton from '../../components/BackButton';

const TimetableManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState('Computer Science');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const timeSlots = ['9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00', '2:00-3:00', '3:00-4:00', '4:00-5:00'];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const [timetableData, setTimetableData] = useState({
    'Computer Science': {
      'Monday': [
        { subject: 'Mathematics', teacher: 'Dr. Gulshan kumar', room: 'Room 101' },
        { subject: 'Physics', teacher: 'Prof. sandy', room: 'Room 102' },
        { subject: 'Programming', teacher: 'Dr. pinky', room: 'Lab 1' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Data Structures', teacher: 'Dr. ankita', room: 'Room 103' },
        { subject: 'Lab', teacher: 'Dr. aditya', room: 'Lab 1' },
        { subject: 'Lab', teacher: 'Dr. krishna', room: 'Lab 1' }
      ],
      'Tuesday': [
        { subject: 'English', teacher: 'Ms. ankita', room: 'Room 201' },
        { subject: 'Mathematics', teacher: 'Dr. Gulshan kumar', room: 'Room 101' },
        { subject: 'Physics', teacher: 'Prof. sandy', room: 'Room 102' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Programming', teacher: 'Dr. rajan', room: 'Lab 1' },
        { subject: 'Workshop', teacher: 'Prof. raju', room: 'Workshop' },
        { subject: 'Workshop', teacher: 'Prof. dilip', room: 'Workshop' }
      ],
      'Wednesday': [
        { subject: 'Physics', teacher: 'Prof. sandy', room: 'Room 102' },
        { subject: 'Mathematics', teacher: 'Dr. krishna', room: 'Room 101' },
        { subject: 'English', teacher: 'Ms. abhishek', room: 'Room 201' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Database', teacher: 'Prof. aditya', room: 'Room 104' },
        { subject: 'Lab', teacher: 'Prof. aditya', room: 'Lab 2' },
        { subject: 'Lab', teacher: 'Prof. aditya', room: 'Lab 2' }
      ],
      'Thursday': [
        { subject: 'Programming', teacher: 'Dr. pinky', room: 'Lab 1' },
        { subject: 'Physics', teacher: 'Prof. sandy', room: 'Room 102' },
        { subject: 'Mathematics', teacher: 'Dr. krishna', room: 'Room 101' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Networks', teacher: 'Dr. aditya', room: 'Room 105' },
        { subject: 'Theory', teacher: 'Dr. aditya', room: 'Room 105' },
        { subject: 'Theory', teacher: 'Dr. aditya', room: 'Room 105' }
      ],
      'Friday': [
        { subject: 'Database', teacher: 'Prof. aditya', room: 'Room 104' },
        { subject: 'English', teacher: 'Ms. abhishek', room: 'Room 201' },
        { subject: 'Programming', teacher: 'Dr. pinky', room: 'Lab 1' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Project', teacher: 'All Faculty', room: 'Project Hall' },
        { subject: 'Project', teacher: 'All Faculty', room: 'Project Hall' },
        { subject: 'Project', teacher: 'All Faculty', room: 'Project Hall' }
      ],
      'Saturday': [
        { subject: 'Mathematics', teacher: 'Dr. ', room: 'Room 101' },
        { subject: 'Physics', teacher: 'Prof. sandy', room: 'Room 102' },
        { subject: 'English', teacher: 'Ms. abhishek', room: 'Room 201' },
        { subject: 'Lunch', teacher: '', room: '' },
        { subject: 'Seminar', teacher: 'Guest Faculty', room: 'Auditorium' },
        { subject: 'Library', teacher: 'Librarian', room: 'Library' },
        { subject: 'Sports', teacher: 'Sports Teacher', room: 'Ground' }
      ]
    }
  });

  const courses = ['Computer Science', 'Mechanical Engineering', 'Business Administration'];
  const subjects = ['Mathematics', 'Physics', 'Programming', 'Database', 'Networks', 'English', 'Workshop', 'Lab', 'Project', 'Seminar', 'Library', 'Sports'];
  const teachers = ['Dr. ', 'Prof. sandy', 'Dr. pinky', 'Prof. raju', 'Prof. dilip', 'Ms. abhishek'];
  const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104', 'Room 105', 'Room 201', 'Lab 1', 'Lab 2', 'Workshop', 'Auditorium', 'Library', 'Ground'];

  const [newSlot, setNewSlot] = useState({
    subject: '', teacher: '', room: '', day: '', time: ''
  });

  const exportTimetable = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Day,Time,Subject,Teacher,Room\n" +
      days.flatMap(day => 
        timeSlots.map((time, index) => {
          const slot = timetableData[selectedCourse]?.[day]?.[index];
          return `${day},${time},${slot?.subject || ''},${slot?.teacher || ''},${slot?.room || ''}`;
        })
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `timetable_${selectedCourse.replace(' ', '_')}_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createSlot = () => {
    alert('Timetable slot created successfully!');
    setShowCreateModal(false);
    setNewSlot({ subject: '', teacher: '', room: '', day: '', time: '' });
  };

  const editSlot = (day, timeIndex) => {
    const slot = timetableData[selectedCourse]?.[day]?.[timeIndex];
    setSelectedSlot({ ...slot, day, timeIndex });
    setShowEditModal(true);
  };

  const saveEditedSlot = () => {
    alert('Timetable slot updated successfully!');
    setShowEditModal(false);
  };

  const viewSlotDetails = (day, timeIndex) => {
    const slot = timetableData[selectedCourse]?.[day]?.[timeIndex];
    setSelectedSlot({ ...slot, day, timeIndex, time: timeSlots[timeIndex] });
    setShowDetailsModal(true);
  };

  const getSlotStats = () => {
    const allSlots = days.flatMap(day => 
      timetableData[selectedCourse]?.[day] || []
    );
    
    return {
      totalClasses: allSlots.filter(slot => slot.subject && slot.subject !== 'Lunch').length,
      labSessions: allSlots.filter(slot => slot.subject === 'Lab' || slot.subject === 'Workshop').length,
      freePeriods: allSlots.filter(slot => !slot.subject || slot.subject === '').length,
      uniqueSubjects: [...new Set(allSlots.map(slot => slot.subject).filter(s => s && s !== 'Lunch'))].length
    };
  };

  const stats = getSlotStats();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <BackButton />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Timetable Management</h1>
            <p className="text-gray-600">Create and manage class schedules</p>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={exportTimetable}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              <FaDownload />
              <span>Export PDF</span>
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaPlus />
              <span>Add Slot</span>
            </button>
          </div>
        </div>

        {/* Course Selection and Search */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Course</label>
              <select 
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subjects, teachers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-end">
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                <FaEdit />
                <span>Bulk Edit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaCalendarAlt className="text-3xl text-blue-500 mr-4" />
              <div>
                <p className="text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold">{stats.totalClasses}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaClock className="text-3xl text-green-500 mr-4" />
              <div>
                <p className="text-gray-600">Lab Sessions</p>
                <p className="text-2xl font-bold">{stats.labSessions}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaUsers className="text-3xl text-purple-500 mr-4" />
              <div>
                <p className="text-gray-600">Subjects</p>
                <p className="text-2xl font-bold">{stats.uniqueSubjects}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FaChalkboardTeacher className="text-3xl text-orange-500 mr-4" />
              <div>
                <p className="text-gray-600">Free Periods</p>
                <p className="text-2xl font-bold">{stats.freePeriods}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-xl font-bold text-gray-800">{selectedCourse} - Weekly Timetable</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-700 border-r">Time</th>
                  {days.map(day => (
                    <th key={day} className="px-4 py-3 text-center font-medium text-gray-700 border-r min-w-32">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time, timeIndex) => (
                  <tr key={time} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-700 border-r bg-gray-50">
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-blue-500" />
                        {time}
                      </div>
                    </td>
                    {days.map(day => {
                      const slot = timetableData[selectedCourse]?.[day]?.[timeIndex];
                      const isLunch = slot?.subject === 'Lunch';
                      const isLab = slot?.subject === 'Lab' || slot?.subject === 'Workshop';
                      const isProject = slot?.subject === 'Project';
                      
                      return (
                        <td key={day} className="px-2 py-3 border-r text-center">
                          {slot?.subject && (
                            <div 
                              onClick={() => viewSlotDetails(day, timeIndex)}
                              className={`p-2 rounded text-sm font-medium cursor-pointer hover:opacity-80 ${
                                isLunch ? 'bg-orange-100 text-orange-800' :
                                isLab ? 'bg-purple-100 text-purple-800' :
                                isProject ? 'bg-green-100 text-green-800' :
                                'bg-blue-100 text-blue-800'
                              }`}
                            >
                              <div className="font-semibold">{slot.subject}</div>
                              {slot.teacher && (
                                <div className="text-xs opacity-75">{slot.teacher}</div>
                              )}
                              {slot.room && (
                                <div className="text-xs opacity-75">{slot.room}</div>
                              )}
                            </div>
                          )}
                          {!slot?.subject && (
                            <button
                              onClick={() => editSlot(day, timeIndex)}
                              className="w-full h-16 border-2 border-dashed border-gray-300 rounded text-gray-400 hover:border-blue-400 hover:text-blue-400"
                            >
                              <FaPlus />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Create Slot Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add Timetable Slot</h2>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Day</label>
                  <select
                    value={newSlot.day}
                    onChange={(e) => setNewSlot({...newSlot, day: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Day</option>
                    {days.map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
                  <select
                    value={newSlot.time}
                    onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={newSlot.subject}
                    onChange={(e) => setNewSlot({...newSlot, subject: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <select
                    value={newSlot.teacher}
                    onChange={(e) => setNewSlot({...newSlot, teacher: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <select
                    value={newSlot.room}
                    onChange={(e) => setNewSlot({...newSlot, room: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={createSlot}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Slot
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Details Modal */}
        {showDetailsModal && selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Slot Details</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Schedule Information</h3>
                  <p><strong>Day:</strong> {selectedSlot.day}</p>
                  <p><strong>Time:</strong> {selectedSlot.time}</p>
                  <p><strong>Subject:</strong> {selectedSlot.subject}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Assignment Details</h3>
                  <p><strong>Teacher:</strong> {selectedSlot.teacher || 'Not assigned'}</p>
                  <p><strong>Room:</strong> {selectedSlot.room || 'Not assigned'}</p>
                  <p><strong>Course:</strong> {selectedCourse}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => {
                    setShowDetailsModal(false);
                    setShowEditModal(true);
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Edit Slot
                </button>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Slot Modal */}
        {showEditModal && selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Timetable Slot</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={selectedSlot.subject}
                    onChange={(e) => setSelectedSlot({...selectedSlot, subject: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Teacher</label>
                  <select
                    value={selectedSlot.teacher}
                    onChange={(e) => setSelectedSlot({...selectedSlot, teacher: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map(teacher => (
                      <option key={teacher} value={teacher}>{teacher}</option>
                    ))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Room</label>
                  <select
                    value={selectedSlot.room}
                    onChange={(e) => setSelectedSlot({...selectedSlot, room: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Room</option>
                    {rooms.map(room => (
                      <option key={room} value={room}>{room}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveEditedSlot}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimetableManagement;