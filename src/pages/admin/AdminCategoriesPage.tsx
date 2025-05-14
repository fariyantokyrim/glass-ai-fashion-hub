
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../components/ui/use-toast';
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<{
    id: string;
    name: string;
    count: number;
    description: string;
  } | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: ''
  });

  const handleAddCategory = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding categories will be available in a future update",
    });
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
    setEditForm({
      name: category.name,
      description: category.description
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const handleEditSave = () => {
    if (!currentCategory) return;
    
    setCategories(prev => prev.map(cat => 
      cat.id === currentCategory.id 
        ? { ...cat, name: editForm.name, description: editForm.description }
        : cat
    ));
    
    setIsEditDialogOpen(false);
    toast({
      title: "Category updated",
      description: `${editForm.name} has been successfully updated`,
    });
  };

  const handleDeleteConfirm = () => {
    if (!currentCategory) return;
    
    setCategories(prev => prev.filter(cat => cat.id !== currentCategory.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Category deleted",
      description: `${currentCategory.name} has been successfully removed`,
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
                <TableHead className="px-4 py-3 text-left font-medium text-black">Name</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Products</TableHead>
                <TableHead className="px-4 py-3 text-left font-medium text-black">Description</TableHead>
                <TableHead className="px-4 py-3 text-right font-medium text-black">Actions</TableHead>
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
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(category)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteClick(category)}>
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

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
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
              <label className="block mb-2 text-sm font-medium">Description</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
                value={editForm.description}
                onChange={(e) => setEditForm({...editForm, description: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleEditSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete "{currentCategory?.name}"? This action cannot be undone.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
