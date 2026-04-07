"use client";

import {
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import { Button } from "@/src/components/ui/button";
import { FolderIcon, PencilIcon, Trash2Icon } from "lucide-react";
import { NavProjectItemProps } from "@/src/types";

export function NavProjectItem({
  id,
  name,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: NavProjectItemProps) {
  const handleSelect = () => onSelect(id);

  const handleRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRename(id, name);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        onClick={handleSelect}
        className="cursor-pointer pr-16"
      >
        <FolderIcon />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>

      <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden items-center gap-0.5 group-hover/menu-item:flex">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-foreground"
          onClick={handleRename}
        >
          <PencilIcon size={13} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-muted-foreground hover:text-destructive"
          onClick={handleDelete}
        >
          <Trash2Icon size={13} />
        </Button>
      </div>
    </SidebarMenuItem>
  );
}
