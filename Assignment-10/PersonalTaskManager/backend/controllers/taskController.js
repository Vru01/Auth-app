const db = require("../config/db");

const createTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  const userId = req.user.id;

  try {
    const [result] = await db
      .promise()
      .query(
        "INSERT INTO tasks (userId, title, description, dueDate, status, priority) VALUES (?, ?, ?, ?, ?, ?)",
        [userId, title, description, dueDate, status, priority]
      );
    res.status(201).json({ message: "Task created", taskId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Task creation failed", error });
  }
};

const getAllTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const [tasks] = await db
      .promise()
      .query("SELECT * FROM tasks WHERE userId = ?", [userId]);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

const getTaskById = async (req, res) => {
  const userId = req.user.id;
  const taskId = req.params.id;

  try {
    // Get task and verify ownership
    const [tasks] = await db
      .promise()
      .query("SELECT * FROM tasks WHERE id = ? AND userId = ?", [taskId, userId]);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(tasks[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error });
  }
};

const updateTask = async (req, res) => {
  const { title, description, dueDate, status, priority } = req.body;
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // First verify task ownership
    const [tasks] = await db
      .promise()
      .query("SELECT userId FROM tasks WHERE id = ?", [taskId]);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (tasks[0].userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to modify this task" });
    }

    // Then update the task
    await db
      .promise()
      .query(
        "UPDATE tasks SET title = ?, description = ?, dueDate = ?, status = ?, priority = ? WHERE id = ?",
        [title, description, dueDate, status, priority, taskId]
      );
    res.status(200).json({ message: "Task updated" });
  } catch (error) {
    res.status(500).json({ message: "Task update failed", error });
  }
};

const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // First verify task ownership
    const [tasks] = await db
      .promise()
      .query("SELECT userId FROM tasks WHERE id = ?", [taskId]);

    if (tasks.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (tasks[0].userId !== userId) {
      return res.status(403).json({ message: "Unauthorized to delete this task" });
    }

    // Then delete the task
    await db.promise().query("DELETE FROM tasks WHERE id = ?", [taskId]);
    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Task deletion failed", error });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};