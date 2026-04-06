"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/stores/store";
import { addTask } from "@/src/features/task/lib/task-slice";
import { TaskStatus } from "@/src/types/api";
import KanbanColumn from "@/src/features/task/components/kanban-column";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";

const columns: { key: TaskStatus; title: string }[] = [
  { key: "Not Started", title: "Not Started" },
  { key: "In Progress", title: "In Progress" },
  { key: "Completed", title: "Completed" },
];

export default function KanbanBoard() {
  const dispatch = useDispatch<AppDispatch>();
  const [newTask, setNewTask] = useState("");

  const projectId = useSelector(
    (state: RootState) => state.projects.selectedProjectId,
  );

  const project = useSelector((state: RootState) =>
    state.projects.items.find((p) => p.id === projectId),
  );

  if (!projectId || !project) {
    return (
      <div className="p-6 text-muted-foreground">
        Select a project to view tasks
      </div>
    );
  }

  const handleAdd = () => {
    const title = newTask.trim();
    if (!title) return;
    dispatch(addTask({ projectId, title }));
    setNewTask("");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">{project.name}</h1>

      {/* Add Task */}
      <div className="flex gap-4 mb-6">
        <Input
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          className="flex-1"
        />
        <Button onClick={handleAdd}>
          Add
        </Button>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => (
          <KanbanColumn
            key={col.key}
            title={col.title}
            tasks={project.tasks.filter((t) => t.status === col.key)}
            projectId={projectId}
          />
        ))}
      </div>
    </div>
  );
}
