import TaskCard from '../Components/TaskCard'
import { useState ,  } from 'react'
import AddTaskModal from '../Components/AddTaskModal'
import {
  DragDropContext,
  Droppable,
  Draggable,
}  from '@hello-pangea/dnd';
import { useMemo} from 'react';




const TaskBoard = ({tasks , onStatusChange, onDelete , onAddTask ,}) => {
  const [showModal , setShowModal] = useState(false);

  const columns = useMemo(() => ({
    todo: {
      title: 'To-Do',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },

    inprogress:{
      title:'In-Progress',
      tasks : tasks.filter((task) => task.status === 'inprogress'),

    },

    completed: {
      title: 'Completed',
      tasks: tasks.filter((task) => task.status === 'completed')
    }
  }
), [tasks]);

  const isMoveAllowed = (sourceId , destId) => {
    if(sourceId === 'todo' && destId === 'inprogress') return true;
    if(sourceId === 'inprogress' && destId === 'completed') return true;
    if(sourceId === 'completed'  && destId === 'inprogress') return true;
    
    return false; // all other moves are blocked
  }

  const handleDragEnd = (result) => {
    const {source , destination , draggableId} = result;
    
    if(!destination) return ;

    if (!draggableId) {
    console.error("No draggableId found");
    return;
  }

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;


    



    //Don't update if the drapped in the same column
    if (sourceCol === destCol && source.index === destination.index) return ;


    if(isMoveAllowed(sourceCol , destCol)){
      
console.log("Dragging from", sourceCol, "to", destCol);

      onStatusChange(draggableId , destCol);
    }else{
      alert(` can not move task from "${sourceCol}" to "${destCol}"`);
    }
  };









  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <div className="flex justify-between items-center mb-4">

        <h1 className='text-2xl font-bold text-gray-800 '>Task Board</h1>
        <button
        onClick={() => setShowModal(true)}
        className='bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2'>
        + Add Task

        </button>
      </div>

     {showModal && <AddTaskModal onClose={() => setShowModal(false)} onAdd={onAddTask}/>}

    <DragDropContext onDragEnd={handleDragEnd}>
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {Object.entries(columns).map(([columnId, column]) => (
         <Droppable droppableId={columnId} key={columnId}>
          {(provided) => (
            <div 
            className='bg-white rounded-2xl shadow-md p-4 min-h[400px]'
            ref={provided.innerRef}
            {...provided.droppableProps}
            >
              <h2 className='text-xl font-semibold text-blue-700  md-4'>
                {column.title}
                </h2>

                  {column.tasks.map((task, index) => (
                    <Draggable
                   draggableId={task?.id?.toString() || task?._id?.toString() || `temp-${index}`}
  index={index}
  key={task?.id || task?._id || `temp-${index}`}
                    >
                      {(provided) => (
                        <div
                          className='mb-3'
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard
                            title={task.title}
                            priority={task.priority}
                            task={task}
                            onStatusChange={onStatusChange}
                            onDelete={onDelete}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
