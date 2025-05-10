
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { products } from '../data/products';

// Mock data
const paymentMethods = [
  { id: 'credit_card', name: 'Credit Card', icon: <CreditCard size={18} /> },
  { id: 'paypal', name: 'PayPal', icon: '💳' },
  { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
  { id: 'cash_on_delivery', name: 'Cash on Delivery', icon: '💵' },
];

const shippingOptions = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, days: '3-5' },
  { id: 'express', name: 'Express Shipping', price: 12.99, days: '1-2' },
  { id: 'free', name: 'Free Shipping', price: 0, days: '5-7' },
];

// Mock cart items
const initialCartItems = [
  { productId: '1', quantity: 1 },
  { productId: '6', quantity: 1 },
];

const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingOption, setShippingOption] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const cartItems = initialCartItems.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product,
    };
  }).filter(item => item.product);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePaymentMethodSelect = (id: string) => {
    setPaymentMethod(id);
  };
  
  const handleShippingOptionSelect = (id: string) => {
    setShippingOption(id);
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };
  
  const getShippingPrice = () => {
    const option = shippingOptions.find(option => option.id === shippingOption);
    return option?.price || 0;
  };
  
  const calculateTotal = () => {
    return calculateSubtotal() + getShippingPrice();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
        variant: "destructive"
      });
      return;
    }
    
    if (!shippingOption) {
      toast({
        title: "Shipping option required",
        description: "Please select a shipping option",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase",
    });
    
    // In a real app, we would process payment and create order here
    
    // Navigate to order confirmation
    navigate('/order-confirmation');
  };
  
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3 flex items-center">
        <Link to="/cart" className="mr-3">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-xl font-semibold">Checkout</h1>
      </div>
      
      <div className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Shipping Address */}
          <div className="glass-card p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Shipping Address</h2>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={address.fullName}
                  onChange={handleInputChange}
                  className="glass-input w-full px-3 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm mb-1">Street Address</label>
                <input
                  type="text"
                  name="streetAddress"
                  value={address.streetAddress}
                  onChange={handleInputChange}
                  className="glass-input w-full px-3 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleInputChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-1">Country</label>
                  <select
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="ID">Indonesia</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={address.phoneNumber}
                  onChange={handleInputChange}
                  className="glass-input w-full px-3 py-2 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Shipping Options */}
          <div className="glass-card p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Shipping Method</h2>
            
            <div className="space-y-2">
              {shippingOptions.map((option) => (
                <label 
                  key={option.id}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                    shippingOption === option.id ? 'bg-primary/10 border border-primary/30' : 'glass'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="shippingOption"
                      value={option.id}
                      checked={shippingOption === option.id}
                      onChange={() => handleShippingOptionSelect(option.id)}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.days} business days
                      </div>
                    </div>
                  </div>
                  <div>
                    {option.price === 0 
                      ? <span className="text-green-500 font-medium">FREE</span> 
                      : <span className="font-medium">${option.price.toFixed(2)}</span>}
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Payment Method */}
          <div className="glass-card p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Payment Method</h2>
            
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <label 
                  key={method.id}
                  className={`flex items-center p-3 rounded-lg cursor-pointer ${
                    paymentMethod === method.id ? 'bg-primary/10 border border-primary/30' : 'glass'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={() => handlePaymentMethodSelect(method.id)}
                    className="mr-3"
                  />
                  <div className="flex items-center">
                    <span className="mr-2">{method.icon}</span>
                    <span>{method.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="glass-card p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {getShippingPrice() === 0 
                    ? 'Free' 
                    : `$${getShippingPrice().toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-white/20 pt-2 mt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-full flex items-center justify-center hover:bg-primary"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
