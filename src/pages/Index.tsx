
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';

const Index = () => {
  const fashionProducts = products.filter(product => product.category === 'fashion').slice(0, 4);
  const cosmeticsProducts = products.filter(product => product.category === 'cosmetics').slice(0, 4);
  const accessoriesProducts = products.filter(product => product.category === 'accessories').slice(0, 4);

  return (
    <div className="pb-20">
      {/* Header with search */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">GlassFashion</h1>
          <Link to="/search" className="glass-button p-2 rounded-full">
            <Search size={20} />
          </Link>
        </div>
      </div>

      {/* Featured banner */}
      <div className="p-4 mt-2">
        <div className="glass h-40 rounded-2xl flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/40 animate-pulse-slow overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent backdrop-blur-xs"></div>
          <div className="text-center z-10 p-4">
            <h2 className="text-2xl font-bold">AI Fashion Hub</h2>
            <p className="mt-2">Try virtual fitting with AI</p>
            <Link to="/fashion" className="inline-block mt-3 glass-button px-4 py-1.5 rounded-full text-sm">
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories navigation */}
      <div className="px-4 mt-4">
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          <Link to="/fashion" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm">
            Fashion
          </Link>
          <Link to="/cosmetics" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm">
            Cosmetics
          </Link>
          <Link to="/accessories" className="glass-button whitespace-nowrap px-4 py-2 rounded-full text-sm">
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

      <Navigation />
    </div>
  );
};

export default Index;
