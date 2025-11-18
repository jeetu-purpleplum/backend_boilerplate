import axios from "axios";

const baseURL = process.env.API_BASE_URL || "http://localhost:5001/api";

const httpClient = axios.create({
  baseURL,
  validateStatus: () => true, // prevent throwing on non-2xx
  timeout: 10000,
});

export default httpClient;
