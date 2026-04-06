"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/stores/hooks";
import {
  fetchProjects,
  addProject,
  renameProject,
  deleteProject,
  selectProject,
} from "@/src/features/project/lib/project-slice";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { FolderIcon, PencilIcon, PlusIcon, Trash2Icon } from "lucide-react";

export function NavProjects() {
  const dispatch = useAppDispatch();

  // ✅ Redux state
  const projects = useAppSelector((state) => state.projects.items);
  const selectedProjectId = useAppSelector(
    (state) => state.projects.selectedProjectId
  );
  const loading = useAppSelector((state) => state.projects.loading);

  // ✅ Fetch on mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Create dialog
  const [createOpen, setCreateOpen] = useState(false);
  const [createName, setCreateName] = useState("");

  // Rename dialog
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameId, setRenameId] = useState<string | null>(null);
  const [renameName, setRenameName] = useState("");

  function handleCreate() {
    if (!createName.trim()) return;
    dispatch(addProject(createName.trim()));
    setCreateName("");
    setCreateOpen(false);
  }

  function openRename(id: string, currentName: string) {
    setRenameId(id);
    setRenameName(currentName);
    setRenameOpen(true);
  }

  function handleRename() {
    if (!renameId || !renameName.trim()) return;
    dispatch(renameProject({ id: renameId, name: renameName.trim() }));
    setRenameOpen(false);
  }

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>

        <SidebarGroupAction
          title="Create Project"
          onClick={() => setCreateOpen(true)}
        >
          <PlusIcon />
          <span className="sr-only">Create Project</span>
        </SidebarGroupAction>

        <SidebarMenu>
          {loading && (
            <p className="px-2 py-1 text-xs text-muted-foreground animate-pulse">
              Loading projects...
            </p>
          )}

          {projects.length === 0 && !loading && (
            <p className="px-2 py-1 text-xs text-muted-foreground">
              No projects yet — hit + to create one.
            </p>
          )}

          {projects.map((project) => (
            <SidebarMenuItem key={project.id}>
              <SidebarMenuButton
                isActive={selectedProjectId === project.id}
                onClick={() => dispatch(selectProject(project.id))}
                className="cursor-pointer pr-16"
              >
                <FolderIcon />
                <span className="truncate">{project.name}</span>
              </SidebarMenuButton>

              <div className="absolute right-1 top-1/2 -translate-y-1/2 hidden items-center gap-0.5 group-hover/menu-item:flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    openRename(project.id, project.name);
                  }}
                >
                  <PencilIcon size={13} />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteProject(project.id));
                  }}
                >
                  <Trash2Icon size={13} />
                </Button>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>

      {/* Create dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Project name"
            value={createName}
            autoFocus
            onChange={(e) => setCreateName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!createName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename Project</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="New name"
            value={renameName}
            autoFocus
            onChange={(e) => setRenameName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleRename} disabled={!renameName.trim()}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}