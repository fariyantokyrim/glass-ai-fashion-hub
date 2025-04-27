import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const fashionProducts = products.filter(product => product.category === 'fashion').slice(0, 4);
  const cosmeticsProducts = products.filter(product => product.category === 'cosmetics').slice(0, 4);
  const accessoriesProducts = products.filter(product => product.category === 'accessories').slice(0, 4);
  
  // Select featured products for the carousel
  const featuredProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="pb-20">
      {/* Header with search */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div className="p-4">
          <SearchResults query={searchQuery} />
        </div>
      )}
      
      {!searchQuery && (
        <>
          {/* Promo Banner */}
          <div className="mt-4 px-4">
            <div className="glass-card bg-gradient-to-r from-sky-400 to-blue-500 p-6 rounded-xl text-white">
              <h3 className="text-2xl font-bold mb-2">New Arrivals! 🎉</h3>
              <p className="text-white/90 mb-4">Get 50% off on all new products</p>
              <button 
                className="inline-block bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-all"
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Recommended Products Carousel - made smaller */}
          <div className="mt-4 px-4">
            <h2 className="text-lg font-semibold mb-2">Recommended</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {featuredProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-1 bg-white/50" />
              <CarouselNext className="right-1 bg-white/50" />
            </Carousel>
            <div className="flex justify-center mt-2">
              <div className="flex space-x-1">
                {[...Array(6)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-1.5 h-1.5 rounded-full bg-primary/50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Categories navigation */}
          <div className="px-4 mt-4">
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
              <Link to="/fashion" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all hover:bg-white/30">
                Fashion
              </Link>
              <Link to="/cosmetics" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all hover:bg-white/30">
                Cosmetics
              </Link>
              <Link to="/accessories" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm transition-all hover:bg-white/30">
                Accessories
              </Link>
            </div>
          </div>

          {/* Fashion products section */}
          <div className="mt-6 px-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Fashion</h2>
              <Link to="/fashion" className="text-sm text-primary">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {fashionProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Cosmetics products section */}
          <div className="mt-6 px-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Cosmetics</h2>
              <Link to="/cosmetics" className="text-sm text-primary">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {cosmeticsProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Accessories products section */}
          <div className="mt-6 px-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">Accessories</h2>
              <Link to="/accessories" className="text-sm text-primary">View all</Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {accessoriesProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}

      <Navigation />
    </div>
  );
};

export default Index;
