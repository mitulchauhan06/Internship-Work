import React from 'react'
//import { useState } from 'react'
import TaskCard from '../Components/TaskCard'
const Completedpages = ({tasks , onDelete , onStatusChange}) => {


  return (
    <div className='p-4'>
        <h1 className='text-xl text-bold mb-4 '>Completed Tasks</h1>
     <div className='bg-white rounded-xl p-4 shadow '>
        {tasks
        .filter(task => task.status === "completed" )
        .map(task => (
           <TaskCard
           key={task.id}
           title={task.title}
           priority={task.priority}
           task={task}
           onStatusChange={onStatusChange} 
            onDelete={onDelete}
            />
        ) )}
        
        </div>      
    </div>
  )
}

export default Completedpages
