import { Link, useLocation } from "react-router-dom";
import { Calendar, Kanban, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div id="top-navbar" className="sticky top-0 z-50">
      <nav className="bg-[#62739a]">
        <div className="mx-4 px-2">
          <div className="flex h-12 items-center justify-between">
            {/* Left links */}
            <div className="flex space-x-6">
              <Link
                to="/"
                className={cn(
                  "flex items-center space-x-1 text-xs font-medium transition-colors hover:text-white",
                  location.pathname === "/" ? "text-white" : "text-white/50"
                )}
              >
                <Kanban className={cn("h-3 w-3 text-white",location.pathname === "/" ? "text-white" : "text-white/30")} />
                <span style={{ fontSize: '10pt' }}>Board</span>
              </Link>
              <Link
                to="/calendar"
                className={cn(
                  "flex items-center space-x-1 text-xs font-medium transition-colors hover:text-white",
                  location.pathname === "/calendar" ? "text-white" : "text-white/50"
                )}
              >
                <Calendar className={cn("h-3 w-3 text-white",location.pathname === "/calendar" ? "text-white" : "text-white/30")} />
                <span style={{ fontSize: '10pt' }}>Calendar</span>
              </Link>
            </div>

            {/* Right toggle button */}
            <div className="ml-auto">
              <button
                onClick={toggleTheme}
                className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {theme === "dark" ? (
                  <Sun size={24} className="white" />
                ) : (
                  <Moon size={24} className="text-white flex justify-end" fill="transparent" />
                )}
                <span className="sr-only">Toggle theme</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
