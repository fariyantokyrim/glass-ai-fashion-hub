
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';

const CosmeticsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const cosmeticsProducts = getProductsByCategory('cosmetics');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">Cosmetics</h1>
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
            {cosmeticsProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default CosmeticsPage;
