import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { token, setToken } = useContext(AuthContext); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/tasks/edit/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken(null); 
    navigate("/login"); 
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 3:
        return "High";
      case 2:
        return "Medium";
      case 1:
        return "Low";
      default:
        return "Unknown";
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      <button onClick={() => navigate("/tasks/add")}>Add Task</button>
      <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
        Logout
      </button>
      <ul>
        {tasks.map((task) => {
          const formattedDate = new Date(task.dueDate).toLocaleDateString(); 
          return (
            <li key={task.id}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due Date: {formattedDate}</p> 
              <p>Status: {task.status}</p>
              <p>Priority: {getPriorityLabel(task.priority)}</p>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskList;
