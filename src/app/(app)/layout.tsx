import { SidebarProvider, SidebarTrigger } from "@/src/components/ui/sidebar";
import { AppSidebar } from "@/src/features/sidebar/components/app-sidebar";
import ProjectProvider from "@/src/features/project/lib/project-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <ProjectProvider>
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <SidebarTrigger />
          {children}
        </main>
      </ProjectProvider>
    </SidebarProvider>
  );
}
