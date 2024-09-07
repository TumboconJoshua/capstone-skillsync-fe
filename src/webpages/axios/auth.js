import axios from 'axios';

const handleApiResponse = (response) => {
  console.log(response.data);
};

const API_BASE_URL = 'http://localhost:8000/api';

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    handleApiResponse(response);
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    console.error('Login failed:', error.response.data);
  }
};

const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/logout`, null, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    handleApiResponse(response);
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Logout failed:', error.response.data);
  }
};

const BASE_URL = 'http://localhost:8000/api';

export { login, logout, BASE_URL };
// http://skill-sync-be.test/api