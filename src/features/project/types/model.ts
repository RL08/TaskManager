import { ObjectId } from "mongodb";

export type TaskStatus = "Not Started" | "In Progress" | "Completed";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

export type Project = {
  id: string;
  name: string;
  tasks: Task[];
};

export type ProjectDocument = {
  _id?: ObjectId;
  userId: string;
  name: string;
  tasks: { id: string; title: string; status: TaskStatus }[];
  createdAt: Date;
};

export type ProjectsState = {
  items: Project[];
  selectedProjectId: string | null;
  loading: boolean;
};
