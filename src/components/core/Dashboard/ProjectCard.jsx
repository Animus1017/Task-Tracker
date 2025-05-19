import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../../../services/api";
import { removeProject } from "../../../redux/slices/projectSlice";
import CreateTaskModal from "./CreateTaskModal";

function ProjectCard({ project }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProject(project._id);
      dispatch(removeProject(project._id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleViewTasks = () => {
    navigate(`/project/${project._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{project.title}</h2>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="flex justify-between items-center">
        <button
          onClick={handleViewTasks}
          className="text-blue-500 hover:text-blue-700"
        >
          View Tasks
        </button>
        <button
          onClick={() => setIsCreateTaskModalOpen(true)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
        >
          Add Task
        </button>
      </div>

      <CreateTaskModal
        isOpen={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)}
        projectId={project._id}
      />
    </div>
  );
}

export default ProjectCard;
