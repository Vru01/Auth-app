import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("2");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString().split('T')[0], 
      status,
      priority: parseInt(priority), 
    };
    console.log("Task Data:", taskData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response);
      alert("Task added successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error adding task", error);
      alert("Failed to add task!");
    }
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="1">Low</option>
          <option value="2">Medium</option>
          <option value="3">High</option>
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default AddTask;
