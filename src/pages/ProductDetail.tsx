
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Star } from 'lucide-react';
import { getProductById } from '../data/products';
import { useToast } from '../hooks/use-toast';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isMobile = useIsMobile();
  
  const product = id ? getProductById(id) : undefined;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );
  
  if (!product) {
    return (
      <ResponsiveLayout>
        <div className="flex h-screen items-center justify-center">
          <p>Product not found</p>
        </div>
      </ResponsiveLayout>
    );
  }

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleTryOn = () => {
    if (product.category === 'fashion') {
      navigate(`/virtual-fitting/${id}`);
    } else if (product.category === 'cosmetics') {
      navigate(`/virtual-trial/${id}`);
    } else if (product.category === 'accessories') {
      navigate(`/accessories-trial/${id}`);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Mobile content
  const mobileContent = (
    <div className="pb-16">
      {/* Header */}
      <div className="glass sticky top-0 z-40 p-4">
        <div className="flex items-center">
          <button onClick={handleGoBack} className="glass-button p-2 rounded-full mr-2 transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold flex-1 truncate">Product Details</h1>
          <button 
            onClick={toggleWishlist}
            className="glass-button p-2 rounded-full transition-all hover:bg-white/30"
          >
            <Heart 
              size={20} 
              className={isWishlisted ? "fill-blue-300 text-blue-300" : ""} 
            />
          </button>
        </div>
      </div>

      {/* Product image */}
      <div className="aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product info */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-muted-foreground">
            {product.category} • {product.subcategory}
          </span>
        </div>
        
        <h1 className="text-2xl font-semibold mb-1">{product.name}</h1>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
            <span>{product.rating}</span>
          </div>
          <span className="mx-2">•</span>
          <span className="text-muted-foreground">{product.brand}</span>
        </div>

        <p className="mb-6 text-muted-foreground">{product.description}</p>

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 rounded-md transition-all hover:bg-primary/30 ${
                    selectedSize === size
                      ? "border-primary bg-primary/20"
                      : "glass-button"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`px-4 py-2 rounded-md transition-all hover:bg-primary/30 ${
                    selectedColor === color
                      ? "border-primary bg-primary/20"
                      : "glass-button"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 glass p-4 flex items-center">
          <div className="mr-4">
            <span className="text-sm text-muted-foreground">Price</span>
            <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="flex-1 grid grid-cols-2 gap-2">
            {(product.category === 'fashion' || product.category === 'cosmetics' || product.category === 'accessories') && (
              <button 
                onClick={handleTryOn}
                className="glass-button px-4 py-2 rounded-full text-sm transition-all hover:bg-white/30"
              >
                Virtual Try-On
              </button>
            )}
            <button 
              onClick={handleAddToCart}
              className="bg-primary glass-button text-primary-foreground px-4 py-2 rounded-full text-sm flex items-center justify-center space-x-2 transition-all hover:bg-primary/80"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop content
  const desktopContent = (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="glass-card p-4">
          <div className="aspect-square">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm text-muted-foreground">
              {product.category} • {product.subcategory}
            </span>
          </div>
          
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span>{product.rating}</span>
            </div>
            <span className="mx-2">•</span>
            <span className="text-muted-foreground">{product.brand}</span>
          </div>
          
          <p className="text-xl font-bold mb-2">${product.price.toFixed(2)}</p>

          <p className="mb-6 text-muted-foreground">{product.description}</p>

          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-md transition-all hover:bg-primary/30 ${
                      selectedSize === size
                        ? "border-primary bg-primary/20"
                        : "glass-button"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`px-4 py-2 rounded-md transition-all hover:bg-primary/30 ${
                      selectedColor === color
                        ? "border-primary bg-primary/20"
                        : "glass-button"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8">
            <button 
              onClick={handleAddToCart}
              className="bg-primary glass-button text-primary-foreground px-6 py-3 rounded-full text-base flex items-center justify-center space-x-2 transition-all hover:bg-primary/80 flex-1"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            
            <button 
              onClick={toggleWishlist}
              className="glass-button p-3 rounded-full transition-all hover:bg-white/30"
            >
              <Heart 
                size={20} 
                className={isWishlisted ? "fill-blue-300 text-blue-300" : ""} 
              />
            </button>
            
            {(product.category === 'fashion' || product.category === 'cosmetics' || product.category === 'accessories') && (
              <button 
                onClick={handleTryOn}
                className="glass-button px-6 py-3 rounded-full text-base flex-1 transition-all hover:bg-white/30"
              >
                Virtual Try-On
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <ResponsiveLayout>
      {isMobile ? mobileContent : desktopContent}
    </ResponsiveLayout>
  );
};

export default ProductDetail;
