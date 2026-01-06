import React from 'react'
import UrlForm from '../components/UrlForm.jsx';

const HomePage = () => {
  return (
    
        <div className="p-8 bg-[#0b0f19] min-h-screen flex items-center justify-center bg-[#0b0f19]">
      <div className="w-full max-w-xl text-center bg-gray-500 p-19 rounded-lg shadow-lg">
        <div className="w-full max-w-xl text-center bg-gray-300 p-12 rounded-lg shadow-lg">
          {/* Title */}
          <h1 className="text-4xl font-semibold text-black mb-3">
            Link Shortener
          </h1>

             <p className="text-gray-800 mb-8">
            Paste a long URL and get a short link instantly
          </p>

            {/* # Here UrlForm is a component and is imported at the top */}
            <UrlForm /> 

        </div>
        </div>
    </div>
  )
}

export default HomePage