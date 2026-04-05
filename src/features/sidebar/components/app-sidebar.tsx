import * as React from "react";
import { NavProjects } from "@/src/features/project/components/nav-projects";
import { NavUser } from "@/src/features/sidebar/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar";
import { getSession } from "@/src/lib/auth/auth";

export async function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const session = await getSession();

  const user = {
    name: session?.user.name ?? "User",
    email: session?.user.email ?? "user@gmail.com",
    avatar: session?.user.image ?? "/avatar.png",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
