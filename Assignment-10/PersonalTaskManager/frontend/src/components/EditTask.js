import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("2");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const task = response.data;
        setTitle(task.title);
        setDescription(task.description);
        setDueDate(task.dueDate.split('T')[0]); // Format date for input
        setStatus(task.status);
        setPriority(task.priority.toString()); // Convert number to string for select
      } catch (error) {
        console.error("Error fetching task", error);
        alert("Failed to fetch task details!");
      }
    };

    fetchTask();
  }, [id, token]);

  const handleEditTask = async (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate: new Date(dueDate).toISOString().split('T')[0], // Format to YYYY-MM-DD
      status,
      priority: parseInt(priority), // Convert priority to integer
    };
    console.log("Task Data:", taskData);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Response:", response);
      alert("Task updated successfully!");
      navigate("/tasks");
    } catch (error) {
      console.error("Error updating task", error);
      alert("Failed to update task!");
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleEditTask}>
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
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;