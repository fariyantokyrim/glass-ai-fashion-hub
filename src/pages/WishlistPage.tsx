
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const sampleWishlistProducts = products.slice(0, 4); // Get first 4 products as sample

const WishlistPage = () => {
  const isMobile = useIsMobile();
  
  // Mobile content
  const mobileContent = (
    <>
      <div className="flex items-center mb-2">
        <Link to="/profile" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Wishlist</h1>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {sampleWishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );

  // Desktop content
  const desktopContent = (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sampleWishlistProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );

  return (
    <ResponsiveLayout>
      {isMobile ? mobileContent : desktopContent}
    </ResponsiveLayout>
  );
};

export default WishlistPage;
