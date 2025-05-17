"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { BarChart, Home, LogOut, MessageSquare, Settings, Sparkles, User, Users, Zap, Briefcase } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user } = useAuth()

  const routes = [
    {
      title: "Tableau de bord",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/messages",
      active: pathname === "/messages",
    },
    {
      title: "Opportunités",
      icon: Users,
      href: "/opportunities",
      active: pathname === "/opportunities",
    },
    {
      title: "Détection",
      icon: Sparkles,
      href: "/opportunities/detection",
      active: pathname === "/opportunities/detection",
    },
    {
      title: "Optimisation",
      icon: User,
      href: "/profile-optimization",
      active: pathname === "/profile-optimization",
    },
    {
      title: "Automatisation",
      icon: Zap,
      href: "/automation",
      active: pathname === "/automation",
    },
    {
      title: "Analytics",
      icon: BarChart,
      href: "/analytics",
      active: pathname === "/analytics",
    },
    {
      title: "Offres d'emploi",
      icon: Briefcase,
      href: "/jobs",
      active: pathname === "/jobs",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2">
          <Image src="/logo.png" alt="LinkedBoost" width={32} height={32} />
          <span className="text-xl font-bold">LinkedBoost</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={route.active}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="p-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              {user?.name.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name || "Utilisateur"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "utilisateur@exemple.com"}</p>
            </div>
          </div>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>Paramètres</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/logout">
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
