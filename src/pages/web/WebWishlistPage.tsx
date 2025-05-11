
import React from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { ProductCard } from '../../components/ProductCard';
import { WebLayout } from '../../components/layouts/WebLayout';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';

// Get a sample of products for the wishlist
const sampleWishlistProducts = products.slice(0, 8); // Get first 8 products as sample

const WebWishlistPage = () => {
  return (
    <WebLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Link to="/web">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft size={16} className="mr-2" /> Back to Shopping
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <Heart size={24} className="mr-2 text-primary" /> My Wishlist
          </h1>
        </div>

        {sampleWishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sampleWishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="glass-card p-10 text-center">
            <h2 className="text-xl mb-4">Your wishlist is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Browse our catalog and add items you love to your wishlist
            </p>
            <Link to="/web">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </WebLayout>
  );
};

export default WebWishlistPage;
