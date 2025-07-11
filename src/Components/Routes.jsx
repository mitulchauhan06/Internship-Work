import { BrowserRouter , Routes , Route }  from 'react-router-dom'
import React  from 'react'
import Login from './Login'
import Sign_up from './Sign_up' 
import Protectedroute from '../Routes/Protectedroute'
import Dashboard from '../Pages/Dashboard'
import TaskBoard from "../Pages/TaskBoard"
import TodoPages from '../Pages/TodoPages'
import { Navigate } from 'react-router-dom'
import { useState , useEffect } from 'react'
import TaskData from '../Data/TaskData'
import Completedpages from '../Pages/Completedpages'
import Inprogresspages from '../Pages/Inprogresspages'

const AppRoutes = () => {
const user = JSON.parse(localStorage.getItem('user'));//simple auth logic to check if user is logged in


  //initaialize tasks state from localstorage or use default data
  const [tasks , setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : TaskData
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const onStatusChange = (taskId, newStatus) => {
    const updated = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  const OnDelete = (taskId) => {
    const updated = tasks.filter(task => task.id !== taskId);
    setTasks(updated);
  };

  const OnAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };


  
  return (
      
    
        <Routes>
            <Route path="/" element={!user ? <Navigate to="/login"/>: <Navigate to="/dashboard"/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/sign_up" element={<Sign_up/>}/>
            
           

            { /*this is the protected routes*/}
            <Route
        path="/dashboard"
        element={
          <Protectedroute>
            <Dashboard  tasks={tasks}/>
          </Protectedroute>
        }
      />

      <Route 

      path='/TaskBoard' element={
      <Protectedroute>
      <TaskBoard tasks={tasks}
      onStatusChange={onStatusChange}
      onDelete={OnDelete}
      onAddTask={OnAddTask}/> 
      </Protectedroute>
      } 
      />   

      <Route
      path="/todo" element={<Protectedroute>
        <TodoPages tasks={tasks}
      onStatusChange={onStatusChange}
      onDelete={OnDelete}
      /></Protectedroute>}  
       />

       <Route
       path='/completed' element={<Protectedroute>
        <Completedpages tasks={tasks}
        onDelete={OnDelete}
        onStatusChange={onStatusChange}/>
       </Protectedroute>}
       />

        <Route
      path="/in-progress" element={<Protectedroute>
        <Inprogresspages tasks={tasks}
      onStatusChange={onStatusChange}
      onDelete={OnDelete}
      /></Protectedroute>}  
       />
     
       </Routes>
      
  )
}
export default AppRoutes
