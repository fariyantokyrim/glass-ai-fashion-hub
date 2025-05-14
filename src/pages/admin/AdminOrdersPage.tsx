
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

const mockOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: '2025-05-10', total: 120.50, status: 'Delivered', items: [
    {id: 1, name: 'Wool Sweater', quantity: 1, price: 89.50},
    {id: 2, name: 'Cotton Socks', quantity: 2, price: 15.50}
  ], address: '123 Main St, New York, NY 10001' },
  { id: '#ORD-002', customer: 'Jane Smith', date: '2025-05-09', total: 85.99, status: 'Processing', items: [
    {id: 3, name: 'Denim Jacket', quantity: 1, price: 85.99}
  ], address: '456 Broadway, New York, NY 10002' },
  { id: '#ORD-003', customer: 'Robert Johnson', date: '2025-05-08', total: 210.25, status: 'Shipped', items: [
    {id: 4, name: 'Leather Boots', quantity: 1, price: 160.25},
    {id: 5, name: 'Belt', quantity: 1, price: 50.00}
  ], address: '789 Park Ave, New York, NY 10003' },
  { id: '#ORD-004', customer: 'Emma Williams', date: '2025-05-07', total: 45.00, status: 'Cancelled', items: [
    {id: 6, name: 'Cotton T-Shirt', quantity: 3, price: 15.00}
  ], address: '321 Lexington Ave, New York, NY 10004' },
  { id: '#ORD-005', customer: 'Michael Brown', date: '2025-05-07', total: 310.75, status: 'Processing', items: [
    {id: 7, name: 'Winter Jacket', quantity: 1, price: 250.75},
    {id: 8, name: 'Wool Scarf', quantity: 1, price: 60.00}
  ], address: '654 5th Ave, New York, NY 10005' },
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
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handlePrintInvoice = (id: string) => {
    toast({
      title: "Generating invoice",
      description: `Preparing invoice for ${id}`,
    });
  };

  const handleEditStatus = (order: any) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setIsEditStatusOpen(true);
  };

  const handleUpdateStatus = () => {
    if (!selectedOrder) return;
    
    setOrders(prev => prev.map(order => 
      order.id === selectedOrder.id 
        ? { ...order, status: newStatus } 
        : order
    ));
    
    setIsEditStatusOpen(false);
    toast({
      title: "Status updated",
      description: `Order ${selectedOrder.id} status has been updated to ${newStatus}`,
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
                <TableHead className="px-4 py-3 text-left font-medium text-black">Order ID</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Customer</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Date</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Total</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Status</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-black">Actions</TableHead>
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
                      <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditStatus(order)}>
                        Edit
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

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium">Order ID:</p>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date:</p>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Customer:</p>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status:</p>
                  <p className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium">Shipping Address:</p>
                <p>{selectedOrder.address}</p>
              </div>
              
              <div className="mb-4">
                <p className="text-sm font-medium">Order Items:</p>
                <div className="mt-2 border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Item</th>
                        <th className="px-4 py-2 text-right">Quantity</th>
                        <th className="px-4 py-2 text-right">Price</th>
                        <th className="px-4 py-2 text-right">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2 text-right">{item.quantity}</td>
                          <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-2 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-50 font-semibold">
                        <td colSpan={3} className="px-4 py-2 text-right">Total:</td>
                        <td className="px-4 py-2 text-right">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditStatusOpen} onOpenChange={setIsEditStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="py-4">
              <p className="mb-2">Order: {selectedOrder.id}</p>
              <div>
                <label className="block mb-2 text-sm font-medium">Status</label>
                <select 
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleUpdateStatus}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
