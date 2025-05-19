import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../redux/slices/authSlice";
import { sendOtp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { RiInformationFill } from "react-icons/ri";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(setSignupData(data));
    dispatch(sendOtp(data.email, navigate, dispatch));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form
      className="flex flex-col gap-6 md:gap-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-5 ">
        {/* name and country */}
        <div className="flex gap-5 flex-col sm:flex-row md:flex-col lg:flex-row w-full">
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-slate-100 items-center">
              Name<sup className="text-pink-400">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
          </label>
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-slate-100 items-center">
              Country<sup className="text-pink-400">*</sup>
            </p>
            <input
              type="text"
              className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
              placeholder="Enter your country"
              {...register("country", { required: true })}
            />
          </label>
        </div>
        {/* email */}
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
        {/* password */}
        <div className="flex gap-5 flex-col sm:flex-row md:flex-col lg:flex-row w-full">
          <label className="flex flex-col gap-[6px] w-full">
            <div className="flex gap-[2px] text-sm text-slate-100 items-center">
              Create Password<sup className="text-pink-400">*</sup>{" "}
              <div className="relative group">
                <RiInformationFill className="text-blue-400 cursor-pointer" />
                <div className="bg-slate-900 p-3 text-xs flex flex-col gap-1 leading-5 transition-all opacity-0 group-hover:visible group-hover:opacity-100 invisible duration-200 absolute w-48 z-50 left-5 -top-1/2 border border-blue-700 text-slate-200">
                  <div className="w-5 h-5 absolute rotate-45 bg-slate-900 top-1 -left-[1px] -z-10 border border-blue-700"></div>
                  <p className="text-slate-100 font-medium ">
                    Make sure your password is at
                  </p>
                  <div className="text-slate-400 flex flex-col">
                    <p className="">least 8 characters and contains:</p>
                    <ul className="list-disc list-inside pl-2">
                      <li>
                        At least 1 uppercase letter and 1 lowercase letter
                      </li>
                      <li>At least 1 number</li>
                      <li>At least 1 special character (like @#%^)</li>
                    </ul>
                  </div>
                  <p className="font-medium text-slate-400">
                    Avoid common passwords or strings like "password",
                    <br />
                    "qwerty", or "12345".
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
                placeholder="Enter Password"
                {...register("password", { required: true })}
              />
              <div
                className="text-slate-400 text-2xl cursor-pointer absolute right-2 top-1/4 rounded-sm"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </div>
            </div>
          </label>
          <label className="flex flex-col gap-[6px] w-full">
            <p className="flex gap-[2px] text-sm text-slate-100 items-center">
              Confirm Password<sup className="text-pink-400">*</sup>
            </p>
            <div className="relative">
              <input
                type={`${showConfirmPassword ? "text" : "password"}`}
                className="rounded-lg p-3 outline-none bg-slate-900 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 border border-slate-700 w-full transition"
                placeholder="Enter Password"
                {...register("confirmPassword", { required: true })}
              />
              <div
                className="text-slate-400 text-2xl cursor-pointer absolute right-2 top-1/4"
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
      </div>
      <button
        className="rounded-lg p-3 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg"
        type="submit"
      >
        Create Account
      </button>
    </form>
  );
};

export default SignupForm;
