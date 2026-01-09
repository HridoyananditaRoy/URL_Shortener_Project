import React from 'react'
import Navbar from "./Navbar.jsx";
import UrlForm from "./UrlForm.jsx";

const DashBoard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar showLogout={false} />
      <main className="max-w-4xl p-6 mt-30 mx-auto w-fit">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome to your dashboard. Your shortened links will appear here.</p>
      <UrlForm />
      </main>
    </div>
    
  )
}

export default DashBoard