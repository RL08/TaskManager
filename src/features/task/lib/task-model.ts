import clientPromise from "@/src/lib/mongodb";
import { ProjectDocument, TaskStatus } from "@/src/types/model";
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
