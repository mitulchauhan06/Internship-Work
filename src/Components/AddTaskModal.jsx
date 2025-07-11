import React from 'react'
import {useState} from "react"
 const AddTaskModal = ({onClose , onAdd}) => {
    const [title , setTitle] = useState("");
    const [priority , setPriority] = useState("low");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!title.trim()) return;
        const newTask = {
            id:new Date().getTime(),
            title,
            priority,
            status: "todo",
        };
         onAdd(newTask);
    onClose(); // close modal after adding
  
    };
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md '>
        <h2 className='text-2xl font-bold mb-4 '>Add New Task</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
            <input
            type='text'
            className='w-full p-2 border rounded'
            placeholder='enter task title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}/>

            <select 
            className='w-full p-2 border rounded'
            value={priority}
            onChange ={(e) => setPriority(e.target.value)}>
                <option value="low" > Low Priority</option>
                    <option value="medium" > medium Priority</option>
                        <option value="high"> High Priority</option>
            </select>

            <div className ="flex justify-end gap-2">
                <button
                type='button' onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
              Add Task
            </button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default AddTaskModal
