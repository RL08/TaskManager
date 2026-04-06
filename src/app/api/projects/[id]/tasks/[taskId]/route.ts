import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/auth/auth";
import {
  removeTask,
  updateTaskStatus,
  updateTaskTitle,
} from "@/src/features/task/services/task-service";
import { TaskStatus } from "@/src/types/api";

type Params = Promise<{ id: string; taskId: string }>;

export async function PATCH(req: Request, { params }: { params: Params }) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, taskId } = await params;
  const body = await req.json();

  if (body.title !== undefined) {
    await updateTaskTitle(id, session.user.id, taskId, body.title.trim());
  }
  if (body.status !== undefined) {
    await updateTaskStatus(
      id,
      session.user.id,
      taskId,
      body.status as TaskStatus,
    );
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id, taskId } = await params;
  await removeTask(id, session.user.id, taskId);
  return NextResponse.json({ ok: true });
}
