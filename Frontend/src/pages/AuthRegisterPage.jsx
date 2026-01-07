import React from "react";
import RegisterForm from "../components/RegisterForm";

const AuthPage = () => {
  return (
    <main className=" min-h-screen flex items-center justify-center bg-[#cfd2dc] px-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-7">
    
        {/* Header */}
        <header className=" text-center  ">
          <h1 className="text-3xl font-bold text-gray-900">
            Link Shortener
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Register in to continue
          </p>
        
        </header>

        {/* Login Form */}
        <RegisterForm />

      </section>
    </main>
  );
};

export default AuthPage;
