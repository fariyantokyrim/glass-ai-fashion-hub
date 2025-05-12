
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Search, Mail, Eye } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "../../components/ui/table";

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', orders: 12, spending: 1240 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', orders: 8, spending: 960 },
  { id: '3', name: 'Robert Johnson', email: 'robert@example.com', orders: 5, spending: 750 },
  { id: '4', name: 'Emma Williams', email: 'emma@example.com', orders: 15, spending: 1800 },
  { id: '5', name: 'Michael Brown', email: 'michael@example.com', orders: 3, spending: 450 },
];

const AdminCustomersPage = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewCustomer = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Customer details view will be available in a future update",
    });
  };

  const handleContactCustomer = (email: string) => {
    toast({
      title: "Email client opening",
      description: `Preparing to contact ${email}`,
    });
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search customers by name or email"
              className="glass-input w-full pl-10 pr-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/30">
                <TableHead className="px-4 py-3 text-left font-medium text-white">Customer</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Email</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Orders</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Total Spent</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => (
                <TableRow key={customer.id} className="hover:bg-white/5 border-b border-white/10">
                  <TableCell className="px-4 py-3 font-medium">{customer.name}</TableCell>
                  <TableCell className="px-4 py-3">{customer.email}</TableCell>
                  <TableCell className="px-4 py-3">{customer.orders}</TableCell>
                  <TableCell className="px-4 py-3">${customer.spending.toFixed(2)}</TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewCustomer(customer.id)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactCustomer(customer.email)}>
                        <Mail size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCustomers.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No customers found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCustomersPage;
