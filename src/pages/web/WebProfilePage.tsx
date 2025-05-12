
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Settings, ShoppingBag, Heart, HelpCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { WebLayout } from '../../components/layouts/WebLayout';

const WebProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/web/login');
  };

  if (!user) {
    return (
      <WebLayout>
        <div className="max-w-md mx-auto">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p className="mb-6 text-muted-foreground">Please login or create an account to view your profile</p>
            
            <div className="space-y-3">
              <Link to="/web/login" className="glass-button block w-full py-3 text-center rounded-lg transition-all hover:bg-white/30">
                Login
              </Link>
              <Link to="/web/register" className="bg-primary glass-button block w-full py-3 text-center rounded-lg text-primary-foreground transition-all hover:bg-primary/80">
                Create an Account
              </Link>
            </div>
          </div>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
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
                <Link to="/web/orders" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <ShoppingBag size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">My Orders</h3>
                      <p className="text-sm text-muted-foreground">View your order history</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/web/wishlist" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <Heart size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Wishlist</h3>
                      <p className="text-sm text-muted-foreground">Your saved items</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/web/chat" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <MessageSquare size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Chat with AI</h3>
                      <p className="text-sm text-muted-foreground">Get help from our AI assistant</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/web/account-settings" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
                  <div className="flex items-center">
                    <Settings size={24} className="mr-4" />
                    <div>
                      <h3 className="font-semibold">Account Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your account</p>
                    </div>
                  </div>
                </Link>
                
                <Link to="/web/help" className="glass-button p-6 rounded-xl hover:bg-white/30 transition-all">
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
    </WebLayout>
  );
};

export default WebProfilePage;
