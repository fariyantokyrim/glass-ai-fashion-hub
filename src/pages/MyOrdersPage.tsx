
import React from 'react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { ArrowLeft, Package } from 'lucide-react';

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

const MyOrdersPage = () => {
  return (
    <div className="pb-20">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center mb-2">
          <Link to="/profile" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">My Orders</h1>
        </div>
      </div>

      {/* Orders list */}
      <div className="p-4 space-y-4">
        {sampleOrders.map(order => (
          <div key={order.id} className="glass-card p-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Order #{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <span className={`text-sm px-2 py-1 rounded-full ${
                order.status === 'Delivered' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Package size={16} className="mr-2" />
                    <span>{item.name} (x{item.quantity})</span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/20">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Navigation />
    </div>
  );
};

export default MyOrdersPage;
