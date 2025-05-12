
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { SearchBar } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import { useIsMobile } from "@/hooks/use-mobile";
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 6);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const isMobile = useIsMobile();

  return (
    <ResponsiveLayout>
      <div className={isMobile ? "" : "max-w-6xl mx-auto"}>
        {/* Search bar */}
        <div className={isMobile ? "" : "mb-8 max-w-xl mx-auto"}>
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

            {/* Recommended Products Carousel */}
            <div className="mt-4 px-4">
              <h2 className="text-lg font-semibold mb-2">Recommended</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className={isMobile ? "md:basis-1/2 lg:basis-1/3" : "sm:basis-1/2 md:basis-1/3 lg:basis-1/4"}>
                      <div className="p-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className={isMobile ? "left-1 bg-white/50" : ""} />
                <CarouselNext className={isMobile ? "right-1 bg-white/50" : ""} />
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
            {isMobile && (
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
            )}

            {!isMobile && (
              <div className="mb-12 mt-12">
                <h2 className="text-2xl font-bold mb-6">Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link
                    to="/fashion"
                    className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-xl font-medium mb-2">Fashion</h3>
                    <p className="text-center text-muted-foreground">
                      Discover the latest trends in clothing
                    </p>
                  </Link>
                  <Link
                    to="/cosmetics"
                    className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-xl font-medium mb-2">Cosmetics</h3>
                    <p className="text-center text-muted-foreground">
                      Enhance your natural beauty
                    </p>
                  </Link>
                  <Link
                    to="/accessories"
                    className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-xl font-medium mb-2">Accessories</h3>
                    <p className="text-center text-muted-foreground">
                      Complete your look with accessories
                    </p>
                  </Link>
                </div>
              </div>
            )}

            {/* All Products */}
            <div className="mt-6 px-4 mb-6">
              <h2 className={isMobile ? "text-lg font-semibold mb-3" : "text-2xl font-bold mb-6"}>All Products</h2>
              <div className={isMobile ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ResponsiveLayout>
  );
};

export default Index;
