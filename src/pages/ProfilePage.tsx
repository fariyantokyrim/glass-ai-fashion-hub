
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { LogOut, Settings, History, Heart, HelpCircle, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* User info */}
      <div className="p-4">
        <div className="glass-card p-6 flex items-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="ml-4">
            <h2 className="font-semibold text-lg">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="p-4">
        <div className="glass-card divide-y divide-white/20">
          <Link to="/orders" className="flex items-center p-4">
            <ShoppingBag size={20} className="mr-3" />
            <span className="flex-1">My Orders</span>
          </Link>
          
          <Link to="/wishlist" className="flex items-center p-4">
            <Heart size={20} className="mr-3" />
            <span className="flex-1">Wishlist</span>
          </Link>
          
          <Link to="/history" className="flex items-center p-4">
            <History size={20} className="mr-3" />
            <span className="flex-1">Browsing History</span>
          </Link>
          
          <Link to="/settings" className="flex items-center p-4">
            <Settings size={20} className="mr-3" />
            <span className="flex-1">Account Settings</span>
          </Link>
          
          <Link to="/help" className="flex items-center p-4">
            <HelpCircle size={20} className="mr-3" />
            <span className="flex-1">Help & Support</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full text-left flex items-center p-4 text-red-500"
          >
            <LogOut size={20} className="mr-3" />
            <span className="flex-1">Logout</span>
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default ProfilePage;
