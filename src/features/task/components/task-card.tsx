"use client";

import { Task } from "@/src/types/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/stores/store";
import {
  deleteTask,
  renameTask,
  updateTaskStatus,
} from "@/src/features/task/lib/task-slice";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { ArrowBigRight, Trash2, Pencil } from "lucide-react";
import { useState } from "react";
import { TaskCardTextarea } from "@/src/features/task/components/task-card-textarea";

export default function TaskCard({
  task,
  projectId,
}: {
  task: Task;
  projectId: string;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleStatus = () => {
    if (task.status === "Not Started") {
      dispatch(
        updateTaskStatus({ projectId, taskId: task.id, status: "In Progress" }),
      );
    } else if (task.status === "In Progress") {
      dispatch(
        updateTaskStatus({ projectId, taskId: task.id, status: "Completed" }),
      );
    } else {
      dispatch(deleteTask({ projectId, taskId: task.id }));
    }
  };

  const handleSave = () => {
    if (title.trim() && title !== task.title) {
      dispatch(renameTask({ projectId, taskId: task.id, title }));
    }

    setEditing(false);
  };

  return (
    <Card className="relative group transition hover:shadow-md hover:-translate-y-0.5">
      <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
        {!editing && (
          <Button
            variant="ghost"
            size="icon"
            className="p-1"
            onClick={() => setEditing(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleStatus}
          className="p-1"
        >
          {task.status === "Completed" ? (
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-600 " />
          ) : (
            <ArrowBigRight className="w-4 h-4" />
          )}
        </Button>
      </div>

      <CardContent className="p-4 pt-8 relative z-0">
        <TaskCardTextarea
          value={title}
          editing={editing}
          onChange={setTitle}
          onSave={handleSave}
        />
      </CardContent>
    </Card>
  );
}
