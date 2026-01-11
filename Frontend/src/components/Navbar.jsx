// import React from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { Link, useNavigate } from "react-router-dom";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const handleLogout = async()=>{
//     try {
//         await axiosInstance.post("/api/auth/logout");
//         navigate("login");

//     } catch (error) {
//         console.log("Logout failed",error);
//     }
//   };
//   return(
//      <>
//   {/* NAVBAR */}
//  <div className="flex ">
//     {/* <h2 className="mx-2 my-2 justify-center items-center p-4"> 
//         <Link to="/logout" >To Logout: </Link>
    
//     </h2> */}
//     <button
//       onClick={handleLogout}
//       className="bg-red-500 hover:bg-red-600 px-4 py-2 mb-5 rounded text-sm font-medium"
//     >
//       Logout
//     </button>
//  </div>
// </>

//   )
// };

// export default Navbar;

import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../store/slice/authSlice.js";

const Navbar = ({showLogout = true }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const auth = useSelector((s) => s.auth);
  const isAuth = auth && auth.isAuthenticated;
  const show = typeof showLogout === "boolean" ? showLogout : isAuth;

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      // Backend clears the cookie
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      // Clear Redux state
      dispatch(logoutAction());
      // Clear user from localStorage
      localStorage.removeItem('user');
      
      // Redirect to dashboard after logout
      navigate("/login");
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav>
      {show ? (
        <div
          className="gap-13 flex justify-end underline px-16 py-8 rounded text-2xl font-medium bg-blue-500"
        >
          <h1 className="mr-auto">URL Shortener</h1>
          <p onClick={handleLogout} className="hover:text-white cursor-pointer">Logout</p>
          <p onClick={handleRegister} className="hover:text-white cursor-pointer">Register</p>
        </div>
      ) : (
        <div
          className="gap-13 flex justify-end underline px-16 py-8 rounded text-2xl font-medium bg-blue-500"
        >
          <h1 className="mr-auto">URL Shortener</h1>
          <p onClick={handleLogin} className="hover:text-white cursor-pointer">Login</p>
          <p onClick={handleRegister} className="hover:text-white cursor-pointer">Register</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
