import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TeacherNav from './TeacherNav';
import { 
  FaUser, 
  FaEdit, 
  FaSave, 
  FaTimes, 
  FaCamera,
  FaGraduationCap,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../constants/baseUrl';
import { toast } from 'react-toastify';

const TeacherProfile = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchTeacherProfile();
  }, [id]);

  const fetchTeacherProfile = async () => {
    try {
      const response = await axios.get(`${baseUrl}/teacher/${id}/details`);
      if (response.data.success) {
        setTeacher(response.data.teacher);
        setFormData(response.data.teacher);
      }
    } catch (error) {
      console.error('Error fetching teacher profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${baseUrl}/teacher/${id}/profile`, formData);
      if (response.data.success) {
        setTeacher(response.data.teacher);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData(teacher);
    setIsEditing(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert to base64 or upload to cloud storage
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const response = await axios.put(`${baseUrl}/teacher/${id}/profile-photo`, {
            profilePhoto: reader.result
          });
          if (response.data.success) {
            setTeacher(prev => ({ ...prev, profilePhoto: response.data.profilePhoto }));
            toast.success('Profile photo updated successfully');
          }
        } catch (error) {
          console.error('Error uploading photo:', error);
          toast.error('Failed to upload photo');
        }
      };
      reader.readAsDataURL(file);
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
          <h1 className="text-4xl font-bold text-gray-800">Teacher Profile</h1>
          <div className="flex gap-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <FaEdit /> Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Photo & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {teacher?.profilePhoto ? (
                      <img 
                        src={teacher.profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-gray-400 text-4xl" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <FaCamera />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{teacher?.name}</h2>
                <p className="text-gray-600">{teacher?.designation}</p>
                <p className="text-blue-600">{teacher?.teacher_Id}</p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaGraduationCap className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{teacher?.department || 'Not specified'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FaBriefcase className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <p className="font-medium">{teacher?.experience?.totalYears || 0} years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                        <FaEnvelope className="text-gray-400" />
                        {teacher?.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phno"
                        value={formData.phno || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                        <FaPhone className="text-gray-400" />
                        {teacher?.phno}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    {isEditing ? (
                      <select
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.gender}</p>
                    )}
                  </div>
                </div>

                {/* Professional Details */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Ph.D. in Computer Science"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.qualification || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="department"
                        value={formData.department || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., Computer Science"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.department || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Designation
                    </label>
                    {isEditing ? (
                      <select
                        name="designation"
                        value={formData.designation || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Designation</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                        <option value="Professor">Professor</option>
                        <option value="Head of Department">Head of Department</option>
                        <option value="Dean">Dean</option>
                      </select>
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.designation || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Experience (Years)
                    </label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="experience.totalYears"
                        value={formData.experience?.totalYears || ''}
                        onChange={handleInputChange}
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.experience?.totalYears || 0} years</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.street"
                        value={formData.address?.street || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.address?.street || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.city"
                        value={formData.address?.city || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.address?.city || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.state"
                        value={formData.address?.state || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.address?.state || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pincode
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address.pincode"
                        value={formData.address?.pincode || ''}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.address?.pincode || 'Not specified'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Previous Courses Section */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Previous Courses Taught</h4>
                {isEditing ? (
                  <div className="space-y-4">
                    {(formData.experience?.previousCourses || []).map((course, index) => (
                      <div key={index} className="p-4 border border-gray-300 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Course Name"
                            value={course.courseName || ''}
                            onChange={(e) => {
                              const newCourses = [...(formData.experience?.previousCourses || [])];
                              newCourses[index] = { ...newCourses[index], courseName: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                experience: { ...prev.experience, previousCourses: newCourses }
                              }));
                            }}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Course Code"
                            value={course.courseCode || ''}
                            onChange={(e) => {
                              const newCourses = [...(formData.experience?.previousCourses || [])];
                              newCourses[index] = { ...newCourses[index], courseCode: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                experience: { ...prev.experience, previousCourses: newCourses }
                              }));
                            }}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Institution"
                            value={course.institution || ''}
                            onChange={(e) => {
                              const newCourses = [...(formData.experience?.previousCourses || [])];
                              newCourses[index] = { ...newCourses[index], institution: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                experience: { ...prev.experience, previousCourses: newCourses }
                              }));
                            }}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Year Taught"
                            value={course.yearTaught || ''}
                            onChange={(e) => {
                              const newCourses = [...(formData.experience?.previousCourses || [])];
                              newCourses[index] = { ...newCourses[index], yearTaught: e.target.value };
                              setFormData(prev => ({
                                ...prev,
                                experience: { ...prev.experience, previousCourses: newCourses }
                              }));
                            }}
                            className="p-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <button
                          onClick={() => {
                            const newCourses = (formData.experience?.previousCourses || []).filter((_, i) => i !== index);
                            setFormData(prev => ({
                              ...prev,
                              experience: { ...prev.experience, previousCourses: newCourses }
                            }));
                          }}
                          className="mt-2 text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Course
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const newCourse = { courseName: '', courseCode: '', institution: '', yearTaught: '' };
                        const newCourses = [...(formData.experience?.previousCourses || []), newCourse];
                        setFormData(prev => ({
                          ...prev,
                          experience: { ...prev.experience, previousCourses: newCourses }
                        }));
                      }}
                      className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600"
                    >
                      + Add Previous Course
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teacher?.experience?.previousCourses?.length > 0 ? (
                      teacher.experience.previousCourses.map((course, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-800">{course.courseName}</h5>
                            <span className="text-sm text-blue-600">{course.courseCode}</span>
                          </div>
                          <p className="text-sm text-gray-600">{course.institution}</p>
                          <p className="text-sm text-gray-500">Year: {course.yearTaught}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 italic">No previous courses added</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;