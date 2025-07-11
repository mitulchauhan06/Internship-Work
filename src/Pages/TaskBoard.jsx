import React from 'react'
import TaskCard from '../Components/TaskCard'
import TaskData from '../Data/TaskData'
import { useState ,  } from 'react'
import AddTaskModal from '../Components/AddTaskModal'
const TaskBoard = ({tasks , onStatusChange, onDelete , onAddTask}) => {


const [showModal , setShowModal] = useState(false);









  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4">

        <h1 className='text-2xl font-bold '>Task Board</h1>
        <button
        onClick={() => setShowModal(true)}
        className='bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2'>
        + Add Task

        </button>
      </div>

     {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={onAddTask}/>}


    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white  rounded-xl shadow p-4'>
            <h2 className='text-xl font-blue-600 font-semibold '>To-Do</h2>
              {tasks.filter(task => task.status === "todo").map(task => (
                <TaskCard key ={task.id} title={task.title} priority={task.priority} task={task} onStatusChange={onStatusChange} onDelete={onDelete}/>
              ))}
        </div>

        <div className='bg-white  rounded-xl shadow p-4'>
            <h2 className='text-xl font-blue-600 font-semibold '>In-Progress</h2>
              {tasks.filter(task => task.status === "inprogress").map(task => (
                <TaskCard key ={task.id} title={task.title} priority={task.priority} task={task} onStatusChange={onStatusChange}  onDelete={onDelete}/>
              ))}
        </div>
      

      <div className='bg-white  rounded-xl shadow p-4'>
            <h2 className='text-xl font-blue-600 font-semibold '>Completed</h2>
             {tasks.filter(task => task.status === "completed").map(task => (
              <TaskCard key ={task.id} title={task.title} priority={task.priority} task={task} onStatusChange={onStatusChange}  onDelete={onDelete}/>
             ))}
        </div>
      
      </div>
    </div>
  )
}

export default TaskBoard;
