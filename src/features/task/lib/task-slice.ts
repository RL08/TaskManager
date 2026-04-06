import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task, TasksState, TaskStatus } from "@/src/types/api";

export const addTask = createAsyncThunk(
  "tasks/add",
  async ({ projectId, title }: { projectId: string; title: string }) => {
    const res = await fetch(`/api/projects/${projectId}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const task: Task = await res.json();
    return { projectId, task };
  },
);

export const renameTask = createAsyncThunk(
  "tasks/rename",
  async ({
    projectId,
    taskId,
    title,
  }: {
    projectId: string;
    taskId: string;
    title: string;
  }) => {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    return { projectId, taskId, title };
  },
);

export const updateTaskStatus = createAsyncThunk(
  "tasks/updateStatus",
  async ({
    projectId,
    taskId,
    status,
  }: {
    projectId: string;
    taskId: string;
    status: TaskStatus;
  }) => {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    return { projectId, taskId, status };
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async ({ projectId, taskId }: { projectId: string; taskId: string }) => {
    await fetch(`/api/projects/${projectId}/tasks/${taskId}`, {
      method: "DELETE",
    });
    return { projectId, taskId };
  },
);

const initialState: TasksState = {};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Task
    builder
      .addCase(addTask.fulfilled, (state, action) => {
        const { projectId, task } = action.payload;
        if (!state[projectId]) {
          state[projectId] = [];
        }
        state[projectId].push(task);
      })

      // Rename Task
      .addCase(renameTask.fulfilled, (state, action) => {
        const { projectId, taskId, title } = action.payload;
        const tasks = state[projectId];
        if (tasks) {
          const task = tasks.find((t) => t.id === taskId);
          if (task) {
            task.title = title;
          }
        }
      })

      // Update Task Status
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { projectId, taskId, status } = action.payload;
        const tasks = state[projectId];
        if (tasks) {
          const task = tasks.find((t) => t.id === taskId);
          if (task) {
            task.status = status;
          }
        }
      })

      // Delete Task
      .addCase(deleteTask.fulfilled, (state, action) => {
        const { projectId, taskId } = action.payload;
        const tasks = state[projectId];
        if (tasks) {
          state[projectId] = tasks.filter((t) => t.id !== taskId);
        }
      });
  },
});

export default tasksSlice.reducer;
