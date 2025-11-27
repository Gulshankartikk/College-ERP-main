import axios from 'axios';
import { BASE_URL } from '../constants/api';

class AuthService {
  async login(credentials, role) {
    const endpoint = role === 'student' ? '/api/student/login' :
                    role === 'teacher' ? '/api/teacher/login' :
                    '/api/admin/login';
    
    const response = await axios.post(`${BASE_URL}${endpoint}`, credentials);
    return response.data;
  }

  async register(userData, role) {
    const endpoint = role === 'student' ? '/api/student/register' :
                    role === 'teacher' ? '/api/teacher/register' :
                    '/api/admin/register';
    
    const response = await axios.post(`${BASE_URL}${endpoint}`, userData);
    return response.data;
  }

  async forgotPassword(email, role) {
    const endpoint = `/api/${role}/forgot-password`;
    const response = await axios.post(`${BASE_URL}${endpoint}`, { email });
    return response.data;
  }

  async resetPassword(token, newPassword, role) {
    const endpoint = `/api/${role}/reset-password`;
    const response = await axios.post(`${BASE_URL}${endpoint}`, { token, password: newPassword });
    return response.data;
  }

  async verifyOtp(otp, email, role) {
    const endpoint = `/api/${role}/verify-otp`;
    const response = await axios.post(`${BASE_URL}${endpoint}`, { otp, email });
    return response.data;
  }

  async updatePassword(currentPassword, newPassword, userId, role) {
    const endpoint = `/api/${role}/${userId}/update-password`;
    const response = await axios.put(`${BASE_URL}${endpoint}`, {
      currentPassword,
      newPassword
    });
    return response.data;
  }
}

export default new AuthService();