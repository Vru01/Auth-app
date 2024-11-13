import React from "react";

const Items = ({ task, removeTask, toggleComplete }) => {
  return (
    <li
      className={`flex items-start justify-between p-3 mb-3 border rounded-lg 
                    ${task.completed ? "bg-blue-100" : "bg-red-100"} 
                    transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-start space-x-2 max-w-md">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="mr-2 mt-1"
        />
        <span
          className={`break-words max-w-xs ${
            task.completed ? "line-through" : ""
          }`}
        >
          {task.task}
        </span>
      </div>
      <button
        onClick={() => removeTask(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </li>
  );
};

export default Items;
