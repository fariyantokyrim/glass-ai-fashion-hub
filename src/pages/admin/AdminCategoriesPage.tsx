
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';

type Category = {
  id: string;
  name: string;
  description: string;
  productCount: number;
};

const initialCategories: Category[] = [
  {
    id: '1',
    name: 'Fashion',
    description: 'Clothing and apparel items',
    productCount: 4,
  },
  {
    id: '2',
    name: 'Cosmetics',
    description: 'Beauty and personal care products',
    productCount: 2,
  },
  {
    id: '3',
    name: 'Accessories',
    description: 'Bags, watches, and jewelry',
    productCount: 3,
  },
];

const AdminCategoriesPage = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    name: '',
    description: '',
  });
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddCategory = () => {
    const category = {
      id: Date.now().toString(),
      name: newCategory.name || '',
      description: newCategory.description || '',
      productCount: 0,
    };

    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '' });
    setIsAddDialogOpen(false);
    toast({
      title: 'Category Added',
      description: `${category.name} has been successfully added.`,
    });
  };

  const handleUpdateCategory = () => {
    if (!currentCategory) return;

    const updatedCategories = categories.map((cat) =>
      cat.id === currentCategory.id ? currentCategory : cat
    );

    setCategories(updatedCategories);
    setIsEditDialogOpen(false);
    toast({
      title: 'Category Updated',
      description: `${currentCategory.name} has been successfully updated.`,
    });
  };

  const handleDeleteCategory = () => {
    if (!currentCategory) return;

    const filteredCategories = categories.filter(
      (cat) => cat.id !== currentCategory.id
    );

    setCategories(filteredCategories);
    setIsDeleteDialogOpen(false);
    toast({
      title: 'Category Deleted',
      description: `${currentCategory.name} has been successfully deleted.`,
      variant: 'destructive',
    });
  };

  const openEditDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Category Management</h1>
        <Button className="gap-2" onClick={() => setIsAddDialogOpen(true)}>
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Products</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(category)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => openDeleteDialog(category)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {filteredCategories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  No categories found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category for your store.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Category Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border"
                value={newCategory.name || ''}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border"
                value={newCategory.description || ''}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>Update category details.</DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="space-y-4 py-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Category Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border"
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({ ...currentCategory, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCategory}>Update Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Category Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminCategoriesPage;
