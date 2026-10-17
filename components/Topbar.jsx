import { Button } from "@/components/ui/button";
import GlobalSearch from "@/components/crm/GlobalSearch";
import NotificationMenu from "@/components/crm/NotificationMenu";
import UserMenu from "@/components/crm/UserMenu";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

export default function Topbar({ collapsed, onToggleSidebar, user }) {
  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center gap-3 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:flex lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={onToggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="text-slate-500"
      >
        {collapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
      </Button>

      <GlobalSearch className="max-w-md flex-1" />

      <div className="ml-auto flex items-center gap-1">
        <NotificationMenu />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
