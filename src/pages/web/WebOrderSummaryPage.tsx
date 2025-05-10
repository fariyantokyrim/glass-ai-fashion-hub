
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { WebLayout } from '../../components/layouts/WebLayout';

const WebOrderSummaryPage = () => {
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
    <WebLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/web" className="glass-button p-3 rounded-full mr-4">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-semibold">Order Summary</h1>
        </div>
        
        <div className="space-y-6 mb-10">
          <div className="glass-card p-8 text-center">
            <h2 className="text-2xl font-bold text-green-500">Thank You For Your Order!</h2>
            <p className="mt-2 text-lg">Your order has been placed successfully.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Order Number</h2>
                  <p>{orderNumber}</p>
                </div>
                <div className="text-right">
                  <h2 className="font-semibold text-lg">Date</h2>
                  <p>{orderDate}</p>
                </div>
              </div>
              
              <div className="border-t border-white/20 pt-4 mb-4">
                <h2 className="font-semibold text-lg mb-3">Order Details</h2>
                {orderData.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between mb-2">
                    <span>{item.name} (x{item.quantity})</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-white/20 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderData.shippingMethod.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="font-semibold text-lg mb-3">Shipping Address</h2>
                <address className="not-italic">
                  {orderData.address.fullName}<br />
                  {orderData.address.streetAddress}<br />
                  {orderData.address.city}, {orderData.address.state} {orderData.address.zipCode}<br />
                  {orderData.address.country}<br />
                  {orderData.address.phoneNumber}
                </address>
              </div>
              
              <div className="glass-card p-6">
                <h2 className="font-semibold text-lg mb-3">Shipping Method</h2>
                <p>{orderData.shippingMethod.name} ({orderData.shippingMethod.days} business days)</p>
              </div>
              
              <div className="glass-card p-6">
                <h2 className="font-semibold text-lg mb-3">Payment Method</h2>
                <p>{orderData.paymentMethod}</p>
              </div>
            </div>
          </div>
          
          <Link 
            to="/web"
            className="bg-primary glass-button text-primary-foreground w-full md:w-auto px-8 py-4 rounded-full flex items-center justify-center hover:bg-primary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </WebLayout>
  );
};

export default WebOrderSummaryPage;
