
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import { Product, products } from '../../data/products';

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = id !== 'new';
  
  const [product, setProduct] = useState<Product>({
    id: '',
    name: '',
    price: 0,
    category: 'fashion',
    subcategory: '',
    image: '',
    description: '',
    brand: '',
    rating: 5,
    colors: [],
    sizes: []
  });
  
  const [currentColor, setCurrentColor] = useState('');
  const [currentSize, setCurrentSize] = useState('');
  
  useEffect(() => {
    if (isEditMode && id !== 'new') {
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        setProduct(existingProduct);
      } else {
        navigate('/admin/products');
        toast({
          title: "Product not found",
          description: "The product you're trying to edit doesn't exist",
          variant: "destructive"
        });
      }
    }
    // Don't need to do anything for new products - we already have default state
  }, [id, isEditMode, navigate, toast]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      setProduct(prev => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleAddColor = () => {
    if (currentColor && !product.colors?.includes(currentColor)) {
      setProduct(prev => ({
        ...prev,
        colors: [...(prev.colors || []), currentColor]
      }));
      setCurrentColor('');
    }
  };
  
  const handleRemoveColor = (color: string) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors?.filter(c => c !== color) || []
    }));
  };
  
  const handleAddSize = () => {
    if (currentSize && !product.sizes?.includes(currentSize)) {
      setProduct(prev => ({
        ...prev,
        sizes: [...(prev.sizes || []), currentSize]
      }));
      setCurrentSize('');
    }
  };
  
  const handleRemoveSize = (size: string) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes?.filter(s => s !== size) || []
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditMode) {
      toast({
        title: "Product updated",
        description: "The product has been successfully updated",
      });
    } else {
      // In a real app, we would generate a unique ID
      const newProduct = {
        ...product,
        id: Date.now().toString()
      };
      toast({
        title: "Product created",
        description: "The new product has been successfully created",
      });
    }
    
    navigate('/admin/products');
  };
  
  return (
    <AdminLayout>
      <div className="mb-6 flex items-center">
        <Button variant="outline" onClick={() => navigate('/admin/products')} className="mr-4">
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Basic Info */}
          <div className="glass-card p-6 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg min-h-[100px]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    min="0"
                    value={product.price}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Rating</label>
                  <input
                    type="number"
                    name="rating"
                    step="0.1"
                    min="1"
                    max="5"
                    value={product.rating}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  >
                    <option value="fashion">Fashion</option>
                    <option value="cosmetics">Cosmetics</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2 text-sm font-medium">Subcategory</label>
                  <input
                    type="text"
                    name="subcategory"
                    value={product.subcategory}
                    onChange={handleChange}
                    className="glass-input w-full px-4 py-2 rounded-lg"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          
          {/* Right column - Options */}
          <div className="space-y-6">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Colors</h2>
              
              <div className="flex mb-4">
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="glass-input flex-1 px-4 py-2 rounded-l-lg"
                  placeholder="Add a color"
                />
                <Button 
                  type="button"
                  onClick={handleAddColor} 
                  className="rounded-l-none"
                >
                  Add
                </Button>
              </div>
              
              {product.colors && product.colors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index} 
                      className="bg-white/30 px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="mr-2">{color}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveColor(color)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No colors added yet</p>
              )}
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Sizes</h2>
              
              <div className="flex mb-4">
                <input
                  type="text"
                  value={currentSize}
                  onChange={(e) => setCurrentSize(e.target.value)}
                  className="glass-input flex-1 px-4 py-2 rounded-l-lg"
                  placeholder="Add a size"
                />
                <Button 
                  type="button"
                  onClick={handleAddSize} 
                  className="rounded-l-none"
                >
                  Add
                </Button>
              </div>
              
              {product.sizes && product.sizes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size, index) => (
                    <div 
                      key={index} 
                      className="bg-white/30 px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="mr-2">{size}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(size)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No sizes added yet</p>
              )}
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              
              {product.image ? (
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={product.image}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <p className="text-muted-foreground">No image URL provided</p>
                </div>
              )}
              
              <Button type="submit" className="w-full">
                {isEditMode ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminProductForm;
