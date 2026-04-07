import { Task } from "@/src/types/api";

export type KanBanColumnProps = {
  title: string;
  tasks: Task[];
  projectId: string;
};

export type NavProjectItemProps = {
  id: string;
  name: string;
  isActive: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, name: string) => void;
  onDelete: (id: string) => void;
};

export type NavProjectDialogProps = {
  type: "create" | "rename" | null;
  name: string;
  onNameChange: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};
