
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User, MessageSquare } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className={`p-2 transition-all hover:bg-white/20 ${isActive('/') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        
        <Link to="/chat" className={`p-2 transition-all hover:bg-white/20 ${isActive('/chat') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <MessageSquare size={24} />
            <span className="text-xs mt-1">Chat</span>
          </div>
        </Link>
        
        <Link to="/cart" className={`p-2 transition-all hover:bg-white/20 ${isActive('/cart') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">Cart</span>
          </div>
        </Link>
        
        <Link to="/profile" className={`p-2 transition-all hover:bg-white/20 ${isActive('/profile') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
