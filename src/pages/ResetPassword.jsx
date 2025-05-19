import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { resetPassword } from "../services/operations/authAPI";
import toast from "react-hot-toast";
const ResetPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [linkSent, setLinkSent] = useState(false);
  const [email, setEmail] = useState("");
  const { register, handleSubmit, watch } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password", "");
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[\W_]/.test(password);
  const hasMinLength = password.length >= 8;
  const token = location.pathname.split("/").at(-1);
  const onSubmit = (data) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(data.password)) {
      toast.error("Invalid password format");
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords Do Not Match");
      return;
    }
    if (linkSent) {
      navigate("/login");
    } else {
      dispatch(
        resetPassword(
          data.password,
          data.confirmPassword,
          token,
          navigate,
          dispatch
        )
      );
    }
  };
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    const maskedName = name[0] + "*".repeat(name.length - 1);
    return `${maskedName}@${domain}`;
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/80 border border-blue-700 shadow-2xl rounded-2xl p-10 text-slate-100 backdrop-blur-md">
          <div className="flex flex-col gap-3 text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              {linkSent ? "Reset complete!" : "Choose new password"}
            </h2>
            <p className="text-slate-300 text-lg">
              {linkSent
                ? `All done! We have sent an email to ${maskEmail(
                    email
                  )} to confirm`
                : "Almost done. Enter your new password and you're all set."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {!linkSent && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-5">
                  <label className="flex flex-col gap-[6px]">
                    <p className="flex gap-[2px] text-sm text-slate-100 items-center">
                      New password<sup className="text-pink-400">*</sup>
                    </p>
                    <div className="relative">
                      <input
                        type={`${showPassword ? "text" : "password"}`}
                        className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
                        placeholder="Enter Password"
                        {...register("password", {
                          required: true,
                        })}
                      />
                      <div
                        className="text-slate-400 text-2xl cursor-pointer absolute right-2 top-1/4 rounded-sm"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                    </div>
                  </label>
                  <label className="flex flex-col gap-[6px]">
                    <p className="flex gap-[2px] text-sm text-slate-100 items-center">
                      Confirm new password<sup className="text-pink-400">*</sup>
                    </p>
                    <div className="relative">
                      <input
                        type={`${showConfirmPassword ? "text" : "password"}`}
                        className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
                        placeholder="Enter Password"
                        {...register("confirmPassword", {
                          required: true,
                        })}
                      />
                      <div
                        className="text-slate-400 text-2xl cursor-pointer absolute right-2 top-1/4 rounded-sm"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? (
                          <AiOutlineEye />
                        ) : (
                          <AiOutlineEyeInvisible />
                        )}
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <p
                      className={`flex gap-[6px] items-center ${
                        hasLowercase
                          ? "text-caribbeangreen-100 font-semibold"
                          : "text-richblack-300"
                      }`}
                    >
                      <FaCheckCircle
                        className={`${
                          hasLowercase
                            ? "text-caribbeangreen-100"
                            : "text-richblack-300"
                        }`}
                      />
                      one lowercase character
                    </p>
                    <p
                      className={`flex gap-[6px] items-center ${
                        hasUppercase
                          ? "text-caribbeangreen-100 font-semibold"
                          : "text-richblack-300"
                      }`}
                    >
                      <FaCheckCircle
                        className={`${
                          hasUppercase
                            ? "text-caribbeangreen-100"
                            : "text-richblack-300"
                        }`}
                      />
                      one uppercase character
                    </p>
                    <p
                      className={`flex gap-[6px] items-center ${
                        hasNumber
                          ? "text-caribbeangreen-100 font-semibold"
                          : "text-richblack-300"
                      }`}
                    >
                      <FaCheckCircle
                        className={`${
                          hasNumber
                            ? "text-caribbeangreen-100"
                            : "text-richblack-300"
                        }`}
                      />
                      one number
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p
                      className={`flex gap-[6px] items-center ${
                        hasSpecialChar
                          ? "text-caribbeangreen-100 font-semibold"
                          : "text-richblack-300"
                      }`}
                    >
                      <FaCheckCircle
                        className={`${
                          hasSpecialChar
                            ? "text-caribbeangreen-100"
                            : "text-richblack-300"
                        }`}
                      />
                      one special character
                    </p>
                    <p
                      className={`flex gap-[6px] items-center ${
                        hasMinLength
                          ? "text-caribbeangreen-100 font-semibold"
                          : "text-richblack-300"
                      }`}
                    >
                      <FaCheckCircle
                        className={`${
                          hasMinLength
                            ? "text-caribbeangreen-100"
                            : "text-richblack-300"
                        }`}
                      />
                      8 character minimum
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-3">
              <button
                className="rounded-lg p-3 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg"
                type="submit"
              >
                {linkSent ? "Return to login" : "Reset password"}
              </button>
              <div className="p-3 flex justify-center">
                <Link
                  to="/login"
                  className="flex gap-2 text-slate-100 font-medium items-center hover:text-blue-400 transition"
                >
                  <FaArrowLeft className="text-lg" />
                  Back to Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
