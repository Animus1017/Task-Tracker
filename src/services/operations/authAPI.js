import { toast } from "react-hot-toast";
// import { resetCart } from "../../slices/cartSlice";
import { endpoints } from "../apis";
import {
  setLoading,
  setError,
  setUser,
  setToken,
  logout,
} from "../../redux/slices/authSlice";
import { apiConnector } from "../apiConnector";
import { setUserProfile } from "../../redux/slices/profileSlice";
const COOKIE_NAME = process.env.REACT_APP_COOKIE_NAME || "TaskTracker";
const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export const sendOtp = async (email, navigate, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", SENDOTP_API, {
      email,
      checkUserPresent: true,
    });
    console.log("SENDOTP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("OTP Sent Successfully");
    navigate("/verify-email");
  } catch (error) {
    console.log("SENDOTP API ERROR............", error);
    toast.error("Could Not Send OTP");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const signUp = async (
  email,
  password,
  confirmPassword,
  otp,
  navigate,
  name,
  country,
  dispatch
) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", SIGNUP_API, {
      email,
      password,
      confirmPassword,
      otp,
      name,
      country,
    });

    console.log("SIGNUP API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Signup Successful");
    navigate("/login");
  } catch (error) {
    console.log("SIGNUP API ERROR............", error);
    toast.error("Signup Failed");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const login = async (email, password, navigate, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", LOGIN_API, {
      email,
      password,
    });

    console.log("LOGIN API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Login Successful");

    // Store token in localStorage
    localStorage.setItem(COOKIE_NAME, response.data.token);
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(response.data.data));

    dispatch(setToken(response.data.token));
    dispatch(setUser(response.data.data));
    dispatch(setUserProfile(response.data.data));

    // Navigate after all state updates
    navigate("/dashboard");
  } catch (error) {
    console.log("LOGIN API ERROR............", error);
    toast.error("Login Failed");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const getPasswordResetToken = async (email, setEmailSent, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", RESETPASSTOKEN_API, {
      email,
    });

    console.log("RESET PASSWORD TOKEN RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Reset Email Sent");
    setEmailSent(true);
  } catch (error) {
    console.log("RESET PASSWORD TOKEN ERROR............", error);
    toast.error("Failed to send reset email");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const resetPassword = async (
  password,
  confirmPassword,
  token,
  navigate,
  dispatch
) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("POST", RESETPASSWORD_API, {
      password,
      confirmPassword,
      token,
    });

    console.log("RESET PASSWORD RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Password Reset Successful");
    navigate("/login");
  } catch (error) {
    console.log("RESET PASSWORD ERROR............", error);
    toast.error("Failed to reset password");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};

export const logoutFn = async (navigate, dispatch) => {
  const toastId = toast.loading("Loading...");
  dispatch(setLoading(true));
  try {
    localStorage.removeItem(COOKIE_NAME);
    localStorage.removeItem("user");
    dispatch(logout());
    toast.success("Logged Out Successfully");
    navigate("/");
  } catch (error) {
    console.log("LOGOUT ERROR............", error);
    toast.error("Failed to logout");
    dispatch(setError(error.message));
  }
  dispatch(setLoading(false));
  toast.dismiss(toastId);
};
