import * as React from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/site/app-sidebar";
import { AppHeader } from "@/components/site/app-header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-background min-h-screen flex flex-col">
          <AppHeader />
          <main className="flex-1 flex flex-col p-8">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}