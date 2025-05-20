// Use a CORS proxy for development
const useProxy = true; // Set this to false when backend CORS is properly configured
const CORS_PROXY = "https://api.allorigins.win/raw?url=";

// Use environment variable or fallback
const BACKEND_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://task-tracker-69b9.onrender.com/api/v1";
const BASE_URL = useProxy ? `${CORS_PROXY}${BACKEND_URL}` : BACKEND_URL;

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
};
