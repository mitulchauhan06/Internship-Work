import React from 'react'
//import { useAuth } from '../hooks/useAuth'
import Sidebar from '../Components/sidebar';
import BarChartWidget from '../Components/BarChartWidget';
import TaskBoard from './TaskBoard';

const Dashboard = ({tasks , onStatusChange , onDelete , onAddTask }) => {
//here we count the length of all category tasks
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const inprogressTasks = tasks.filter(task => task.status === "inprogress").length;
   const todoTasks = tasks.filter(task => task.status === "todo").length;

   //count based on priority
    const priorityCount= {
      low:tasks.filter(task => task.priority=== "low" ).length,
      medium:tasks.filter(task => task.priority === "medium").length,
      high:tasks.filter(task => task.priority=== "high").length

    };



   // const {user , logout} = useAuth();
  return (
    <div className='flex min-h-screen'>
   <Sidebar/>

   <main className='flex-1 p-6 bg-gray-100 min-h-screen'>
<h1 className='text-3xl font-bold mb-6'>welcome to your dashboard</h1>

{/* placeholder for cards , charts , tables*/ }
<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-gray-700">Total Tasks</h2>
    <p className="text-3xl font-bold text-indigo-600 mt-2">{totalTasks}</p>
  </div>
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-gray-700">To-do</h2>
    <p className="text-3xl font-bold text-yellow-500 mt-2">{todoTasks}</p>
  </div>
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-gray-700">In Progress</h2>
    <p className="text-3xl font-bold text-green-600 mt-2">{inprogressTasks}</p>
  </div>
  <div className="bg-white p-6 rounded-xl shadow">
    <h2 className="text-xl font-semibold text-gray-700">Completed</h2>
    <p className="text-3xl font-bold text-indigo-600 mt-2">{completedTasks}</p>
  </div>
</div>

{/* this is our taskboard section  */}
<TaskBoard
tasks={tasks}
onStatusChange={onStatusChange}
onDelete={onDelete}
onAddTask={onAddTask}
/>
 
{/*Chart section*/}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <BarChartWidget priorityCount={priorityCount} />
    </div>
    </div>

   </main>
   
</div>
  );
};

export default Dashboard
