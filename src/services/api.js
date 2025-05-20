import axios from "axios";

// Use a CORS proxy for development
const useProxy = true; // Set this to false when backend CORS is properly configured
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
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

// Helper function for direct API fetch with auth
const directFetch = async (endpoint, method = "GET", data = null) => {
  const token = localStorage.getItem(COOKIE_NAME);
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    mode: "cors",
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${BACKEND_URL}${endpoint}`, options);
  return response.json();
};

// Project APIs
export const createProject = async (data) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch("/projects/create", "POST", data);
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.post("/projects/create", data);
    return response.data;
  } catch (error) {
    console.error("Create project error:", error);
    throw error;
  }
};

export const getProjects = async () => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch("/projects/all");
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.get("/projects/all");
    return response.data;
  } catch (error) {
    console.error("Get projects error:", error);
    throw error;
  }
};

export const updateProject = async (projectId, data) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch(
        `/projects/${projectId}`,
        "PUT",
        data
      );
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.put(`/projects/${projectId}`, data);
    return response.data;
  } catch (error) {
    console.error("Update project error:", error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch(`/projects/${projectId}`, "DELETE");
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Delete project error:", error);
    throw error;
  }
};

// Task APIs
export const createTask = async (data) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch("/tasks/create", "POST", data);
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.post("/tasks/create", data);
    return response.data;
  } catch (error) {
    console.error("Create task error:", error);
    throw error;
  }
};

export const getTasks = async (projectId) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch(`/tasks/project/${projectId}`);
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.get(`/tasks/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Get tasks error:", error);
    throw error;
  }
};

export const updateTask = async (taskId, data) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch(`/tasks/${taskId}`, "PUT", data);
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.put(`/tasks/${taskId}`, data);
    return response.data;
  } catch (error) {
    console.error("Update task error:", error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    // Try direct fetch first
    try {
      const directData = await directFetch(`/tasks/${taskId}`, "DELETE");
      if (directData.success) {
        return directData;
      }
    } catch (directError) {
      console.log("Direct fetch failed, trying proxy...", directError);
    }

    // Fall back to proxy
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Delete task error:", error);
    throw error;
  }
};
