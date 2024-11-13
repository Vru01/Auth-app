import React from 'react';
import TaskItem from './Items';

const ListOfTask = ({ tasks, removeTask, toggleComplete }) => {
  return (
    <ul className="mt-4">
      {tasks.length > 0 ? tasks.map(task => (
        <TaskItem 
          key={task.id} 
          task={task} 
          removeTask={removeTask} 
          toggleComplete={toggleComplete} 
        />
      )) : <p className="text-gray-500">No tasks to display</p>}
    </ul>
  );
};

export default ListOfTask;