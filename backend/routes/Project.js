const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/Project");

// Project routes
router.post("/create", auth, createProject);
router.get("/all", auth, getProjects);
router.put("/:projectId", auth, updateProject);
router.delete("/:projectId", auth, deleteProject);

module.exports = router;
