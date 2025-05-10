
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '../components/Navigation';

const OrderSummaryPage = () => {
  const location = useLocation();
  const orderData = location.state?.orderData || {
    address: {
      fullName: 'John Doe',
      streetAddress: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'US',
      phoneNumber: '+1 234 567 8900'
    },
    shippingMethod: {
      name: 'Standard Shipping',
      days: '3-5',
      price: 5.99
    },
    paymentMethod: 'Cash on Delivery',
    items: [
      { name: 'Classic Denim Jacket', price: 59.99, quantity: 1 },
      { name: 'Leather Crossbody Bag', price: 79.99, quantity: 1 }
    ]
  };
  
  const calculateSubtotal = () => {
    return orderData.items.reduce((total: number, item: any) => {
      return total + (item.price * item.quantity);
    }, 0);
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + orderData.shippingMethod.price;
  };
  
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const orderDate = new Date().toLocaleDateString();
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3 flex items-center">
        <Link to="/" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Order Summary</h1>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="glass-card p-5 text-center">
          <h2 className="text-xl font-bold text-green-500">Thank You For Your Order!</h2>
          <p className="mt-2">Your order has been placed successfully.</p>
        </div>
        
        <div className="glass-card p-4">
          <div className="flex justify-between mb-3">
            <div>
              <h2 className="font-semibold">Order Number</h2>
              <p className="text-sm">{orderNumber}</p>
            </div>
            <div className="text-right">
              <h2 className="font-semibold">Date</h2>
              <p className="text-sm">{orderDate}</p>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-3 mb-3">
            <h2 className="font-semibold mb-2">Order Details</h2>
            {orderData.items.map((item: any, index: number) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/20 pt-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${orderData.shippingMethod.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          <address className="text-sm not-italic">
            {orderData.address.fullName}<br />
            {orderData.address.streetAddress}<br />
            {orderData.address.city}, {orderData.address.state} {orderData.address.zipCode}<br />
            {orderData.address.country}<br />
            {orderData.address.phoneNumber}
          </address>
        </div>
        
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Shipping Method</h2>
          <p className="text-sm">{orderData.shippingMethod.name} ({orderData.shippingMethod.days} business days)</p>
        </div>
        
        <div className="glass-card p-4">
          <h2 className="font-semibold mb-2">Payment Method</h2>
          <p className="text-sm">{orderData.paymentMethod}</p>
        </div>
        
        <Link 
          to="/"
          className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-full flex items-center justify-center hover:bg-primary"
        >
          Continue Shopping
        </Link>
      </div>
      
      <Navigation />
    </div>
  );
};

export default OrderSummaryPage;
