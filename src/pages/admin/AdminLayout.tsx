
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Users, FolderOpen, Package, Home, Settings, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const location = useLocation();

  // Navigation menu items with icons
  const navItems = [
    { path: '/admin/products', label: 'Products', Icon: Package },
    { path: '/admin/categories', label: 'Categories', Icon: FolderOpen },
    { path: '/admin/orders', label: 'Orders', Icon: ShoppingBag },
    { path: '/admin/customers', label: 'Customers', Icon: Users },
    { path: '/admin/account-settings', label: 'Account Settings', Icon: Settings },
  ];
  
  // User info - in a real app this would come from an auth context
  const username = "Admin User";
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-900/30 to-purple-900/30">
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/10">
        <div className="p-4 border-b border-white/10">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white ml-2">VisuAI Admin</span>
          </Link>
          <div className="mt-2 text-sm text-white/70">{username}</div>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link to="/" className="mb-6 flex w-full">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Back to Store
            </Button>
          </Link>
          
          {navItems.map(({ path, label, Icon }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === path || location.pathname.startsWith(`${path}/`)
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 mr-3" />
              {label}
            </Link>
          ))}
          
          {/* Logout button */}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Button variant="ghost" className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="glass-card p-6 rounded-lg">
          {children}
        </div>
      </main>
    </div>
  );
};
