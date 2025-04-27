
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';

const HelpPage = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/profile" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="glass-card divide-y divide-white/20">
          <div className="flex items-center p-4">
            <span className="flex-1">FAQ</span>
          </div>
          
          <div className="flex items-center p-4">
            <span className="flex-1">Chat dengan CS</span>
          </div>
          
          <div className="flex items-center p-4">
            <span className="flex-1">Kebijakan Retur</span>
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
};

export default HelpPage;
