
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Trash2, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { products } from '../data/products';

// Mock cart items
const initialCartItems = [
  { productId: '1', quantity: 1 },
  { productId: '6', quantity: 1 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();

  const cartProducts = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product);

  const removeItem = (productId: string) => {
    setCartItems(cartItems.filter(item => item.productId !== productId));
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart",
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartProducts.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <h1 className="text-xl font-semibold">Shopping Cart</h1>
      </div>

      {/* Cart items */}
      <div className="p-4">
        {cartProducts.length > 0 ? (
          <div className="glass-card divide-y divide-white/20">
            {cartProducts.map(({ product, quantity }) => product && (
              <div key={product.id} className="p-4 flex">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="ml-3 flex-1">
                  <Link to={`/product/${product.id}`} className="font-medium line-clamp-1">
                    {product.name}
                  </Link>
                  <div className="text-sm text-muted-foreground">{product.brand}</div>
                  <div className="text-sm mt-1">${product.price.toFixed(2)}</div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <button 
                        className="glass-button w-8 h-8 flex items-center justify-center rounded-full"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{quantity}</span>
                      <button 
                        className="glass-button w-8 h-8 flex items-center justify-center rounded-full"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(product.id)}
                      className="glass-button p-2 rounded-full text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-8 text-center">
            <p className="mb-4">Your cart is empty</p>
            <Link 
              to="/"
              className="glass-button px-4 py-2 rounded-full inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Summary */}
      {cartProducts.length > 0 && (
        <div className="p-4">
          <div className="glass-card p-4">
            <h2 className="font-semibold mb-4">Summary</h2>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-white/20 pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            
            <Link 
              to="/checkout"
              className="mt-4 bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-full flex items-center justify-center hover:bg-primary"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      )}

      <Navigation />
    </div>
  );
};

export default CartPage;
