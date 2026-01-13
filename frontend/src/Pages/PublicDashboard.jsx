import React from 'react'
import {Link} from 'react-router-dom'


const PublicDashboard = () => {
  return (
    <div className='min-h-screen bg-gradiant-to-br from-indigo-50 to-blue-100'>
      <header className='bg-white shadow-md p-4'>
        <h1 className='text-4xl md:text-6xl font-bold text-gray-800 mb-4'>
            organize task <span className='text-indigo-600'>Smarter</span>
        </h1>

           <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          AI-powered task management with analytics and reminders.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Sign In
          </Link>
          <Link
            to="/sign_up"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            Sign Up
          </Link>
        </div>
      </header>
    </div>
  )
}

export default PublicDashboard
