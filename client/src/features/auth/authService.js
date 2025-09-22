import { api } from "../../api";

const login = (credentials) => {
  return api('/auth/login', {method: 'POST', body: credentials,});
};

const authService = {
  login,
};

export default authService;
