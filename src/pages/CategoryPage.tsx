
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const products = category ? getProductsByCategory(category) : [];

  const formatCategoryName = (categoryName: string | undefined) => {
    if (!categoryName) return '';
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleVirtualTry = () => {
    if (category === 'fashion') {
      window.location.href = '/virtual-fitting/fashion';
    } else if (category === 'cosmetics') {
      window.location.href = '/virtual-trial/cosmetics';
    } else if (category === 'accessories') {
      window.location.href = '/virtual-trial/accessories';
    }
  };

  return (
    <div className="pb-20">
      {/* Header with search */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold flex-1">
            {formatCategoryName(category)}
          </h1>
        </div>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Search Results */}
      {searchQuery ? (
        <div className="p-4">
          <SearchResults query={searchQuery} />
        </div>
      ) : (
        <>
          {/* Virtual try button */}
          <div className="p-4">
            <button 
              onClick={handleVirtualTry}
              className="glass-button w-full py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/30"
            >
              Virtual Try with AI
            </button>
          </div>

          {/* Products grid */}
          <div className="p-4">
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">No products found</p>
              </div>
            )}
          </div>
        </>
      )}

      <Navigation />
    </div>
  );
};

export default CategoryPage;
