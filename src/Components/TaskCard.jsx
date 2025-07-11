import React from 'react'

const TaskCard = ({title , priority , task , onStatusChange , onDelete }) => {
    //this component will be used to display individual tasks in the task board

    // this is the class for change the border based on the priority
    const priorityColors = {
        low: 'border-green-500',
        medium: 'border-yellow-500',
        high: "border-red-500"
    };

    //now we create the class for change the background color of the taskcard based on the taskstatus
     const StatusColor = {
      todo: "bg-yellow-100",
      inprogress:"bg-blue-100",
      completed:"bg-green-100"

     };

     //below that , get the correct class
     const bgColor = StatusColor[task.status] || 'bg-white';

    //this is use to handle the delete action
    // this is local warapper function
     const handleDelete = () => {
      onDelete(task.id); // delegate to parent
      
     }
    const handleMove = () =>{
      if(task.status === "todo"){
        onStatusChange(task.id , "inprogress");
      }else if(task.status === "inprogress"){
        onStatusChange(task.id , "completed");
      }
      }
    // this function will be used to change the status of the task when it is move from one column to another 


  return (
     <div className={`border-l-4 p-3 ${bgColor} rounded shadow mb-4 ${priorityColors[priority]}`}>
      <h3 className='font-semibold text-gray-800'>{title}</h3>
      <p className='text-sm text-gray-500 capitalize'>Priority: {priority}</p>
{/* show button only if task is not completed */}
      {task.status !== "completed" && (
        <button 
        onClick={handleMove}
        className='mt-2 px-3 py-1 bg-indigo-500 text-white text-sm rounded hover:bg-indigo-600 ' >
          {task.status === "todo" ? "start" : 'complete'}
        </button>
      )}

      {/*show the trash button   */}
      
    <button
    onClick={handleDelete}
    className='ml-2 px-2 py-1 bg-red-500 , text-white text-sm rounded hover:bg-red-600'>
      Delete
    </button>

    </div>
  )
}

export default TaskCard
