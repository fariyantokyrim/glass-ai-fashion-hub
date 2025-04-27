
import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Search as SearchIcon, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { searchProducts, Product } from '../data/products';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setResults(searchProducts(query));
    } else {
      setResults([]);
    }
  }, [query]);

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <div className="pb-20">
      {/* Search header */}
      <div className="glass sticky top-0 z-40 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon size={18} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="glass-input w-full pl-10 pr-10 py-2 rounded-full text-sm"
          />
          {query.length > 0 && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      <div className="p-4">
        {query.trim().length > 0 ? (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              {results.length} results for "{query}"
            </div>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p>No products found</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">Type to search products</p>
          </div>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Search;
