import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { IoMdTimer } from "react-icons/io";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password, confirmPassword, name, country } = signupData;
    dispatch(
      signUp(
        email,
        password,
        confirmPassword,
        otp,
        navigate,
        name,
        country,
        dispatch
      )
    );
  };

  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-slate-800/80 border border-blue-700 shadow-2xl rounded-2xl p-10 text-slate-100 backdrop-blur-md">
          <div className="flex flex-col gap-3 text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
              Verify email
            </h2>
            <p className="text-slate-300 text-lg">
              A verification code has been sent to you. Enter the code below
            </p>
          </div>

          <form onSubmit={onSubmit} className="flex flex-col gap-6">
            <div className="w-full flex justify-center">
              <OtpInput
                value={otp}
                onChange={(value) => {
                  const cleanedOtp = value.replace(/[^0-9]/g, "");
                  setOtp(cleanedOtp);
                }}
                numInputs={6}
                containerStyle="flex justify-between w-full"
                renderInput={(props) => (
                  <input
                    {...props}
                    placeholder="-"
                    className="w-12 h-12 p-2 bg-slate-900 text-slate-100 outline-none rounded-lg text-center border border-blue-700 focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition"
                    style={{ boxSizing: "border-box" }}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-3">
              <button
                className="rounded-lg p-3 bg-gradient-to-r from-blue-500 to-blue-700 font-semibold text-white shadow hover:from-blue-600 hover:to-blue-800 transition-all text-lg"
                type="submit"
              >
                Verify email
              </button>
              <div className="p-3 flex justify-between">
                <Link
                  to="/login"
                  className="flex gap-2 text-slate-100 font-medium items-center hover:text-blue-400 transition"
                >
                  <FaArrowLeft className="text-lg" />
                  Back to Login
                </Link>
                <button
                  className="flex gap-2 font-medium items-center text-blue-400 hover:underline"
                  onClick={() =>
                    dispatch(sendOtp(signupData?.email, navigate, dispatch))
                  }
                  type="button"
                >
                  <IoMdTimer className="text-lg" />
                  Resend it
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
