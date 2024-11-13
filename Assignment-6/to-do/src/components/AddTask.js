import React, { useState } from 'react';

const AddTask = ({ addTask }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      setError('Task cannot be empty');
      return;
    }
    addTask(input);
    setInput('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input 
        type="text" 
        className="w-full p-3 border rounded-lg focus:outline-none shadow-md" 
        placeholder="Add a new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button 
        type="submit" 
        className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
      >Add Task</button>
    </form>
  );
};

export default AddTask;
