import clientPromise from "@/src/lib/mongodb";
import { ProjectDocument } from "@/src/types/api";
import { ObjectId } from "mongodb";

async function getCollection() {
  const client = await clientPromise;
  return client.db().collection<ProjectDocument>("projects");
}

export async function getProjectsByUser(userId: string) {
  const col = await getCollection();
  return col.find({ userId }).sort({ createdAt: 1 }).toArray();
}

export async function createProject(userId: string, name: string) {
  const col = await getCollection();
  const doc: ProjectDocument = { userId, name, tasks: [], createdAt: new Date() };
  const result = await col.insertOne(doc);
  return { ...doc, _id: result.insertedId };
}

export async function renameProject(id: string, userId: string, name: string) {
  const col = await getCollection();
  return col.updateOne({ _id: new ObjectId(id), userId }, { $set: { name } });
}

export async function deleteProject(id: string, userId: string) {
  const col = await getCollection();
  return col.deleteOne({ _id: new ObjectId(id), userId });
}
