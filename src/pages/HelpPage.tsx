
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const HelpPage = () => {
  const isMobile = useIsMobile();

  // Mobile content
  const mobileContent = (
    <>
      <div className="flex items-center mb-2">
        <Link to="/profile" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Help & Support</h1>
      </div>

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
    </>
  );

  // Desktop content (based on the previous WebHelpPage)
  const desktopContent = (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all">
          <h2 className="text-xl font-semibold mb-4">FAQ</h2>
          <p className="text-muted-foreground">Find answers to commonly asked questions about our products and services.</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all">
          <h2 className="text-xl font-semibold mb-4">Chat dengan CS</h2>
          <p className="text-muted-foreground">Get in touch with our customer service team through live chat.</p>
        </div>
        
        <div className="glass-card p-6 rounded-xl hover:bg-white/20 transition-all">
          <h2 className="text-xl font-semibold mb-4">Kebijakan Retur</h2>
          <p className="text-muted-foreground">Learn about our return policy and how to process returns.</p>
        </div>
      </div>
      
      <div className="glass-card p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">Email</h3>
            <p className="text-muted-foreground">support@fandishop.com</p>
          </div>
          <div>
            <h3 className="font-medium mb-2">Phone</h3>
            <p className="text-muted-foreground">+1 (555) 123-4567</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout>
      {isMobile ? mobileContent : desktopContent}
    </ResponsiveLayout>
  );
};

export default HelpPage;
