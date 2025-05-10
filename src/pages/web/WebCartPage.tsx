
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { products } from '../../data/products';
import { WebLayout } from '../../components/layouts/WebLayout';

// Mock cart items
const initialCartItems = [
  { productId: '1', quantity: 1 },
  { productId: '6', quantity: 1 },
];

const WebCartPage = () => {
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
    <WebLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        
        {cartProducts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2">
              <div className="glass-card">
                {cartProducts.map(({ product, quantity }) => product && (
                  <div key={product.id} className="p-4 flex items-center border-b border-white/20 last:border-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <Link to={`/web/product/${product.id}`} className="font-medium">
                        {product.name}
                      </Link>
                      <div className="text-sm text-muted-foreground">{product.brand}</div>
                      <div className="text-sm mt-1">${product.price.toFixed(2)}</div>
                    </div>
                    <div className="flex items-center mr-4">
                      <button 
                        className="glass-button w-8 h-8 flex items-center justify-center rounded-full"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-4">{quantity}</span>
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
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            <div>
              <div className="glass-card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
                
                <Link 
                  to="/web/checkout"
                  className="mt-6 bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-full flex items-center justify-center hover:bg-primary"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-card p-12 text-center">
            <p className="mb-6 text-lg">Your cart is empty</p>
            <Link 
              to="/web"
              className="glass-button px-6 py-3 rounded-full inline-block transition-all hover:bg-white/30"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </WebLayout>
  );
};

export default WebCartPage;
