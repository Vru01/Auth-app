import React, { useState } from 'react';
import AddTask from './components/AddTask';
import ListOfTask from './components/ListOfTask';
import Confetti from 'react-confetti';
import { Sun, Moon, Cloud } from 'lucide-react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [celebrate, setCelebrate] = useState(false);

  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), task, completed: false }]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const completed = updatedTasks.find(task => task.id === id).completed;
    if (completed) setCelebrate(true);
    setTimeout(() => setCelebrate(false), 3000);
  };

  const filterTasks = () => {
    if (filter === 'all') return tasks;
    if (filter === 'active') return tasks.filter(task => !task.completed);
    if (filter === 'completed') return tasks.filter(task => task.completed);
  };

  const getButtonClass = (buttonFilter) => {
    const baseClass = "flex-1 py-2 rounded-full text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50";
    const activeClass = "font-bold shadow-lg";
    const inactiveClass = "opacity-70 hover:opacity-100";

    if (filter === buttonFilter) {
      return `${baseClass} ${activeClass}`;
    } else {
      return `${baseClass} ${inactiveClass}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-8 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Cosmic Tasks</h1>
            <AddTask addTask={addTask} />
            <div className="mt-8 flex space-x-4">
              <button
                className={`${getButtonClass('all')} bg-gradient-to-r from-yellow-400 to-orange-500 focus:ring-yellow-400`}
                onClick={() => setFilter('all')}
              >
                <Sun className="w-5 h-5 mr-2" />
                All
              </button>
              <button
                className={`${getButtonClass('active')} bg-gradient-to-r from-green-400 to-blue-500 focus:ring-green-400`}
                onClick={() => setFilter('active')}
              >
                <Cloud className="w-5 h-5 mr-2" />
                Active
              </button>
              <button
                className={`${getButtonClass('completed')} bg-gradient-to-r from-purple-400 to-indigo-500 focus:ring-purple-400`}
                onClick={() => setFilter('completed')}
              >
                <Moon className="w-5 h-5 mr-2" />
                Done
              </button>
            </div>
          </div>
          <ListOfTask
            tasks={filterTasks()}
            removeTask={removeTask}
            toggleComplete={toggleComplete}
          />
        </div>
      </div>
      {celebrate && <Confetti />}
    </div>
  );
};

export default App;