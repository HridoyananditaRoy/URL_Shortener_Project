import React, { useState } from 'react';
import { LoginUser } from "../api/user.api";
import {useEffect} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../store/slice/authSlice.js'

//react-router-dom ka main work React app me 
// page navigation (routing) handle karna hota hai — without page reload.

//❌ Without react-router-dom
//Every navigation reloads the page

 const LoginForm = ({ state }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
      const [success, setSuccess] = useState('');
  const location = useLocation(); 
  const auth = useSelector((state)=>state.auth); //reading 
  const dispatch = useDispatch();
//console.log(auth);

  //Returns the current Location. This can be useful 
  // if you'd like to perform some side effect whenever it changes.
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await LoginUser({ email, password });
      if (res.success) {
        // Token is already saved in cookies by backend
        // Just update Redux state
        const user = res.user || { email };
        dispatch(login(user));
        // Save user to localStorage for cookie restoration on refresh
        localStorage.setItem('user', JSON.stringify(user));
        setSuccess("Login Successful");
        setTimeout(() => navigate("/"), 500); // redirect to home
      } else {
        setError(res.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000); // hide after 3 sec
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(()=>{
    if(location.state?.successMessage){
      setSuccess(location.state.successMessage);
      navigate(location.pathname, { replace: true }); // clears state after reading

    }
  },[location, navigate])

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm mx-auto space-y-4"
    >
      <h2 className="text-3xl font-extrabold text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-500">
        Login Form
      </h2>

      {/* Success / Error Messages */}
      {error && <p className="text-red-500 text-center">Login Unsuccessful! Try again!!</p>}
      {success && <p className="text-green-500 text-center">Login Successful</p>}

      <input 
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input 
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      {/* Centered Button */}
      <button 
        type="submit"
        className="block w-32 mx-auto rounded-2xl bg-blue-600 text-white py-2 hover:bg-blue-700 transition-colors font-semibold"
      >
        Login
      </button>

      <p className="text-center text-sm text-gray-500 mt-2">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;