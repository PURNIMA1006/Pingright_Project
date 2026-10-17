import { NavLink } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import LanguageToggle from "@/components/LanguageToggle";
import {
  Columns3,
  History,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Settings as SettingsIcon,
  Sparkles,
  Users } from
"lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const NAV = [
{ to: "/", key: "nav.dashboard", icon: LayoutDashboard, end: true },
{ to: "/pipeline", key: "nav.pipeline", icon: Columns3 },
{ to: "/contacts", key: "nav.contacts", icon: Users },
{ to: "/tasks", key: "nav.tasks", icon: ListChecks },
{ to: "/activity", key: "nav.activity", icon: History },
{ to: "/paste-chat", key: "nav.pasteChat", icon: Sparkles }];


const itemClass = (collapsed, isActive) =>
cn(
  "flex min-h-12 items-center gap-3 rounded-xl py-3 text-base font-medium transition-colors",
  collapsed ? "justify-center px-0" : "px-3",
  isActive ? "bg-blue-50 text-blue-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
);

export function Brand({ compact = false }) {
  return (
    <div className={cn("flex items-center gap-2.5 px-5 py-4", compact && "justify-center px-0")}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 shadow-sm shadow-blue-600/30">
        <span className="h-2 w-2 rounded-full bg-white" />
        <span className="absolute inset-0 rounded-xl ring-4 ring-blue-600/10" />
      </span>
      {compact ? null :
      <span className="text-[17px] font-semibold tracking-tight text-slate-900">PingRight</span>
      }
    </div>);

}

export function SidebarNav({ onNavigate, collapsed = false }) {
  const { t } = useLanguage();

  return (
    <nav className="flex flex-col gap-1 px-3">
      {NAV.map((item) =>
      <NavLink
        key={item.to}
        to={item.to}
        end={item.end}
        onClick={onNavigate}
        title={collapsed ? t(item.key) : undefined}
        className={({ isActive }) => itemClass(collapsed, isActive)}>
        
          <item.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
          {collapsed ? null : t(item.key)}
        </NavLink>
      )}
    </nav>);

}

export function SidebarFooter({ collapsed = false }) {
  const { t } = useLanguage();

  const handleLogout = async () => {
    await base44.auth.logout();
  };

  return (
    <div className="space-y-2 border-t border-slate-100 p-3">
      <NavLink
        to="/settings"
        title={collapsed ? t("nav.settings") : undefined}
        className={({ isActive }) => itemClass(collapsed, isActive)}>
        
        <SettingsIcon className="h-5 w-5 shrink-0" strokeWidth={2} />
        {collapsed ? null : t("nav.settings")}
      </NavLink>

      {collapsed ? null : <LanguageToggle />}

      <button
        type="button"
        onClick={handleLogout}
        title={collapsed ? t("nav.logout") : undefined}
        className={cn(
          "flex min-h-12 w-full items-center gap-3 rounded-xl py-3 text-base font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900",
          collapsed ? "justify-center px-0" : "px-3"
        )}>
        
        <LogOut className="h-5 w-5 shrink-0" strokeWidth={2} />
        {collapsed ? null : t("nav.logout")}
      </button>
    </div>);

}

export default function AppSidebar({ collapsed = false }) {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-slate-200 bg-white transition-[width] duration-200 lg:flex",
        collapsed ? "w-20" : "w-64"
      )}>
      
      <Brand compact={collapsed} />
      <div className="flex-1 overflow-y-auto pb-4">
        <SidebarNav collapsed={collapsed} />
      </div>
      <SidebarFooter collapsed={collapsed} />
    </aside>);

}
