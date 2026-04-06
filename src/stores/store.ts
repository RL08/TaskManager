import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "@/src/features/project/lib/project-slice";
import tasksReducer from "@/src/features/task/lib/task-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      projects: projectsReducer,
      tasks: tasksReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
