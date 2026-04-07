"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { NavProjectDialogProps } from "@/src/types";

export function NavProjectDialog({
  type,
  name,
  onNameChange,
  onClose,
  onSave,
}: NavProjectDialogProps) {
  return (
    <Dialog open={!!type} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {type === "create" ? "Create Project" : "Rename Project"}
          </DialogTitle>
        </DialogHeader>

        <Input
          placeholder="Project name"
          value={name}
          autoFocus
          onChange={(e) => onNameChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSave()}
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} disabled={!name.trim()}>
            {type === "create" ? "Create" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
