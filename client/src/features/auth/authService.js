import api from '../../services/api';

const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

const register = (userData) => {
  return api.post('/auth/register', userData);
};

const authService = {
  login,
  register,
};

export default authService;
