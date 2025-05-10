import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Tag, ShoppingCart, Users, Settings } from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-primary/20 text-primary" : "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/30 fixed left-0 top-0 h-full z-30">
        <div className="p-6 border-b border-white/30">
          <Link to="/admin" className="flex items-center">
            <h1 className="font-bold text-xl">VisuAI Admin</h1>
          </Link>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin/products"
                className={`flex items-center px-4 py-3 rounded-lg hover:bg-white/20 ${isActive(
                  "/admin/products"
                )}`}
              >
                <Package size={18} className="mr-3" />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/categories"
                className={`flex items-center px-4 py-3 rounded-lg hover:bg-white/20 ${isActive(
                  "/admin/categories"
                )}`}
              >
                <Tag size={18} className="mr-3" />
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/orders"
                className={`flex items-center px-4 py-3 rounded-lg hover:bg-white/20 ${isActive(
                  "/admin/orders"
                )}`}
              >
                <ShoppingCart size={18} className="mr-3" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/customers"
                className={`flex items-center px-4 py-3 rounded-lg hover:bg-white/20 ${isActive(
                  "/admin/customers"
                )}`}
              >
                <Users size={18} className="mr-3" />
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/settings"
                className={`flex items-center px-4 py-3 rounded-lg hover:bg-white/20 ${isActive(
                  "/admin/settings"
                )}`}
              >
                <Settings size={18} className="mr-3" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="ml-64 w-[calc(100%-16rem)] p-6">{children}</div>
    </div>
  );
};
