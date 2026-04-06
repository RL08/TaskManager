import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/auth/auth";
import { randomUUID } from "crypto";
import { addTask } from "@/src/features/task/services/task-service";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { title } = await req.json();
  if (!title?.trim())
    return NextResponse.json({ error: "Title required" }, { status: 400 });

  const task = {
    id: randomUUID(),
    title: title.trim(),
    status: "Not Started" as const,
  };
  await addTask(id, session.user.id, task);
  return NextResponse.json(task);
}
