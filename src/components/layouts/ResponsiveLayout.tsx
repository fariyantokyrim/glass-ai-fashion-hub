
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WebLayout } from "./WebLayout";
import { Navigation } from "../Navigation";

export const ResponsiveLayout = ({ children }: { children: React.ReactNode }) => {
  const isMobile = useIsMobile();
  
  if (isMobile) {
    return (
      <div className="pb-20">
        {/* Mobile header */}
        <div className="glass sticky top-0 z-40 px-4 py-3">
          <div className="text-2xl font-bold text-center">VisuAI</div>
        </div>
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-4">{children}</main>
        
        {/* Mobile Navigation */}
        <Navigation />
      </div>
    );
  }
  
  // For desktop, use the WebLayout
  return <WebLayout>{children}</WebLayout>;
};
