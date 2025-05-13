
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, ShoppingBag, Heart, HelpCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/use-toast';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/login');
  };

  // Content for mobile view
  const mobileContent = () => {
    if (!user) {
      return (
        <div className="p-4 flex flex-col items-center">
          <div className="glass-card p-8 text-center w-full">
            <h2 className="text-xl font-semibold mb-4">Welcome!</h2>
            <p className="mb-6 text-muted-foreground">Please login or create an account to view your profile</p>
            
            <div className="space-y-3">
              <Link to="/login" className="glass-button block w-full py-3 text-center rounded-lg transition-all hover:bg-white/30">
                Login
              </Link>
              <Link to="/register" className="bg-primary glass-button block w-full py-3 text-center rounded-lg text-primary-foreground transition-all hover:bg-primary/80">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
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

        <div className="p-4">
          <div className="glass-card divide-y divide-white/20">
            <Link to="/orders" className="flex items-center p-4 transition-all hover:bg-white/10">
              <ShoppingBag size={20} className="mr-3" />
              <span className="flex-1">My Orders</span>
            </Link>
            
            <Link to="/wishlist" className="flex items-center p-4 transition-all hover:bg-white/10">
              <Heart size={20} className="mr-3" />
              <span className="flex-1">Wishlist</span>
            </Link>
            
            <Link to="/chat" className="flex items-center p-4 transition-all hover:bg-white/10">
              <MessageSquare size={20} className="mr-3" />
              <span className="flex-1">Chat with AI</span>
            </Link>
            
            <Link to="/account-settings" className="flex items-center p-4 transition-all hover:bg-white/10">
              <Settings size={20} className="mr-3" />
              <span className="flex-1">Account Settings</span>
            </Link>
            
            <Link to="/help" className="flex items-center p-4 transition-all hover:bg-white/10">
              <HelpCircle size={20} className="mr-3" />
              <span className="flex-1">Help & Support</span>
            </Link>
            
            <button 
              onClick={handleLogout}
              className="w-full text-left flex items-center p-4 text-red-500 transition-all hover:bg-white/10"
            >
              <LogOut size={20} className="mr-3" />
              <span className="flex-1">Logout</span>
            </button>
          </div>
        </div>
      </>
    );
  };

  // Content for desktop view
  const desktopContent = () => {
    if (!user) {
      return (
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="mb-6 text-muted-foreground">Please login or create an account to view your profile</p>
            
            <div className="space-y-3">
              <Link to="/login" className="glass-button block w-full py-3 text-center rounded-lg transition-all hover:bg-white/30">
                Login
              </Link>
              <Link to="/register" className="bg-primary glass-button block w-full py-3 text-center rounded-lg text-primary-foreground transition-all hover:bg-primary/80">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div>
            <div className="glass-card p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-semibold">{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <h2 className="font-semibold text-xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                
                <button 
                  onClick={handleLogout}
                  className="mt-6 flex items-center px-4 py-2 rounded-lg text-red-500 glass-button transition-all hover:bg-white/30"
                >
                  <LogOut size={18} className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Menu */}
          <div className="md:col-span-2">
            <div className="glass-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <Link to="/orders" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <ShoppingBag size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">My Orders</h3>
                      <p className="text-sm text-muted-foreground">View your order history</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/wishlist" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <Heart size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Wishlist</h3>
                      <p className="text-sm text-muted-foreground">Your saved items</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/chat" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <MessageSquare size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Chat with AI</h3>
                      <p className="text-sm text-muted-foreground">Get help from our AI assistant</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/account-settings" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <Settings size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Account Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your account</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/help" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <HelpCircle size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Help & Support</h3>
                      <p className="text-sm text-muted-foreground">Get help with your account</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ResponsiveLayout>
      {isMobile ? (
        <>
          <div className="glass sticky top-0 z-40 px-4 py-3">
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
          {mobileContent()}
        </>
      ) : (
        desktopContent()
      )}
    </ResponsiveLayout>
  );
};

export default ProfilePage;
