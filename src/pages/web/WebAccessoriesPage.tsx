
import React, { useState } from 'react';
import { WebLayout } from '../../components/layouts/WebLayout';
import { ProductCard } from '../../components/ProductCard';
import { getProductsByCategory } from '../../data/products';
import { SearchBar } from '../../components/SearchBar';
import { SearchResults } from '../../components/SearchResults';

const WebAccessoriesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const accessoriesProducts = getProductsByCategory('accessories');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <WebLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Accessories</h1>
        
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
                <p className="text-muted-foreground mb-4 md:mb-0">Try accessories virtually before you buy!</p>
              </div>
              <button className="glass-button px-6 py-3 rounded-xl text-base font-medium transition-all hover:bg-white/30">
                Virtual Try with AI
              </button>
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {accessoriesProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </WebLayout>
  );
};

export default WebAccessoriesPage;
