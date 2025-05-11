
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { useToast } from '../../hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Eye } from 'lucide-react';
import { Badge } from '../../components/ui/badge';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

type OrderItem = {
  id: string;
  productName: string;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  customerName: string;
  date: string;
  status: OrderStatus;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
};

const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'shipped':
      return 'bg-purple-500';
    case 'delivered':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'John Doe',
    date: '2025-05-08',
    status: 'delivered',
    totalAmount: 189.97,
    items: [
      { id: '1', productName: 'Classic Denim Jacket', quantity: 1, price: 59.99 },
      { id: '3', productName: 'Cotton Crew T-Shirt', quantity: 2, price: 19.99 },
      { id: '6', productName: 'Leather Crossbody Bag', quantity: 1, price: 79.99 },
    ],
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'ORD-002',
    customerName: 'Jane Smith',
    date: '2025-05-09',
    status: 'shipped',
    totalAmount: 57.49,
    items: [
      { id: '4', productName: 'Matte Lipstick', quantity: 1, price: 24.99 },
      { id: '5', productName: 'Moisturizing Face Cream', quantity: 1, price: 32.5 },
    ],
    shippingAddress: '456 Oak St, Los Angeles, CA 90001',
    paymentMethod: 'PayPal',
  },
  {
    id: 'ORD-003',
    customerName: 'Robert Johnson',
    date: '2025-05-10',
    status: 'processing',
    totalAmount: 89.98,
    items: [
      { id: '2', productName: 'Slim Fit Chinos', quantity: 1, price: 39.99 },
      { id: '7', productName: 'Aviator Sunglasses', quantity: 1, price: 49.99 },
    ],
    shippingAddress: '789 Pine St, Chicago, IL 60007',
    paymentMethod: 'Cash on Delivery',
  },
  {
    id: 'ORD-004',
    customerName: 'Emily Wilson',
    date: '2025-05-11',
    status: 'pending',
    totalAmount: 95.97,
    items: [
      { id: '3', productName: 'Cotton Crew T-Shirt', quantity: 3, price: 19.99 },
      { id: '9', productName: 'Long-lasting Mascara', quantity: 2, price: 18.99 },
    ],
    shippingAddress: '321 Maple Ave, Houston, TX 77001',
    paymentMethod: 'Credit Card',
  },
];

const AdminOrdersPage = () => {
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    setIsStatusDialogOpen(false);
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} has been updated to ${newStatus}.`,
    });
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setIsStatusDialogOpen(true);
  };

  const filteredOrders = orders.filter(order => 
    (statusFilter === 'all' || order.status === statusFilter) &&
    (order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
     order.customerName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Order Management</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">Search Orders</label>
            <input
              type="text"
              placeholder="Search by order ID or customer name"
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/4">
            <label className="block mb-2 text-sm font-medium">Filter by Status</label>
            <select
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map(order => (
                <TableRow key={order.id} className="hover:bg-white/5">
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewOrderDetails(order)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => openStatusDialog(order)}
                      >
                        Update Status
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Order ID: ${selectedOrder.id}`}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Customer Information</h3>
                  <div className="glass-card p-4">
                    <p className="mb-1"><span className="font-medium">Name:</span> {selectedOrder.customerName}</p>
                    <p><span className="font-medium">Shipping Address:</span> {selectedOrder.shippingAddress}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Order Information</h3>
                  <div className="glass-card p-4">
                    <p className="mb-1"><span className="font-medium">Date:</span> {selectedOrder.date}</p>
                    <p className="mb-1"><span className="font-medium">Status:</span> 
                      <Badge className={`${getStatusColor(selectedOrder.status)} text-white ml-2`}>
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                    </p>
                    <p><span className="font-medium">Payment Method:</span> {selectedOrder.paymentMethod}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Order Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Unit Price</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell className="text-right">{item.quantity}</TableCell>
                        <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} className="text-right font-bold">Total Amount:</TableCell>
                      <TableCell className="text-right font-bold">${selectedOrder.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={isStatusDialogOpen} onOpenChange={setIsStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Current status: ${selectedOrder.status}`}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Select New Status</label>
                <select
                  className="w-full px-4 py-2 rounded-lg border"
                  defaultValue={selectedOrder.status}
                  onChange={(e) => {
                    handleStatusChange(selectedOrder.id, e.target.value as OrderStatus);
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsStatusDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrdersPage;
