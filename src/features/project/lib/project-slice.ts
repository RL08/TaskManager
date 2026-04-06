import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Project, ProjectsState } from "@/src/types/api";
import {
  addTask,
  renameTask,
  updateTaskStatus,
  deleteTask,
} from "@/src/features/task/lib/task-slice";

export const fetchProjects = createAsyncThunk("projects/fetchAll", async () => {
  const res = await fetch("/api/projects");
  return res.json() as Promise<Project[]>;
});

export const addProject = createAsyncThunk(
  "projects/add",
  async (name: string) => {
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json() as Promise<Project>;
  },
);

export const renameProject = createAsyncThunk(
  "projects/rename",
  async ({ id, name }: { id: string; name: string }) => {
    await fetch(`/api/projects/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return { id, name };
  },
);

export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    return id;
  },
);

const initialState: ProjectsState = {
  items: [],
  selectedProjectId: null,
  loading: false,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    selectProject(state, action: PayloadAction<string>) {
      state.selectedProjectId =
        state.selectedProjectId === action.payload ? null : action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.selectedProjectId = action.payload.id;
      })
      .addCase(renameProject.fulfilled, (state, action) => {
        const project = state.items.find((p) => p.id === action.payload.id);
        if (project) project.name = action.payload.name;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.selectedProjectId === action.payload)
          state.selectedProjectId = null;
      })
      // task cross-slice listeners
      .addCase(addTask.fulfilled, (state, action) => {
        const p = state.items.find((p) => p.id === action.payload.projectId);
        if (p) p.tasks.push(action.payload.task);
      })
      .addCase(renameTask.fulfilled, (state, action) => {
        const p = state.items.find((p) => p.id === action.payload.projectId);
        const t = p?.tasks.find((t) => t.id === action.payload.taskId);
        if (t) t.title = action.payload.title;
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const p = state.items.find((p) => p.id === action.payload.projectId);
        const t = p?.tasks.find((t) => t.id === action.payload.taskId);
        if (t) t.status = action.payload.status;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const p = state.items.find((p) => p.id === action.payload.projectId);
        if (p) p.tasks = p.tasks.filter((t) => t.id !== action.payload.taskId);
      });
  },
});

export const { selectProject } = projectsSlice.actions;
export default projectsSlice.reducer;
