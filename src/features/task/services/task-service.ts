import clientPromise from "@/src/lib/mongodb";
import { ProjectDocument, TaskStatus } from "@/src/types/api";
import { ObjectId } from "mongodb";

async function getCollection() {
  const client = await clientPromise;
  return client.db().collection<ProjectDocument>("projects");
}

export async function addTask(
  projectId: string,
  userId: string,
  task: { id: string; title: string; status: TaskStatus },
) {
  const col = await getCollection();
  return col.updateOne(
    { _id: new ObjectId(projectId), userId },
    { $push: { tasks: task } },
  );
}

export async function updateTaskTitle(
  projectId: string,
  userId: string,
  taskId: string,
  title: string,
) {
  const col = await getCollection();
  return col.updateOne(
    { _id: new ObjectId(projectId), userId, "tasks.id": taskId },
    { $set: { "tasks.$.title": title } },
  );
}

export async function updateTaskStatus(
  projectId: string,
  userId: string,
  taskId: string,
  status: TaskStatus,
) {
  const col = await getCollection();
  return col.updateOne(
    { _id: new ObjectId(projectId), userId, "tasks.id": taskId },
    { $set: { "tasks.$.status": status } },
  );
}

export async function removeTask(
  projectId: string,
  userId: string,
  taskId: string,
) {
  const col = await getCollection();
  return col.updateOne(
    { _id: new ObjectId(projectId), userId },
    { $pull: { tasks: { id: taskId } } },
  );
}
