import api from '../../services/api';

const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

const authService = {
  login,
};

export default authService;
