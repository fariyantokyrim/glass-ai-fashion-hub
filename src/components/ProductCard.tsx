
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const location = useLocation();
  const isWebView = location.pathname.startsWith('/web');
  const productLink = isWebView ? `/web/product/${product.id}` : `/product/${product.id}`;

  return (
    <Link to={productLink} className="block">
      <div className="glass-card p-3 h-full transition-transform hover:scale-105">
        <div className="aspect-square mb-3 bg-gray-100 rounded-lg overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
        <div className="flex items-center mt-1">
          <span className="text-sm font-bold">${product.price.toFixed(2)}</span>
          <div className="ml-auto flex items-center">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-xs ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{product.brand}</div>
      </div>
    </Link>
  );
};
