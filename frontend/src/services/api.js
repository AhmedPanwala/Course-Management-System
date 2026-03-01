import axios from "axios";

const api = axios.create({
  baseURL: "https://course-management-system-2-8hmu.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
