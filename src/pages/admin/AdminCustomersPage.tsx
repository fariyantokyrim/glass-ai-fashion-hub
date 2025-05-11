
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  orders: number;
  totalSpent: number;
};

const initialCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    joinDate: '2025-01-15',
    orders: 5,
    totalSpent: 345.75,
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 987-6543',
    address: '456 Oak St, Los Angeles, CA 90001',
    joinDate: '2025-02-20',
    orders: 3,
    totalSpent: 157.49,
  },
  {
    id: 'CUST-003',
    name: 'Robert Johnson',
    email: 'robert.johnson@example.com',
    phone: '+1 (555) 456-7890',
    address: '789 Pine St, Chicago, IL 60007',
    joinDate: '2025-03-05',
    orders: 2,
    totalSpent: 89.98,
  },
  {
    id: 'CUST-004',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    phone: '+1 (555) 321-6547',
    address: '321 Maple Ave, Houston, TX 77001',
    joinDate: '2025-03-12',
    orders: 1,
    totalSpent: 95.97,
  },
  {
    id: 'CUST-005',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+1 (555) 876-5432',
    address: '567 Elm St, Phoenix, AZ 85001',
    joinDate: '2025-04-02',
    orders: 4,
    totalSpent: 278.45,
  },
  {
    id: 'CUST-006',
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    phone: '+1 (555) 234-5678',
    address: '890 Cedar Rd, Miami, FL 33101',
    joinDate: '2025-04-18',
    orders: 2,
    totalSpent: 127.99,
  },
];

type Order = {
  id: string;
  date: string;
  status: string;
  totalAmount: number;
  items: string;
};

const customerOrders: Record<string, Order[]> = {
  'CUST-001': [
    {
      id: 'ORD-001',
      date: '2025-05-08',
      status: 'Delivered',
      totalAmount: 189.97,
      items: 'Classic Denim Jacket, Cotton Crew T-Shirt (2), Leather Crossbody Bag',
    },
    {
      id: 'ORD-005',
      date: '2025-04-12',
      status: 'Delivered',
      totalAmount: 155.78,
      items: 'Floral Summer Dress, Moisturizing Face Cream, Aviator Sunglasses',
    },
  ],
  'CUST-002': [
    {
      id: 'ORD-002',
      date: '2025-05-09',
      status: 'Shipped',
      totalAmount: 57.49,
      items: 'Matte Lipstick, Moisturizing Face Cream',
    },
  ],
  'CUST-003': [
    {
      id: 'ORD-003',
      date: '2025-05-10',
      status: 'Processing',
      totalAmount: 89.98,
      items: 'Slim Fit Chinos, Aviator Sunglasses',
    },
  ],
  'CUST-004': [
    {
      id: 'ORD-004',
      date: '2025-05-11',
      status: 'Pending',
      totalAmount: 95.97,
      items: 'Cotton Crew T-Shirt (3), Long-lasting Mascara (2)',
    },
  ],
};

const AdminCustomersPage = () => {
  const [customers] = useState<Customer[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const viewCustomerDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailsDialogOpen(true);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-bold mb-6">Customer Management</h1>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Search Customers</label>
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            className="glass-input w-full px-4 py-2 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-white/5">
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.joinDate}</TableCell>
                  <TableCell>{customer.orders}</TableCell>
                  <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewCustomerDetails(customer)}
                    >
                      <Eye size={16} className="mr-2" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredCustomers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No customers found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
            <DialogDescription>
              {selectedCustomer && `Customer ID: ${selectedCustomer.id}`}
            </DialogDescription>
          </DialogHeader>

          {selectedCustomer && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                  <div className="glass-card p-4">
                    <p className="mb-1">
                      <span className="font-medium">Name:</span> {selectedCustomer.name}
                    </p>
                    <p className="mb-1">
                      <span className="font-medium">Email:</span> {selectedCustomer.email}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span> {selectedCustomer.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2">Address</h3>
                  <div className="glass-card p-4">
                    <p>{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Order History</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerOrders[selectedCustomer.id]?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell className="max-w-[200px] truncate" title={order.items}>
                          {order.items}
                        </TableCell>
                        <TableCell className="text-right">
                          ${order.totalAmount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {!customerOrders[selectedCustomer.id] && (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4">
                          No order history available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setIsDetailsDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCustomersPage;
