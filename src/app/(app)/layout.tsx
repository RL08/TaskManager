import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/features/sidebar/components/app-sidebar";
import ProjectProvider from "@/src/features/project/lib/ProjectProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProjectProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger />
          {children}
        </main>
      </ProjectProvider>
    </SidebarProvider>
  );
}
