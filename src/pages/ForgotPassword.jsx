import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getPasswordResetToken } from "../services/operations/authAPI";
import Spinner from "../components/common/Spinner";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    setEmail(data.email);
    await getPasswordResetToken(data.email, setEmailSent, dispatch);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/80 border border-blue-700 shadow-2xl rounded-2xl p-10 text-slate-100 backdrop-blur-md">
          <div className="flex flex-col gap-3 text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              {emailSent ? "Check email" : "Reset your password"}
            </h2>
            <p className="text-slate-300 text-lg">
              {emailSent
                ? `We have sent the reset email to ${email}`
                : "Enter your email and we'll send you instructions to reset your password."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {!emailSent && (
              <label className="flex flex-col gap-[6px]">
                <p className="flex gap-[2px] text-sm text-slate-100 items-center">
                  Email Address<sup className="text-pink-400">*</sup>
                </p>
                <input
                  type="email"
                  className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
                  placeholder="Enter email address"
                  {...register("email", { required: true })}
                />
              </label>
            )}
            <div className="flex flex-col gap-3">
              <button
                className="rounded-lg p-3 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg"
                type="submit"
              >
                {emailSent ? "Resend email" : "Reset Password"}
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

export default ForgotPassword;
