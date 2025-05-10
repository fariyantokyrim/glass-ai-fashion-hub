
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { products } from '../../data/products';
import { WebLayout } from '../../components/layouts/WebLayout';

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

const WebCheckoutPage = () => {
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
    navigate('/web/order-confirmation');
  };
  
  return (
    <WebLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/web/cart" className="glass-button p-3 rounded-full mr-4 transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-3xl font-semibold">Checkout</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={address.fullName}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={address.phoneNumber}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={address.streetAddress}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={address.zipCode}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Country</label>
                  <select
                    name="country"
                    value={address.country}
                    onChange={handleInputChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
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
            </div>
            
            {/* Shipping Method */}
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
              
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label 
                    key={option.id}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
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
                        className="mr-4"
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
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <label 
                    key={method.id}
                    className={`flex items-center p-4 rounded-lg cursor-pointer ${
                      paymentMethod === method.id ? 'bg-primary/10 border border-primary/30' : 'glass'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => handlePaymentMethodSelect(method.id)}
                      className="mr-4"
                    />
                    <div className="flex items-center">
                      <span className="mr-3">{method.icon}</span>
                      <span className="font-medium">{method.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column - Order Summary */}
          <div>
            <div className="glass-card p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="border-b border-white/20 pb-4 mb-4">
                {cartItems.map(({ product, quantity }) => product && (
                  <div key={product.id} className="flex items-center py-2">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">Qty: {quantity}</div>
                    </div>
                    <div className="text-right">
                      ${(product.price * quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
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
                <div className="border-t border-white/20 pt-3 mt-3 flex justify-between font-semibold">
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
          </div>
        </form>
      </div>
    </WebLayout>
  );
};

export default WebCheckoutPage;
