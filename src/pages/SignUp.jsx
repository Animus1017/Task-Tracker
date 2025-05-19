import React from "react";
import Template from "../components/common/Template";
import SignupForm from "../components/core/Auth/SignupForm";

const SignUp = () => {
  return (
    <Template
      title="Create Your Account"
      description1="Join the best task management platform"
      description2="TaskTracker"
    >
      <SignupForm />
    </Template>
  );
};

export default SignUp;
