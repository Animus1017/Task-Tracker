const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/Task");

// Task routes
router.post("/create", auth, createTask);
router.get("/project/:projectId", auth, getTasks);
router.put("/:taskId", auth, updateTask);
router.delete("/:taskId", auth, deleteTask);

module.exports = router;
