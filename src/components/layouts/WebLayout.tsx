
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart, User, MessageSquare } from "lucide-react";

export const WebLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // For desktop, use the web layout
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Navigation */}
      <header className="glass sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            VisuAI
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-colors hover:text-primary ${
                isActive("/") ? "text-primary font-medium" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/fashion"
              className={`transition-colors hover:text-primary ${
                isActive("/fashion") ? "text-primary font-medium" : ""
              }`}
            >
              Fashion
            </Link>
            <Link
              to="/cosmetics"
              className={`transition-colors hover:text-primary ${
                isActive("/cosmetics") ? "text-primary font-medium" : ""
              }`}
            >
              Cosmetics
            </Link>
            <Link
              to="/accessories"
              className={`transition-colors hover:text-primary ${
                isActive("/accessories") ? "text-primary font-medium" : ""
              }`}
            >
              Accessories
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/chat"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/chat") ? "text-primary" : ""
              }`}
            >
              <MessageSquare size={24} />
            </Link>
            <Link
              to="/cart"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/cart") ? "text-primary" : ""
              }`}
            >
              <ShoppingCart size={24} />
            </Link>
            <Link
              to="/profile"
              className={`p-2 transition-all hover:bg-white/20 ${
                isActive("/profile") ? "text-primary" : ""
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
            <Link to="/help">Help & Support</Link>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
