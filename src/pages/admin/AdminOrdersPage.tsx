
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Search, Eye, Printer } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "../../components/ui/table";

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2025-05-10', total: 120.50, status: 'Delivered' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2025-05-09', total: 85.99, status: 'Processing' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2025-05-08', total: 210.25, status: 'Shipped' },
  { id: '#ORD-004', customer: 'Emma Williams', date: '2025-05-07', total: 45.00, status: 'Cancelled' },
  { id: '#ORD-005', customer: 'Michael Brown', date: '2025-05-07', total: 310.75, status: 'Processing' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Delivered': return 'bg-green-500/20 text-green-500';
    case 'Processing': return 'bg-blue-500/20 text-blue-500';
    case 'Shipped': return 'bg-purple-500/20 text-purple-500';
    case 'Cancelled': return 'bg-red-500/20 text-red-500';
    default: return 'bg-gray-500/20 text-gray-500';
  }
};

const AdminOrdersPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleViewOrder = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Order details view will be available in a future update",
    });
  };

  const handlePrintInvoice = (id: string) => {
    toast({
      title: "Generating invoice",
      description: `Preparing invoice for ${id}`,
    });
  };

  // Filter orders based on search term and status
  const filteredOrders = orders.filter(order => 
    (statusFilter === 'All' || order.status === statusFilter) &&
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.id.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders by ID or customer"
              className="glass-input w-full pl-10 pr-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-64">
            <select
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/30">
                <TableHead className="px-4 py-3 text-left font-medium text-white">Order ID</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Customer</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Date</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Total</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Status</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id} className="hover:bg-white/5 border-b border-white/10">
                  <TableCell className="px-4 py-3 font-medium">{order.id}</TableCell>
                  <TableCell className="px-4 py-3">{order.customer}</TableCell>
                  <TableCell className="px-4 py-3">{order.date}</TableCell>
                  <TableCell className="px-4 py-3">${order.total.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order.id)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handlePrintInvoice(order.id)}>
                        <Printer size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
