import { Home, Upload, BookOpen, MessageCircle, User, Sun, Moon, GraduationCap, Menu, X } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Upload", url: "/upload", icon: Upload },
  { title: "Question Bank", url: "/questions", icon: BookOpen },
  { title: "AI Chat", url: "/chat", icon: MessageCircle },
  { title: "Profile", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-5 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <GraduationCap className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-semibold text-foreground tracking-tight">ExamAce</span>
      </div>

      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            end={item.url === "/"}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeClassName="bg-accent text-accent-foreground"
            onClick={() => setMobileOpen(false)}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <button
          onClick={toggle}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground w-full"
        >
          {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border notion-shadow"
      >
        <Menu className="w-5 h-5 text-foreground" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[260px] bg-sidebar border-r border-sidebar-border z-50 md:hidden"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 p-1 rounded text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[240px] min-h-screen bg-sidebar border-r border-sidebar-border shrink-0">
        {sidebarContent}
      </aside>
    </>
  );
}
