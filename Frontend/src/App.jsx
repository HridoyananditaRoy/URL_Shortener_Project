import React from "react";
import HomePage from "./pages/HomePage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import AuthRegisterPage from "./pages/AuthRegisterPage.jsx"
import {Routes, Route} from "react-router-dom"

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
  return (
    // <>
    //   {/* <HomePage /> */}
    //   <div className="flex justify-center items-center min-h-screen bg-gray-100">
    //     {/* <LoginForm /> */}
    //     <AuthPage />
    //   </div>
    // </>
    <Routes>
      <Route path="/" element={<HomePage></HomePage>} />
      <Route path="/login" element={<AuthPage></AuthPage>} />
      <Route path="/register" element={<AuthRegisterPage />} />
      </ Routes>
  );
};

export default App;
