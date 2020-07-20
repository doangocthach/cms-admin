import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_HOST;

const axiosInstance = axios.create({ baseURL: BASE_URL });

export default axiosInstance;
