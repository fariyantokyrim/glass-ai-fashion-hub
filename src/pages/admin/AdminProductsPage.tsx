
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { products, Product } from '../../data/products';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  const { toast } = useToast();
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleDeleteProduct = (id: string) => {
    setProductsList(prev => prev.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted",
    });
  };

  // Improved search functionality
  const filteredProducts = productsList.filter(product => 
    (categoryFilter === 'all' || product.category === categoryFilter) && 
    (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <Link to="/admin/products/new">
          <Button className="gap-2">
            <Plus size={16} />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">Search Products</label>
            <input
              type="text"
              placeholder="Search by name, brand, or description"
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="md:w-1/4">
            <label className="block mb-2 text-sm font-medium">Filter by Category</label>
            <select
              className="glass-input w-full px-4 py-2 rounded-lg"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="fashion">Fashion</option>
              <option value="cosmetics">Cosmetics</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-white/30">
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="w-12 h-12 rounded overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">{product.brand}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3">{product.rating}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/admin/products/edit/${product.id}`}>
                          <Edit size={16} />
                        </Link>
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-lg text-muted-foreground">No products found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProductsPage;
