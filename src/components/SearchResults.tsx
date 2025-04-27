
import React from 'react';
import { ProductCard } from './ProductCard';
import { searchProducts, Product } from '../data/products';

interface SearchResultsProps {
  query: string;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const results = query ? searchProducts(query) : [];

  if (!query.trim()) {
    return null;
  }

  return (
    <div className="mt-3">
      <div className="mb-2 text-sm text-muted-foreground">
        {results.length} results for "{query}"
      </div>
      
      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-6 glass-card">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};
