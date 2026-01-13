import React from 'react'
import TaskCard from '../Components/TaskCard'
const Inprogresspages = ({tasks , onStatusChange , onDelete}) => {
  return (
    <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>In-progress Tasks</h1>
      <div className='bg-white rounded-lg shadow p-4'>
        {tasks 
        .filter(task => task.status === "inprogress")
        .map(task => (
            <TaskCard 
            key={task.id}
            title={task.title}
            priority={task.priority}
            onDelete={onDelete}
            task={task}
            onStatusChange={onStatusChange}
            
            />
        ))
        
        }
        </div>      
    </div>
  )
}

export default Inprogresspages
