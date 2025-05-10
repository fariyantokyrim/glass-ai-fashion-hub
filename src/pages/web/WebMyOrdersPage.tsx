
import React from 'react';
import { Package } from 'lucide-react';
import { WebLayout } from '../../components/layouts/WebLayout';

const sampleOrders = [
  {
    id: "1",
    date: "2024-04-27",
    status: "Delivered",
    items: [
      { name: "Classic Denim Jacket", price: 59.99, quantity: 1 },
      { name: "Cotton Crew T-Shirt", price: 19.99, quantity: 2 }
    ],
    total: 99.97
  },
  {
    id: "2",
    date: "2024-04-25",
    status: "Processing",
    items: [
      { name: "Matte Lipstick", price: 24.99, quantity: 1 }
    ],
    total: 24.99
  }
];

const WebMyOrdersPage = () => {
  return (
    <WebLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>
        
        <div className="space-y-6">
          {sampleOrders.map(order => (
            <div key={order.id} className="glass-card p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium text-lg">Order #{order.id}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  order.status === 'Delivered' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <div className="flex items-center">
                      <Package size={18} className="mr-3" />
                      <span>{item.name} (x{item.quantity})</span>
                    </div>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t border-white/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </WebLayout>
  );
};

export default WebMyOrdersPage;
