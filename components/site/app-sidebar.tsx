"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BarChart2,
  Home,
  LogOut,
  Scissors,
  Settings,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

import { SidebarLogo } from "./sidebar-logo";

const navItems = [
  { title: "Início", url: "/", icon: Home },
  { title: "Visão Geral", url: "/visao-geral", icon: BarChart2 },
  { title: "Salão de Beleza", url: "/salao-beleza", icon: Scissors },
  { title: "Terapia Capilar", url: "/terapia-capilar", icon: Sparkles },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    queryClient.clear();
    toast.success("Sessão encerrada");
    setShowLogoutDialog(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      <Sidebar {...props}>
        <SidebarHeader className="px-5 pt-7 pb-9">
          <SidebarLogo />
        </SidebarHeader>

        <SidebarContent className="px-3">
          <SidebarGroup className="p-0">
            <SidebarGroupContent>
              <SidebarMenu className="gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url);

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={
                          <Link
                            href={item.url}
                            className="flex w-full items-center gap-3"
                          >
                            <Icon />
                            <span className="whitespace-nowrap">
                              {item.title}
                            </span>
                          </Link>
                        }
                        isActive={isActive}
                        className="h-11 rounded-[1.5rem] px-3 text-[15px] font-medium text-[#c9bdbb] transition-colors hover:bg-[#3b2828] hover:text-[#f5eeeb] data-[active=true]:bg-[#432d2d] data-[active=true]:text-[#d7ad62] [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-[#c9bdbb] data-[active=true]:[&>svg]:text-[#d7ad62]"
                      />
                    </SidebarMenuItem>
                  );
                })}
                <div className="mb-3 h-px w-full bg-[#4a3636]" />
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      onClick={() => setShowLogoutDialog(true)}
                      className="h-11 rounded-[1.5rem] px-3 text-[15px] font-medium text-[#c9bdbb] hover:bg-[#3b2828] hover:text-[#f5eeeb] [&>svg]:size-5 [&>svg]:shrink-0 [&>svg]:text-[#c9bdbb] w-full flex items-center gap-3"
                    >
                      <LogOut />
                      <span>Sair</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      {/* Modal de Logout */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader className="items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-2">
              <LogOut className="h-6 w-6" />
            </div>
            <DialogTitle>Deseja realmente sair?</DialogTitle>
            <DialogDescription>
              Você precisará fazer login novamente para acessar os dados da
              conta.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowLogoutDialog(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleLogout}
              className="flex-1"
            >
              Sim, sair
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
