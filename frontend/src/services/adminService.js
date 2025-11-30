import axios from 'axios';
import { BASE_URL } from '../constants/api';
import Cookies from 'js-cookie';

class AdminService {
  getAuthHeaders() {
    const token = Cookies.get('token') || localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  // Dashboard
  async getDashboard() {
    const response = await axios.get(`${BASE_URL}/api/admin/dashboard`, this.getAuthHeaders());
    return response.data;
  }

  // Course Management
  async getCourses() {
    const response = await axios.get(`${BASE_URL}/api/admin/courses`, this.getAuthHeaders());
    return response.data;
  }

  async createCourse(courseData) {
    const response = await axios.post(`${BASE_URL}/api/admin/courses`, courseData, this.getAuthHeaders());
    return response.data;
  }

  async updateCourse(courseId, courseData) {
    const response = await axios.put(`${BASE_URL}/api/admin/courses/${courseId}`, courseData, this.getAuthHeaders());
    return response.data;
  }

  async deleteCourse(courseId) {
    const response = await axios.delete(`${BASE_URL}/api/admin/courses/${courseId}`, this.getAuthHeaders());
    return response.data;
  }

  // Subject Management
  async getSubjects() {
    const response = await axios.get(`${BASE_URL}/api/admin/subjects`, this.getAuthHeaders());
    return response.data;
  }

  async createSubject(subjectData) {
    const response = await axios.post(`${BASE_URL}/api/admin/subjects`, subjectData, this.getAuthHeaders());
    return response.data;
  }

  // Teacher Management
  async getTeachers() {
    const response = await axios.get(`${BASE_URL}/api/admin/teachers`, this.getAuthHeaders());
    return response.data;
  }

  async createTeacher(teacherData) {
    const response = await axios.post(`${BASE_URL}/api/admin/teachers`, teacherData, this.getAuthHeaders());
    return response.data;
  }

  async updateTeacher(teacherId, teacherData) {
    const response = await axios.put(`${BASE_URL}/api/admin/teachers/${teacherId}`, teacherData, this.getAuthHeaders());
    return response.data;
  }

  async deleteTeacher(teacherId) {
    const response = await axios.delete(`${BASE_URL}/api/admin/teachers/${teacherId}`, this.getAuthHeaders());
    return response.data;
  }

  // Student Management
  async getStudents() {
    const response = await axios.get(`${BASE_URL}/api/admin/students`, this.getAuthHeaders());
    return response.data;
  }

  async createStudent(studentData) {
    const response = await axios.post(`${BASE_URL}/api/admin/students`, studentData, this.getAuthHeaders());
    return response.data;
  }

  async updateStudent(studentId, studentData) {
    const response = await axios.put(`${BASE_URL}/api/admin/students/${studentId}`, studentData, this.getAuthHeaders());
    return response.data;
  }

  async deleteStudent(studentId) {
    const response = await axios.delete(`${BASE_URL}/api/admin/students/${studentId}`, this.getAuthHeaders());
    return response.data;
  }

  // Reports
  async generateReport(reportType, filters = {}) {
    let url = `${BASE_URL}/api/admin/reports/${reportType}`;

    // Handle special case for attendance report
    if (reportType === 'attendance') {
      url = `${BASE_URL}/api/admin/attendance-report`;
    }

    const config = {
      ...this.getAuthHeaders(),
      params: filters
    };

    const response = await axios.get(url, config);
    return response.data;
  }

  // Settings
  async getSettings() {
    const response = await axios.get(`${BASE_URL}/api/admin/settings`, this.getAuthHeaders());
    return response.data;
  }

  async updateSettings(settings) {
    const response = await axios.put(`${BASE_URL}/api/admin/settings`, settings, this.getAuthHeaders());
    return response.data;
  }
}

export default new AdminService();