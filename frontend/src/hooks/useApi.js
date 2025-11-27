import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/api';
import Cookies from 'js-cookie';

export const useApi = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { immediate = true, method = 'GET', dependencies = [] } = options;

  const execute = async (customUrl = url, customOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get('token') || localStorage.getItem('token');
      const config = {
        method: customOptions.method || method,
        url: `${BASE_URL}${customUrl}`,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...customOptions.headers
        },
        ...customOptions
      };

      const response = await axios(config);
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate && url) {
      execute();
    }
  }, dependencies);

  return { data, loading, error, execute };
};

export const usePost = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const post = async (data, customUrl = url) => {
    try {
      setLoading(true);
      setError(null);

      const token = Cookies.get('token') || localStorage.getItem('token');
      const response = await axios.post(`${BASE_URL}${customUrl}`, data, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        }
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error };
};