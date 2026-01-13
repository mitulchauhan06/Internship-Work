import React from 'react'
//import { useState , useEffect } from 'react'
import TaskCard from '../Components/TaskCard'
const TodoPages = ({tasks , onStatusChange , onDelete}) => {
  return (
    <div className='p-4'>
       <h1 className='text-2xl font-bold mb-4'>To-Do Tasks</h1>
      <div className='bg-white rounded-xl shadow p-4'>
        {tasks
          .filter(task => task.status === "todo")
          .map(task => (
            <TaskCard
              key={task.id}
              title={task.title}
              priority={task.priority}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))}
      </div>
    </div>
  )
}

export default TodoPages
