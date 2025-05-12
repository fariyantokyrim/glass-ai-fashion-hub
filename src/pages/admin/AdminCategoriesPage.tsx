
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "../../components/ui/table";

const mockCategories = [
  { id: '1', name: 'Shirts', count: 24, description: 'All types of shirts' },
  { id: '2', name: 'Pants', count: 18, description: 'Jeans, slacks, and more' },
  { id: '3', name: 'Dresses', count: 32, description: 'Formal and casual dresses' },
  { id: '4', name: 'Shoes', count: 45, description: 'Footwear for all occasions' },
  { id: '5', name: 'Accessories', count: 56, description: 'Belts, jewelry, and more' },
];

const AdminCategoriesPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCategory = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding categories will be available in a future update",
    });
  };

  const handleEditCategory = (id: string) => {
    toast({
      title: "Feature coming soon",
      description: "Editing categories will be available in a future update",
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
    toast({
      title: "Category deleted",
      description: "The category has been successfully removed",
    });
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button className="gap-2" onClick={handleAddCategory}>
          <Plus size={16} />
          Add Category
        </Button>
      </div>

      <div className="glass-card p-6">
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Search Categories</label>
          <input
            type="text"
            placeholder="Search by name or description"
            className="glass-input w-full px-4 py-2 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/30">
                <TableHead className="px-4 py-3 text-left font-medium text-white">Name</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Products</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-white">Description</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.map(category => (
                <TableRow key={category.id} className="hover:bg-white/5 border-b border-white/10">
                  <TableCell className="px-4 py-3 font-medium">{category.name}</TableCell>
                  <TableCell className="px-4 py-3">{category.count}</TableCell>
                  <TableCell className="px-4 py-3">{category.description}</TableCell>
                  <TableCell className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditCategory(category.id)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No categories found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
