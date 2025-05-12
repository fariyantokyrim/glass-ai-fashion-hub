
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Users, FolderOpen, Package, Home, Settings } from 'lucide-react';
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
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 to-blue-900">
      {/* Sidebar */}
      <aside className="w-64 bg-black/30 backdrop-blur-xl border-r border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-white ml-2">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="p-4 space-y-2">
          <Link to="/web" className="mb-6 flex w-full">
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
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
