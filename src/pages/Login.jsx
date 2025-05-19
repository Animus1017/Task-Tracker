import React from "react";
import Template from "../components/common/Template";
import LoginForm from "../components/core/Auth/LoginForm";

const Login = () => {
  return (
    <Template
      title="Welcome Back"
      description1="Track your tasks efficiently with"
      description2="TaskTracker"
    >
      <LoginForm />
    </Template>
  );
};

export default Login;
