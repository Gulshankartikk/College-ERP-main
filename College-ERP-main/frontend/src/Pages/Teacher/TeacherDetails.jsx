import React, { useEffect } from "react";
import TeacherNav from "../Teacher/TeacherNav";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTeacherDetails } from "../../features/TeacherSlice";
import { BiSolidUserCircle } from "react-icons/bi";
import { FaUser, FaGraduationCap, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

const TeacherDetails = () => {
  let teacherDetails = useSelector((state) => state.Teacher.teacherDetails);

  let dispatch = useDispatch();

  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchTeacherDetails(id));
  }, []);

  const teacher = teacherDetails?.data?.teacher;

  return (
    <>
      <div className="flex w-full bg-gray-50">
        <div className="fixed">
          <TeacherNav />
        </div>

        <div className="w-full lg:ps-[24%] xl:ps-[15%] min-h-[100vh] p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Teacher Details
            </h1>
            <p className="text-gray-600">View and manage teacher information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-6">
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
                  <h2 className="text-2xl font-bold text-gray-800">{teacher?.name}</h2>
                  <p className="text-gray-600">{teacher?.designation || 'Assistant Professor'}</p>
                  <p className="text-blue-600 font-medium">{teacher?.teacher_Id}</p>
                </div>

                {/* Quick Stats */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaGraduationCap className="text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-medium">{teacher?.department || 'Computer Science'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaBriefcase className="text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Experience</p>
                      <p className="font-medium">{teacher?.experience?.totalYears || '10'} years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FaMapMarkerAlt className="text-red-500" />
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-medium">{teacher?.address?.city || 'Not specified'}</p>
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
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Teacher ID
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.teacher_Id}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.phno}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.gender}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Qualification
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.qualification || 'Ph.D. in Computer Science'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.department || 'Computer Science'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Designation
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.designation || 'Assistant Professor'}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg">{teacher?.experience?.totalYears || '10'} years</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Role
                      </label>
                      <p className="p-3 bg-gray-50 rounded-lg capitalize">{teacher?.role}</p>
                    </div>
                  </div>
                </div>

                {/* Assigned Subjects & Courses */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Assigned Subjects & Courses</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Subjects</h5>
                      <div className="space-y-2">
                        {teacher?.assignedSubjects?.length > 0 ? (
                          teacher.assignedSubjects.map((subject, index) => (
                            <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                              <p className="font-medium">{subject.subject_name}</p>
                              <p className="text-sm text-gray-600">{subject.subject_code}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No subjects assigned</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 mb-2">Courses</h5>
                      <div className="space-y-2">
                        {teacher?.assignedCourses?.length > 0 ? (
                          teacher.assignedCourses.map((course, index) => (
                            <div key={index} className="p-2 bg-green-50 rounded border-l-4 border-green-500">
                              <p className="font-medium">{course.courseName}</p>
                              <p className="text-sm text-gray-600">{course.courseCode}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 italic">No courses assigned</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeacherDetails;
