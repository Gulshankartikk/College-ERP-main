import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants/baseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loader from "../Common/loader/Loader";
import BackButton from "../../components/back";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    courseCode: "",
    duration: "",
    totalSemesters: "",
    description: "",
    department: "",
    courseType: "Full-Time"
  });

  const courseTypes = ["Full-Time", "Part-Time", "Distance", "Diploma"];
  const departments = ["CSE", "ECE", "MECH", "CIVIL", "EEE", "IT", "Management", "Commerce", "Arts"];
  const durationOptions = ["1 Year", "2 Years", "3 Years", "4 Years", "5 Years"];
  const semesterOptions = [2, 4, 6, 8, 10];

  const [imageLoaded, setImageLoaded] = useState(true);

  // Change handler for course name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("token")}`,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.courseName || !formData.courseCode || !formData.duration || !formData.totalSemesters) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/courses/addCourse`,
        formData,
        { headers }
      );

      // Log the response to debug
      console.log("Server response:", response.data);

      toast.success("Course Added Successfully");

      // Reset form fields after submission
      setFormData({
        courseName: "",
        courseCode: "",
        duration: "",
        totalSemesters: "",
        description: "",
        department: "",
        courseType: "Full-Time"
      });
    } catch (err) {
      console.error("Error details:", err);
      if (err.response) {
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        toast.error(err.response.data.msg || "Failed to add course");
      } else if (err.request) {
        console.error('No response received:', err.request);
        toast.error("No response from server");
      } else {
        console.error('Error message:', err.message);
        toast.error("Network error");
      }
    }
  };



  return (
    <div className="flex flex-col w-full min-h-[100vh] bg-blue-400 pb-10">
      <div className="ms-5 mt-5 xl:mt-0 xl:">
        <BackButton targetRoute={"/admin/adminPanel"} />
      </div>

      <div className="text-white flex items-center justify-center py-11">
        <h1 className="font-extrabold text-5xl md:text-8xl text-center overflow-hidden">
          Add Course
        </h1>
      </div>
      <div className="w-full flex justify-center px-5 lg:px-44">
        <form
          method="post"
          className="bg-white flex flex-col gap-3 justify-evenly py-10 w-full md:w-[40vw] px-20 border-2 border-black rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex justify-center items-center">
            <div className="flex items-center justify-center w-52">
              <img
                src="/src/assets/dr-ambedkar-institute-of-technology-for-handicapped-kanpur.jpeg.jpg"
                alt="logo"
                className="w-full"
              />
            </div>
          </div>

          {/* Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Course Name * 
                <span className="text-sm font-normal text-gray-500">(Full Name)</span>
              </label>
              <input
                type="text"
                name="courseName"
                placeholder="e.g., Bachelor of Technology, B.Tech, BCA, MBA"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.courseName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Course Code * 
                <span className="text-sm font-normal text-gray-500">(Unique)</span>
              </label>
              <input
                type="text"
                name="courseCode"
                placeholder="e.g., BTECH, BCA01, MBA2025"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.courseCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Duration *
              </label>
              <select
                name="duration"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.duration}
                onChange={handleChange}
                required
              >
                <option value="">Select Duration</option>
                {durationOptions.map(duration => (
                  <option key={duration} value={duration}>{duration}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="block text-gray-700 font-bold mb-2">
                Total Semesters *
              </label>
              <select
                name="totalSemesters"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                value={formData.totalSemesters}
                onChange={handleChange}
                required
              >
                <option value="">Select Semesters</option>
                {semesterOptions.map(sem => (
                  <option key={sem} value={sem}>{sem} Semesters</option>
                ))}
              </select>
            </div>
          </div>

          {/* Optional Fields */}
          <div className="border-t pt-4 mt-4">
            <h3 className="text-gray-700 font-bold mb-4">Optional Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Department</label>
                <select
                  name="department"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-2">Course Type</label>
                <select
                  name="courseType"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline"
                  value={formData.courseType}
                  onChange={handleChange}
                >
                  {courseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col mt-4">
              <label className="block text-gray-700 font-bold mb-2">Description</label>
              <textarea
                name="description"
                placeholder="e.g., A 4-year undergraduate engineering program"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-2 focus:shadow-outline h-20"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Course Preview */}
          {formData.courseName && formData.courseCode && (
            <div className="border-t pt-4 mt-4 bg-gray-50 p-4 rounded">
              <h3 className="font-bold text-gray-700 mb-2">Course Preview:</h3>
              <div className="text-sm text-gray-600">
                <p><strong>Course:</strong> {formData.courseName} ({formData.courseCode})</p>
                <p><strong>Duration:</strong> {formData.duration} ({formData.totalSemesters} Semesters)</p>
                {formData.department && <p><strong>Department:</strong> {formData.department}</p>}
                <p><strong>Type:</strong> {formData.courseType}</p>
                {formData.description && <p><strong>Description:</strong> {formData.description}</p>}
              </div>
            </div>
          )}

          <div className="flex justify-center mt-4 w-[100%]">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
