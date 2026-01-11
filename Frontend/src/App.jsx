import React, { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Dashboard from "./components/DashBoard.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthRegisterPage from "./pages/AuthRegisterPage.jsx"
import {Routes, Route} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
// import { loadUser } from "./store/slice/authSlice.js";
import { useDispatch } from "react-redux";
// import { login } from "./store/slice/authSlice.js";
// import axios from "axios";
// import {logout } from "./store/slice/authSlice.js";


// React Router DOM is used for navigation in React apps without page reload

// BrowserRouter
// - Wraps the entire app
// - Enables routing using browser history

// Routes
// - Container for all Route components
// - Decides which route should be rendered

// Route
// - Maps a URL path to a React component
// - Renders the component when the path matches
//-----------------------------------------------------------------------------

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  // useEffect(() => {
  //   // Check if token cookie exists (set by backend)
  //   // If token exists, user is logged in - restore auth state from localStorage
  //   const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  //   const userStr = localStorage.getItem('user'); // Get user from localStorage if available
    
  //   if (token) {
  //     // Token cookie exists, restore auth state
  //     if (userStr) {
  //       // If user data exists in localStorage, use it
  //       try {
  //         const user = JSON.parse(userStr);
  //         dispatch(login(user));
  //       } catch (e) {
  //         // If parse fails, just restore with minimal data
  //         dispatch(login({ email: 'user' }));
  //       }
  //     } else {
  //       // Token exists but no user data, still mark as authenticated
  //       dispatch(login({ email: 'user' }));
  //     }
  //   }
  // }, [dispatch]);



  return (
    // <>
    //   {/* <HomePage /> */}
    //   <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //     {/* <LoginForm /> */}
    //     <AuthPage />
    //   </div>
    // </>
   
<Routes>
  <Route
    path="/"
    element={<ProtectedRoute element={<HomePage />} />}
  />

  <Route
    path="/dashboard" element={<Dashboard />} />

  <Route path="/login" element={<AuthPage />} />
  <Route path="/register" element={<AuthRegisterPage />} />
</Routes>
  );
};

export default App;
