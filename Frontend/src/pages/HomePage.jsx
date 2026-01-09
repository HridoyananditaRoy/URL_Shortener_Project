import React from 'react'
import UrlForm from '../components/UrlForm.jsx';
import Navbar from '../components/Navbar.jsx';

const HomePage = () => {
  return (
    <>
      <Navbar showLogout={true} />
      <div className="p-8 min-h-screen flex items-center justify-center bg-[#e6eaf3]">
        <div className="w-full max-w-xl text-center bg-white p-18 rounded-lg shadow-lg">
          {/* Title */}
          <h1 className="text-4xl font-semibold text-black mb-5">
            Link Shortener
          </h1>

          <p className="text-gray-800 mb-8">
            Paste a long URL and get a short link instantly
          </p>

          {/* # Here UrlForm is a component and is imported at the top */}
          <UrlForm /> 

        
        </div>
      </div>
    </>
  )
}

export default HomePage