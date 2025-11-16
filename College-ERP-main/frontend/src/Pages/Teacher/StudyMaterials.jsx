import React, { useState, useEffect } from "react";
import TeacherNav from "./TeacherNav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const StudyMaterials = () => {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [materialType, setMaterialType] = useState("syllabus");
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [materials, setMaterials] = useState([]);

  const token = Cookies.get("token");

  useEffect(() => {
    fetchCourses();
    fetchMaterials();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCourses(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/materials/teacher/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMaterials(response.data.materials || []);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadMaterial = async () => {
    if (!materialTitle.trim() || !selectedCourse) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title", materialTitle);
    formData.append("description", materialDescription);
    formData.append("type", materialType);
    formData.append("courseId", selectedCourse);
    formData.append("teacherId", id);
    
    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await axios.post(`${BASE_URL}/materials/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Material uploaded successfully");
      setMaterialTitle("");
      setMaterialDescription("");
      setSelectedFile(null);
      document.getElementById("fileInput").value = "";
      fetchMaterials();
    } catch (error) {
      console.error("Error uploading material:", error);
      toast.error("Failed to upload material");
    }
  };

  const deleteMaterial = async (materialId) => {
    try {
      await axios.delete(`${BASE_URL}/materials/${materialId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success("Material deleted successfully");
      fetchMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
      toast.error("Failed to delete material");
    }
  };

  const getMaterialTypeColor = (type) => {
    const colors = {
      syllabus: "bg-blue-100 text-blue-800",
      lecture: "bg-green-100 text-green-800",
      assignment: "bg-yellow-100 text-yellow-800",
      lab: "bg-purple-100 text-purple-800",
      reference: "bg-gray-100 text-gray-800"
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex w-full">
      <div className="fixed">
        <TeacherNav />
      </div>
      <div className="min-h-[100vh] w-full lg:ps-[24%] xl:ps-[22%] 2xl:ps-[15%]">
        <h1 className="text-center font-oswald font-bold text-5xl md:text-8xl my-9">
          Study Materials
        </h1>
        
        <div className="px-10 py-5">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Upload New Material</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <select
                value={materialType}
                onChange={(e) => setMaterialType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="syllabus">Syllabus</option>
                <option value="lecture">Lecture Notes</option>
                <option value="assignment">Assignment</option>
                <option value="lab">Lab Instructions</option>
                <option value="reference">Reference Material</option>
              </select>
              
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded px-3 py-2"
              >
                <option value="">Select Course</option>
                {courses.map(course => (
                  <option key={course._id} value={course._id}>
                    {course.courseName}
                  </option>
                ))}
              </select>
            </div>
            
            <input
              type="text"
              value={materialTitle}
              onChange={(e) => setMaterialTitle(e.target.value)}
              placeholder="Material Title"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            
            <textarea
              value={materialDescription}
              onChange={(e) => setMaterialDescription(e.target.value)}
              placeholder="Material Description"
              className="w-full border rounded px-3 py-2 h-24 mb-4"
            />
            
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
              className="w-full border rounded px-3 py-2 mb-4"
            />
            
            <button
              onClick={uploadMaterial}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Upload Material
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4 bg-gray-50 border-b">
              <h3 className="text-lg font-semibold">My Study Materials</h3>
            </div>
            
            <div className="p-6">
              {materials.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No materials uploaded yet</p>
              ) : (
                <div className="grid gap-4">
                  {materials.map((material, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{material.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMaterialTypeColor(material.type)}`}>
                            {material.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">
                            {new Date(material.uploadedAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => deleteMaterial(material._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-sm bg-blue-100 px-2 py-1 rounded">
                          {material.courseName}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-2">{material.description}</p>
                      
                      {material.fileName && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">File:</span>
                          <a
                            href={material.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700 text-sm"
                          >
                            {material.fileName}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyMaterials;