
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass">
      <div className="flex justify-around items-center p-3">
        <Link to="/" className={`p-2 ${isActive('/') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </div>
        </Link>
        
        <Link to="/search" className={`p-2 ${isActive('/search') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <Search size={24} />
            <span className="text-xs mt-1">Search</span>
          </div>
        </Link>
        
        <Link to="/cart" className={`p-2 ${isActive('/cart') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <ShoppingCart size={24} />
            <span className="text-xs mt-1">Cart</span>
          </div>
        </Link>
        
        <Link to="/profile" className={`p-2 ${isActive('/profile') ? 'active-nav-item' : ''}`}>
          <div className="flex flex-col items-center">
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
