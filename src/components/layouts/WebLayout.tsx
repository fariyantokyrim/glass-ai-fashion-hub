import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, User, MessageSquare, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const WebLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isMobile = useIsMobile();

  // If on mobile, redirect to mobile version
  React.useEffect(() => {
    if (isMobile) {
      const currentPath = location.pathname;
      if (currentPath.startsWith("/web")) {
        const mobilePath = currentPath.replace("/web", "");
        window.location.href = mobilePath || "/";
      }
    }
  }, [isMobile, location.pathname]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="glass sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/web" className="text-2xl font-bold">
            VisuAI
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/web"
              className={`transition-colors hover:text-primary ${
                isActive("/web") ? "text-primary font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/web/fashion"
              className={`transition-colors hover:text-primary ${
                isActive("/web/fashion") ? "text-primary font-medium" : ""
              }`}
            >
              Fashion
            </Link>
            <Link
              to="/web/cosmetics"
              className={`transition-colors hover:text-primary ${
                isActive("/web/cosmetics") ? "text-primary font-medium" : ""
              }`}
            >
              Cosmetics
            </Link>
            <Link
              to="/web/accessories"
              className={`transition-colors hover:text-primary ${
                isActive("/web/accessories") ? "text-primary font-medium" : ""
              }`}
            >
              Accessories
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/web/chat"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/web/chat") ? "text-primary" : ""
              }`}
            >
              <MessageSquare size={24} />
            </Link>
            <Link
              to="/web/cart"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/web/cart") ? "text-primary" : ""
              }`}
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              to="/web/profile"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/web/profile") ? "text-primary" : ""
              }`}
            >
              <User size={24} />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto py-6 px-4">{children}</main>

      {/* Footer */}
      <footer className="glass py-4">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>&copy; 2025 VisuAI. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link to="/web/help">Help & Support</Link>
            <Link to="/web/terms">Terms</Link>
            <Link to="/web/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
