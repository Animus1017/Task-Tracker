import React from "react";

const Template = ({ title, description1, description2, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent sm:text-4xl tracking-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            <span>{description1}</span>{" "}
            <span className="font-semibold text-blue-400">{description2}</span>
          </p>
        </div>
        <div className="bg-slate-800/80 border border-blue-700 shadow-2xl rounded-2xl p-10 text-slate-100 backdrop-blur-md">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Template;
