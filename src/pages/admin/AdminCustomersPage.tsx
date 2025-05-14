
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Search, Mail, Eye, Edit, Trash2, Plus } from 'lucide-react';
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

const mockCustomers = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com', 
    orders: 12, 
    spending: 1240,
    address: '123 Main St, San Francisco, CA 94105',
    phone: '(555) 123-4567',
    joinDate: '2024-01-15'
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    orders: 8, 
    spending: 960,
    address: '456 Market St, San Francisco, CA 94105',
    phone: '(555) 234-5678',
    joinDate: '2024-02-20'
  },
  { 
    id: '3', 
    name: 'Robert Johnson', 
    email: 'robert@example.com', 
    orders: 5, 
    spending: 750,
    address: '789 Mission St, San Francisco, CA 94105',
    phone: '(555) 345-6789',
    joinDate: '2024-03-10'
  },
  { 
    id: '4', 
    name: 'Emma Williams', 
    email: 'emma@example.com', 
    orders: 15, 
    spending: 1800,
    address: '101 Howard St, San Francisco, CA 94105',
    phone: '(555) 456-7890',
    joinDate: '2023-11-05'
  },
  { 
    id: '5', 
    name: 'Michael Brown', 
    email: 'michael@example.com', 
    orders: 3, 
    spending: 450,
    address: '555 California St, San Francisco, CA 94105',
    phone: '(555) 567-8901',
    joinDate: '2024-04-01'
  },
];

const AdminCustomersPage = () => {
  const { toast } = useToast();
  const [customers, setCustomers] = useState(mockCustomers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  const handleContactCustomer = (email: string) => {
    toast({
      title: "Email client opening",
      description: `Preparing to contact ${email}`,
    });
  };

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setEditForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    });
    setIsEditOpen(true);
  };

  const handleDeleteCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsDeleteOpen(true);
  };

  const handleAddCustomer = () => {
    setIsAddOpen(true);
    setNewCustomer({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  };

  const handleSaveEdit = () => {
    if (!selectedCustomer) return;
    
    setCustomers(prev => prev.map(customer => 
      customer.id === selectedCustomer.id 
        ? { 
            ...customer, 
            name: editForm.name, 
            email: editForm.email, 
            phone: editForm.phone, 
            address: editForm.address 
          } 
        : customer
    ));
    
    setIsEditOpen(false);
    toast({
      title: "Customer updated",
      description: `${editForm.name}'s information has been successfully updated`,
    });
  };

  const handleConfirmDelete = () => {
    if (!selectedCustomer) return;
    
    setCustomers(prev => prev.filter(customer => customer.id !== selectedCustomer.id));
    setIsDeleteOpen(false);
    
    toast({
      title: "Customer deleted",
      description: `${selectedCustomer.name}'s account has been successfully deleted`,
    });
  };

  const handleSaveNewCustomer = () => {
    const newId = (Math.max(...customers.map(c => parseInt(c.id))) + 1).toString();
    
    const customerToAdd = {
      id: newId,
      name: newCustomer.name,
      email: newCustomer.email,
      phone: newCustomer.phone,
      address: newCustomer.address,
      orders: 0,
      spending: 0,
      joinDate: new Date().toISOString().split('T')[0]
    };
    
    setCustomers(prev => [...prev, customerToAdd]);
    setIsAddOpen(false);
    
    toast({
      title: "Customer added",
      description: `${newCustomer.name} has been successfully added as a customer`,
    });
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <Button className="gap-2" onClick={handleAddCustomer}>
          <Plus size={16} />
          Add Customer
        </Button>
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
            <TableHeader className="bg-white/10">
              <TableRow className="border-b border-white/30">
                <TableHead className="px-4 py-3 text-left font-medium text-black">Customer</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Email</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Orders</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Total Spent</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-black">Actions</TableHead>
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
                      <Button variant="outline" size="sm" onClick={() => handleViewCustomer(customer)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleContactCustomer(customer.email)}>
                        <Mail size={16} />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteCustomer(customer)}>
                        <Trash2 size={16} />
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

      {/* Customer Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <p className="text-sm font-medium">Customer ID:</p>
                  <p>{selectedCustomer.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Join Date:</p>
                  <p>{selectedCustomer.joinDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Name:</p>
                  <p>{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email:</p>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone:</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Orders:</p>
                  <p>{selectedCustomer.orders}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Address:</p>
                  <p>{selectedCustomer.address}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm font-medium">Total Spent:</p>
                  <p className="font-semibold">${selectedCustomer.spending.toFixed(2)}</p>
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

      {/* Edit Customer Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Customer</DialogTitle>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="py-4 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Phone</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Address</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Alert Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the customer account for {selectedCustomer?.name}. 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Customer Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={newCustomer.name}
                onChange={(e) => setNewCustomer({...newCustomer, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={newCustomer.email}
                onChange={(e) => setNewCustomer({...newCustomer, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Phone</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={newCustomer.phone}
                onChange={(e) => setNewCustomer({...newCustomer, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={newCustomer.address}
                onChange={(e) => setNewCustomer({...newCustomer, address: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveNewCustomer}>Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCustomersPage;
