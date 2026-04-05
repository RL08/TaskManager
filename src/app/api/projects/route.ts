import { NextResponse } from "next/server";
import { getSession } from "@/src/lib/auth/auth";
import { getProjectsByUser, createProject } from "@/src/lib/models/projects";

export async function GET() {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const projects = await getProjectsByUser(session.user.id);
  return NextResponse.json(
    projects.map((p) => ({
      id: p._id!.toString(),
      name: p.name,
      tasks: p.tasks,
    })),
  );
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim())
    return NextResponse.json({ error: "Name required" }, { status: 400 });

  const project = await createProject(session.user.id, name.trim());
  return NextResponse.json({
    id: project._id!.toString(),
    name: project.name,
    tasks: [],
  });
}
