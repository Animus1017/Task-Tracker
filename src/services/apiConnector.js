import axios from "axios";

// Use a CORS proxy for development
const useProxy = true; // Set this to false when backend CORS is properly configured

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": useProxy ? "XMLHttpRequest" : undefined,
  },
  withCredentials: !useProxy, // Must be false when using CORS proxy
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  const token = localStorage.getItem(
    process.env.REACT_APP_COOKIE_NAME || "TaskTracker"
  );

  // Add authorization header if token exists
  const requestHeaders = {
    ...headers,
  };

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: requestHeaders,
    params: params ? params : null,
  });
};
