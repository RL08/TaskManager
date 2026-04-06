import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/auth/auth";
import { renameProject, deleteProject } from "@/src/features/project/lib/project-model";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { name } = await req.json();
  if (!name?.trim())
    return NextResponse.json({ error: "Name required" }, { status: 400 });

  await renameProject(id, session.user.id, name.trim());
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await deleteProject(id, session.user.id);
  return NextResponse.json({ ok: true });
}
