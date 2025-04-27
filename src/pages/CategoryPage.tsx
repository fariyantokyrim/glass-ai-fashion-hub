
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Search, ArrowLeft } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const products = category ? getProductsByCategory(category) : [];

  const formatCategoryName = (categoryName: string | undefined) => {
    if (!categoryName) return '';
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  };

  return (
    <div className="pb-20">
      {/* Header with search */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center">
          <Link to="/" className="glass-button p-2 mr-3 rounded-full">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold flex-1">
            {formatCategoryName(category)}
          </h1>
          <Link to="/search" className="glass-button p-2 rounded-full">
            <Search size={20} />
          </Link>
        </div>
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

      <Navigation />
    </div>
  );
};

export default CategoryPage;
