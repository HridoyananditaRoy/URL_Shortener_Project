import React, { useState, useEffect } from "react";
import { RegisterUser } from "../api/user.api";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/slice/authSlice.js";

//react-router-dom ka main work React app me 
// page navigation (routing) handle karna hota hai — without page reload.


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await RegisterUser({ name, email, password });
      if (res.success) {
        // Auto-login after registration
        const user = { name, email };
        dispatch(login(user));
        // Save user to localStorage for cookie restoration on refresh
        localStorage.setItem('user', JSON.stringify(user));
        setSuccess("Registration Successful! Logging in...");
        setTimeout(() => navigate("/"), 1000); // redirect to home

      } else {
        setError(res.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  //useEffect runs whenever error changes
  //Auto hide error after 3 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
    >
       <h2 className="text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-500">
        Register Form
      </h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        required
      />

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        required
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring"
        required
      />

      <button
        type="submit"
        className="w-30 ml-25 rounded-xl bg-blue-600 text-white py-2 hover:bg-blue-900"
      >
        Register
      </button>

      <p className="text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
