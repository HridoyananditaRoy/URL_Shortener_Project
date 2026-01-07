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
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");

      // 👇 force redirect after logout
      navigate("/login", { replace: true });

    } catch (error) {
      console.error("Logout failed", error);

      // 👇 even if error, force logout UI
      navigate("/login", { replace: true });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white"
    >
      Logout
    </button>
  );
};

export default Navbar;
