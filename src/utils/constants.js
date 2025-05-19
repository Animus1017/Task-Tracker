export const API_BASE_URL = "http://localhost:5000/api/v1";

export const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: "To Do",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.COMPLETED]: "Completed",
};

export const TASK_STATUS_COLORS = {
  [TASK_STATUS.TODO]: "bg-yellow-100 text-yellow-800",
  [TASK_STATUS.IN_PROGRESS]: "bg-blue-100 text-blue-800",
  [TASK_STATUS.COMPLETED]: "bg-green-100 text-green-800",
};

export const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
};
