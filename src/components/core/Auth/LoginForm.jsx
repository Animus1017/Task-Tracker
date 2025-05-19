import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../services/operations/authAPI";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(login(data.email, data.password, navigate, dispatch));
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-6 md:gap-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5">
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
        <label className="flex flex-col gap-[6px]">
          <p className="flex gap-[2px] text-sm text-slate-100 items-center">
            Password<sup className="text-pink-400">*</sup>
          </p>
          <div className="relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <div
              className="text-slate-400 text-2xl cursor-pointer absolute right-4 top-1/4"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </div>
          </div>

          <Link
            to="/forgot-password"
            className="text-xs text-blue-400 self-end hover:underline"
          >
            Forgot Password
          </Link>
        </label>
      </div>
      <button
        className="rounded-lg p-3 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
