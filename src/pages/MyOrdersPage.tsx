
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';

const MyOrdersPage = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/profile" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">My Orders</h1>
        </div>
      </div>

      {/* Orders list */}
      <div className="p-4">
        <div className="glass-card p-6">
          <p className="text-center text-muted-foreground">No orders yet</p>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default MyOrdersPage;
