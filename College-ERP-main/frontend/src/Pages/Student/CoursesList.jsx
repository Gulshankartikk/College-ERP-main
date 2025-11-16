import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StudentNav from './StudentNav';
import axios from 'axios';
import { BASE_URL } from '../../constants/baseUrl';
import { FaBook, FaUsers, FaClock, FaGraduationCap, FaMoneyBillWave } from 'react-icons/fa';

const CoursesList = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/course-module/`);
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex w-full">
        <div className="fixed"><StudentNav /></div>
        <div className="w-full lg:ps-[24%] xl:ps-[15%] min-h-[100vh] flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full bg-gray-50">
      <div className="fixed"><StudentNav /></div>
      <div className="w-full lg:ps-[24%] xl:ps-[15%] min-h-[100vh] p-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Available Courses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-blue-500 text-2xl mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{course.courseName}</h3>
                  <p className="text-gray-600">{course.courseCode}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaBook className="mr-2" />
                  <span>{course.department}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaClock className="mr-2" />
                  <span>{course.duration} • {course.totalSemesters} Semesters</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaUsers className="mr-2" />
                  <span>{course.currentStudents || 0}/{course.maxStudents || 'N/A'} Students</span>
                </div>
                {course.fees?.yearlyFees && (
                  <div className="flex items-center text-gray-600">
                    <FaMoneyBillWave className="mr-2" />
                    <span>₹{course.fees.yearlyFees}/year</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  course.courseType === 'UG' ? 'bg-blue-100 text-blue-800' :
                  course.courseType === 'PG' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {course.courseType}
                </span>
              </div>
              
              {course.description && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{course.description}</p>
              )}
              
              {course.semesterWiseSubjects?.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-500">
                    {course.semesterWiseSubjects.reduce((total, sem) => total + sem.subjectList.length, 0)} Subjects
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {courses.length === 0 && (
          <div className="text-center py-12">
            <FaBook className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No Courses Available</h3>
            <p className="text-gray-500">Courses will appear here once added by admin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesList;