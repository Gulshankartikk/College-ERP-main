import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../constants/baseUrl';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { 
  FaGraduationCap, 
  FaBook, 
  FaUsers, 
  FaMoneyBillWave,
  FaUpload,
  FaPlus,
  FaTrash
} from 'react-icons/fa';

const EnhancedAddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  
  const [courseData, setCourseData] = useState({
    // Basic Details
    courseName: '',
    courseCode: '',
    courseType: 'UG',
    duration: '',
    durationYears: 1,
    totalSemesters: 2,
    department: 'CSE',
    
    // Description
    description: '',
    courseObjective: '',
    learningOutcomes: [''],
    careerOpportunities: [''],
    
    // Eligibility
    eligibility: {
      minimumQualification: '',
      entranceExam: {
        required: false,
        examName: ''
      },
      ageLimit: {
        min: '',
        max: ''
      }
    },
    
    // Fees
    fees: {
      yearlyFees: '',
      admissionFees: '',
      transportFees: '',
      hostelFees: ''
    },
    
    // Subjects by Semester
    semesterWiseSubjects: [],
    
    // Capacity
    maxStudents: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/teacher`);
      if (response.data.success) {
        setTeachers(response.data.teachers);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setCourseData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setCourseData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleNestedChange = (parent, child, subChild, value) => {
    setCourseData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: {
          ...prev[parent][child],
          [subChild]: value
        }
      }
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setCourseData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const addSemester = () => {
    const newSemester = {
      semester: courseData.semesterWiseSubjects.length + 1,
      subjectList: []
    };
    setCourseData(prev => ({
      ...prev,
      semesterWiseSubjects: [...prev.semesterWiseSubjects, newSemester]
    }));
  };

  const addSubjectToSemester = (semesterIndex) => {
    const newSubject = {
      name: '',
      code: '',
      type: 'Theory',
      credits: 1,
      assignedTeacher: ''
    };
    
    setCourseData(prev => ({
      ...prev,
      semesterWiseSubjects: prev.semesterWiseSubjects.map((sem, index) => 
        index === semesterIndex 
          ? { ...sem, subjectList: [...sem.subjectList, newSubject] }
          : sem
      )
    }));
  };

  const updateSubject = (semesterIndex, subjectIndex, field, value) => {
    setCourseData(prev => ({
      ...prev,
      semesterWiseSubjects: prev.semesterWiseSubjects.map((sem, sIndex) => 
        sIndex === semesterIndex 
          ? {
              ...sem,
              subjectList: sem.subjectList.map((subject, subIndex) =>
                subIndex === subjectIndex ? { ...subject, [field]: value } : subject
              )
            }
          : sem
      )
    }));
  };

  const removeSubject = (semesterIndex, subjectIndex) => {
    setCourseData(prev => ({
      ...prev,
      semesterWiseSubjects: prev.semesterWiseSubjects.map((sem, sIndex) => 
        sIndex === semesterIndex 
          ? {
              ...sem,
              subjectList: sem.subjectList.filter((_, subIndex) => subIndex !== subjectIndex)
            }
          : sem
      )
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare simplified data
      const finalData = {
        courseName: courseData.courseName,
        courseCode: courseData.courseCode,
        courseType: courseData.courseType,
        duration: `${courseData.durationYears} Years`,
        durationYears: courseData.durationYears,
        totalSemesters: courseData.totalSemesters,
        department: courseData.department,
        description: courseData.description,
        semesterWiseSubjects: courseData.semesterWiseSubjects,
        maxStudents: courseData.maxStudents || 60
      };

      const token = Cookies.get('token');
      const response = await axios.post(`${BASE_URL}/course-module/create`, finalData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        toast.success('Course created successfully!');
        navigate('/admin/courses');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      const errorMsg = error.response?.data?.msg || error.message || 'Failed to create course';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-8">
            <FaGraduationCap className="text-blue-500 text-3xl mr-4" />
            <h1 className="text-3xl font-bold text-gray-800">Add New Course</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaBook className="mr-2" /> Basic Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    value={courseData.courseName}
                    onChange={handleInputChange}
                    placeholder="e.g., B.Tech Computer Science"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    value={courseData.courseCode}
                    onChange={handleInputChange}
                    placeholder="e.g., CSE-BTECH"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Type *
                  </label>
                  <select
                    name="courseType"
                    value={courseData.courseType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="UG">Undergraduate (UG)</option>
                    <option value="PG">Postgraduate (PG)</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Certificate">Certificate</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <select
                    name="department"
                    value={courseData.department}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="CSE">Computer Science & Engineering</option>
                    <option value="ECE">Electronics & Communication</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Management">Management</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration Years *
                  </label>
                  <input
                    type="number"
                    name="durationYears"
                    value={courseData.durationYears}
                    onChange={handleInputChange}
                    min="1"
                    max="6"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Semesters *
                  </label>
                  <input
                    type="number"
                    name="totalSemesters"
                    value={courseData.totalSemesters}
                    onChange={handleInputChange}
                    min="1"
                    max="12"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Description</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description
                  </label>
                  <textarea
                    name="description"
                    value={courseData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Brief overview of the course"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Objective
                  </label>
                  <textarea
                    name="courseObjective"
                    value={courseData.courseObjective}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Main objectives of this course"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Fees Structure */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaMoneyBillWave className="mr-2" /> Fees Structure
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Yearly Fees (₹)
                  </label>
                  <input
                    type="number"
                    name="fees.yearlyFees"
                    value={courseData.fees.yearlyFees}
                    onChange={handleInputChange}
                    placeholder="50000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admission Fees (₹)
                  </label>
                  <input
                    type="number"
                    name="fees.admissionFees"
                    value={courseData.fees.admissionFees}
                    onChange={handleInputChange}
                    placeholder="10000"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Semester-wise Subjects */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Semester-wise Subjects</h2>
                <button
                  type="button"
                  onClick={addSemester}
                  className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  <FaPlus /> Add Semester
                </button>
              </div>
              
              {courseData.semesterWiseSubjects.map((semester, semIndex) => (
                <div key={semIndex} className="mb-6 p-4 bg-white rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Semester {semester.semester}</h3>
                    <button
                      type="button"
                      onClick={() => addSubjectToSemester(semIndex)}
                      className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                    >
                      <FaPlus /> Add Subject
                    </button>
                  </div>
                  
                  {semester.subjectList.map((subject, subIndex) => (
                    <div key={subIndex} className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3 p-3 bg-gray-50 rounded">
                      <input
                        type="text"
                        placeholder="Subject Name"
                        value={subject.name}
                        onChange={(e) => updateSubject(semIndex, subIndex, 'name', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Subject Code"
                        value={subject.code}
                        onChange={(e) => updateSubject(semIndex, subIndex, 'code', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      />
                      <select
                        value={subject.type}
                        onChange={(e) => updateSubject(semIndex, subIndex, 'type', e.target.value)}
                        className="p-2 border border-gray-300 rounded"
                      >
                        <option value="Theory">Theory</option>
                        <option value="Lab">Lab</option>
                        <option value="Practical">Practical</option>
                        <option value="Elective">Elective</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Credits"
                        value={subject.credits}
                        onChange={(e) => updateSubject(semIndex, subIndex, 'credits', parseInt(e.target.value))}
                        min="1"
                        max="6"
                        className="p-2 border border-gray-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSubject(semIndex, subIndex)}
                        className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => navigate('/admin/courses')}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Course'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnhancedAddCourse;