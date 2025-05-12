
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const FashionPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const fashionProducts = getProductsByCategory('fashion');
  const isMobile = useIsMobile();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Desktop view content
  const desktopContent = (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fashion</h1>
      
      {/* Search bar */}
      <div className="mb-8 max-w-xl">
        <SearchBar onSearch={handleSearch} />
      </div>

      {searchQuery ? (
        <div>
          <SearchResults query={searchQuery} />
        </div>
      ) : (
        <>
          {/* Virtual Try On Banner */}
          <div className="glass-card p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-2">Virtual Try-On</h2>
              <p className="text-muted-foreground mb-4 md:mb-0">Try fashion products virtually before you buy!</p>
            </div>
            <button className="glass-button px-6 py-3 rounded-xl text-base font-medium transition-all hover:bg-white/30">
              Virtual Try with AI
            </button>
          </div>
          
          {/* Products grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fashionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );

  // Mobile view content
  const mobileContent = (
    <>
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">Fashion</h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {searchQuery ? (
        <div className="p-4">
          <SearchResults query={searchQuery} />
        </div>
      ) : (
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {fashionProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <ResponsiveLayout>
      {isMobile ? mobileContent : desktopContent}
    </ResponsiveLayout>
  );
};

export default FashionPage;
