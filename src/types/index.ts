import { Task } from "@/src/types/api";

export type KanBanColumnProps = {
  title: string;
  tasks: Task[];
  projectId: string;
};
