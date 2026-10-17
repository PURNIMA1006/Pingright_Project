import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import AppSidebar, { Brand, SidebarFooter, SidebarNav } from "@/components/AppSidebar";
import Topbar from "@/components/Topbar";
import GlobalSearch from "@/components/crm/GlobalSearch";
import NotificationMenu from "@/components/crm/NotificationMenu";
import UserMenu from "@/components/crm/UserMenu";
import { Menu, Search, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Layout() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <AppSidebar collapsed={collapsed} />

      <div className={cn("flex min-h-screen flex-col", collapsed ? "lg:pl-20" : "lg:pl-64")}>
        <Topbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} user={user} />

        <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-2 border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:hidden">
          <Brand />
          <div className="flex items-center gap-0.5">
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("nav.search")}
              onClick={() => setSearchOpen((value) => !value)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <NotificationMenu />
            <UserMenu user={user} />
            <Button variant="ghost" size="icon" aria-label={t("nav.menu")} onClick={() => setMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {searchOpen ? (
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <GlobalSearch />
          </div>
        ) : null}

        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      </div>

      {menuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/30" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl">
            <div className="flex items-center justify-between pr-2">
              <Brand />
              <Button variant="ghost" size="icon" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto pb-4">
              <SidebarNav onNavigate={() => setMenuOpen(false)} />
            </div>
            <SidebarFooter />
          </div>
        </div>
      ) : null}
    </div>
  );
}
