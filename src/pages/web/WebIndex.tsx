import React, { useState } from "react";
import { Link } from "react-router-dom";
import { WebLayout } from "../../components/layouts/WebLayout";
import { ProductCard } from "../../components/ProductCard";
import { products } from "../../data/products";
import { SearchBar } from "../../components/SearchBar";
import { SearchResults } from "../../components/SearchResults";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const WebIndex = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featuredProducts = products.sort(() => Math.random() - 0.5).slice(0, 8);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <WebLayout>
      <div className="max-w-6xl mx-auto">
        {/* Search bar */}
        <div className="mb-8 max-w-xl mx-auto">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div>
            <SearchResults query={searchQuery} />
          </div>
        )}

        {!searchQuery && (
          <>
            {/* Hero Section */}
            <div className="glass-card bg-gradient-to-r from-sky-400 to-blue-500 p-10 rounded-2xl text-white mb-12">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-bold mb-4">
                  Welcome to VisuAI! 🎉
                </h1>
                <p className="text-xl mb-6">
                  Discover the latest trends in fashion, cosmetics, and
                  accessories.
                </p>
                <p className="text-white/90 mb-6">
                  Get 50% off on all new products
                </p>
                <button className="inline-block bg-white/20 hover:bg-white/30 px-6 py-3 rounded-full text-lg backdrop-blur-sm transition-all">
                  Shop Now
                </button>
              </div>
            </div>

            {/* Featured Products Carousel */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredProducts.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div className="p-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Categories</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Link
                  to="/web/fashion"
                  className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                >
                  <h3 className="text-xl font-medium mb-2">Fashion</h3>
                  <p className="text-center text-muted-foreground">
                    Discover the latest trends in clothing
                  </p>
                </Link>
                <Link
                  to="/web/cosmetics"
                  className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                >
                  <h3 className="text-xl font-medium mb-2">Cosmetics</h3>
                  <p className="text-center text-muted-foreground">
                    Enhance your natural beauty
                  </p>
                </Link>
                <Link
                  to="/web/accessories"
                  className="glass-card p-8 rounded-xl transition-all hover:bg-white/40 flex flex-col items-center justify-center"
                >
                  <h3 className="text-xl font-medium mb-2">Accessories</h3>
                  <p className="text-center text-muted-foreground">
                    Complete your look with accessories
                  </p>
                </Link>
              </div>
            </div>

            {/* All Products */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-6">All Products</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </WebLayout>
  );
};

export default WebIndex;
