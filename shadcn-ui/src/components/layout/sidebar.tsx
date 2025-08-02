import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  PenTool,
  Settings,
  TrendingUp,
  Twitter,
  Users,
} from "lucide-react";

// Use type instead of interface to avoid the empty interface lint error
type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const routes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/",
      active: location.pathname === "/",
    },
    {
      label: "Content Generator",
      icon: PenTool,
      href: "/content-generator",
      active: location.pathname === "/content-generator",
    },
    {
      label: "Scheduler",
      icon: Calendar,
      href: "/scheduler",
      active: location.pathname === "/scheduler",
    },
    {
      label: "Analytics",
      icon: BarChart3,
      href: "/analytics",
      active: location.pathname === "/analytics",
    },
    {
      label: "Trending Topics",
      icon: TrendingUp,
      href: "/trending",
      active: location.pathname === "/trending",
    },
    {
      label: "Connected Accounts",
      icon: Twitter,
      href: "/accounts",
      active: location.pathname === "/accounts",
    },
    {
      label: "Team",
      icon: Users,
      href: "/team",
      active: location.pathname === "/team",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      active: location.pathname === "/settings",
    },
  ];

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="mb-6 flex items-center gap-2">
            <div className="rounded-full bg-green-600 p-1.5 text-white">
              <Twitter size={20} />
            </div>
            <h2 className="text-lg font-semibold tracking-tight">
              $PEPUMP <span className="text-muted-foreground text-base">Marketing</span>
            </h2>
          </div>

          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-muted" : "hover:bg-muted"
                )}
                asChild
              >
                <Link to={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto px-4">
        <div className="p-4 bg-muted rounded-lg text-sm">
          <div className="font-medium mb-1 flex items-center gap-1.5">
            <div className="rounded-full bg-green-600 p-1 text-white">
              <Twitter size={14} />
            </div>
            Account Status
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            <span className="text-muted-foreground">Connected</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            @PePumpOfficial
          </div>
          <Button size="sm" className="w-full mt-2" variant="outline">
            <Settings className="mr-2 h-3 w-3" /> Configure
          </Button>
        </div>
      </div>
    </div>
  );
}