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
} from "@/src/components/ui/sidebar";

import { PlusIcon } from "lucide-react";
import { NavProjectDialog } from "./nav-project-dialog";
import { NavProjectItem } from "./nav-project-item";

export function NavProjects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((s) => s.projects.items);
  const selectedProjectId = useAppSelector((s) => s.projects.selectedProjectId);
  const loading = useAppSelector((s) => s.projects.loading);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Dialog state
  const [dialog, setDialog] = useState<{
    type: "create" | "rename" | null;
    projectId?: string;
    name: string;
  }>({ type: null, name: "" });

  // Handlers
  const handleOpenCreate = () => {
    setDialog({ type: "create", name: "" });
  };

  const handleOpenRename = (id: string, name: string) => {
    setDialog({ type: "rename", projectId: id, name });
  };

  const handleCloseDialog = () => {
    setDialog({ type: null, name: "" });
  };

  const handleSaveProject = () => {
    const name = dialog.name.trim();
    if (!name) return;

    if (dialog.type === "create") {
      dispatch(addProject(name));
    }

    if (dialog.type === "rename" && dialog.projectId) {
      dispatch(renameProject({ id: dialog.projectId, name }));
    }

    handleCloseDialog();
  };

  const handleSelectProject = (id: string) => {
    dispatch(selectProject(id));
  };

  const handleDeleteProject = (id: string) => {
    dispatch(deleteProject(id));
  };

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Projects</SidebarGroupLabel>
        <SidebarGroupAction title="Create Project" onClick={handleOpenCreate}>
          <PlusIcon />
        </SidebarGroupAction>
        <SidebarMenu>
          {loading && (
            <p className="px-2 py-1 text-xs text-muted-foreground animate-pulse">
              Loading projects...
            </p>
          )}
          {!loading && projects.length === 0 && (
            <p className="px-2 py-1 text-xs text-muted-foreground">
              No projects yet — hit + to create one.
            </p>
          )}
          {projects.map((project) => (
            <NavProjectItem
              key={project.id}
              id={project.id}
              name={project.name}
              isActive={selectedProjectId === project.id}
              onSelect={handleSelectProject}
              onRename={handleOpenRename}
              onDelete={handleDeleteProject}
            />
          ))}
        </SidebarMenu>
      </SidebarGroup>

      <NavProjectDialog
        type={dialog.type}
        name={dialog.name}
        onNameChange={(name) => setDialog({ ...dialog, name })}
        onClose={handleCloseDialog}
        onSave={handleSaveProject}
      />
    </>
  );
}
