import axios from "axios";

const baseURL = process.env.API_BASE_URL || "http://localhost:5001/api";

export const getAuthToken = async (): Promise<string> => {
  const response = await axios.post(`${baseURL}/auth/login`, {
    username: "user@yopmail.com",
    password: "password",
  });

  return response.data?.data?.token || response.data?.token;
};
