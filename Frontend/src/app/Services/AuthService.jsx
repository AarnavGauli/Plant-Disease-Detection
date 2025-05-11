import axios from "axios";

const URL = process.env.NEXT_PUBLIC_API_BASE;

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(`${URL}/login`, {
      username,
      password,
    });
    return response.data;
  },
  register: async (data) => {
    const response = await axios.post(`${URL}/register`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  },
};

export default AuthService;
