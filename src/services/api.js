import axios from "axios";

// Use a CORS proxy for development
const useProxy = true; // Set this to false when backend CORS is properly configured
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const BACKEND_URL = "https://task-tracker-69b9.onrender.com/api/v1";

const API_URL =
  process.env.REACT_APP_API_URL ||
  (useProxy ? `${CORS_PROXY}${BACKEND_URL}` : BACKEND_URL);

const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME || "TaskTracker";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  withCredentials: !useProxy, // Must be false when using CORS proxy
});

// Add a request interceptor to include the token in the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(COOKIE_NAME);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // When using CORS proxy, add extra headers
    if (useProxy) {
      config.headers["X-Requested-With"] = "XMLHttpRequest";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Project APIs
export const createProject = async (data) => {
  const response = await api.post("/projects/create", data);
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/projects/all");
  return response.data;
};

export const updateProject = async (projectId, data) => {
  const response = await api.put(`/projects/${projectId}`, data);
  return response.data;
};

export const deleteProject = async (projectId) => {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
};

// Task APIs
export const createTask = async (data) => {
  const response = await api.post("/tasks/create", data);
  return response.data;
};

export const getTasks = async (projectId) => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};

export const updateTask = async (taskId, data) => {
  const response = await api.put(`/tasks/${taskId}`, data);
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
