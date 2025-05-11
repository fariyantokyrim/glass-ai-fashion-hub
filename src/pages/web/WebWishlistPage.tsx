
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { WebLayout } from '../../components/layouts/WebLayout';
import { Button } from '../../components/ui/button';
import { ArrowLeft, Heart, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

// Get a sample of products for the wishlist
const initialWishlistProducts = products.slice(0, 8); // Get first 8 products as sample

const WebWishlistPage = () => {
  const { toast } = useToast();
  const [wishlistProducts, setWishlistProducts] = useState(initialWishlistProducts);

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistProducts(prev => prev.filter(product => product.id !== productId));
    toast({
      title: "Product removed",
      description: "Product has been removed from your wishlist",
    });
  };

  const handleClearAll = () => {
    setWishlistProducts([]);
    toast({
      title: "Wishlist cleared",
      description: "All products have been removed from your wishlist",
    });
  };

  return (
    <WebLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex items-center">
            <Link to="/web">
              <Button variant="outline" size="sm" className="mr-4">
                <ArrowLeft size={16} className="mr-2" /> Back to Shopping
              </Button>
            </Link>
            <h1 className="text-3xl font-bold flex items-center">
              <Heart size={28} className="mr-3 text-primary" /> My Wishlist
            </h1>
          </div>
          
          {wishlistProducts.length > 0 && (
            <div>
              <Button variant="outline" onClick={handleClearAll}>Clear All</Button>
            </div>
          )}
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistProducts.map(product => (
              <div key={product.id} className="glass-card p-4 relative group">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveFromWishlist(product.id)}
                >
                  <Trash2 size={16} />
                </Button>
                
                <Link to={`/web/product/${product.id}`}>
                  <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                </Link>
                
                <Link to={`/web/product/${product.id}`}>
                  <h3 className="font-medium text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                </Link>
                
                <div className="flex justify-between items-center">
                  <p className="font-semibold">${product.price.toFixed(2)}</p>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-10 text-center">
            <h2 className="text-2xl mb-4">Your wishlist is empty</h2>
            <p className="mb-6 text-muted-foreground">
              Browse our catalog and add items you love to your wishlist
            </p>
            <Link to="/web">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </WebLayout>
  );
};

export default WebWishlistPage;
