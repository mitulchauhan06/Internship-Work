import React from 'react'
import {Link} from "react-router-dom"

const Sidebar = () => {
  return ( 
    <div className='w-64 min-h-screen bg-[#1e293b] text-white p-5'>
    <h2 className='text-2xl font-bold mb-8'>Task me</h2>
    <ul className='space-y-4'>
     <li><Link to="/dashboard" className='hover:text-blue-300'>Dashboard</Link></li>
     <li><Link to="/TaskBoard">Task</Link></li>
     <li><Link to="/completed">Completed</Link></li>
     <li><Link to="/in-progress">In-Progress</Link></li>
     <li><Link to="/todo">To-Do</Link></li>
     <li><Link to="/trash">Trash</Link></li>
    </ul>

      
    </div>
  )
}

export default Sidebar
