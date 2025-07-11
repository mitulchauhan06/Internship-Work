import React from 'react'
import TaskCard from '../Components/TaskCard'
const Inprogresspages = ({tasks , OnStatusChange , OnDelete}) => {
  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'></h1>
      <div className='bg-white rounded-lg shadow p-4'>
        {tasks 
        .filter(task => task.status === "inprogress")
        .map(task => (
            <TaskCard 
            key={task.id}
            title={task.title}
            priority={task.priority}
            onDelete={OnDelete}
            task={task}
            onStatusChange={OnStatusChange}
            
            />
        ))
        
        }
        </div>      
    </div>
  )
}

export default Inprogresspages
