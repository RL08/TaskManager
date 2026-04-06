"use client";

import TaskCard from "@/src/features/task/components/task-card";
import { KanBanColumnProps } from "@/src/types";
import { Card, CardContent } from "@/src/components/ui/card";

export default function KanbanColumn({
  title,
  tasks,
  projectId,
}: KanBanColumnProps) {
  return (
    <Card className="rounded-2xl shadow bg-card">
      <CardContent className="p-4">
        <h2 className="font-semibold text-lg mb-4">{title}</h2>
        <div className="space-y-3">
          {tasks.length ? (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} projectId={projectId} />
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No tasks</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
