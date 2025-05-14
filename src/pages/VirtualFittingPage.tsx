
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById } from '../data/products';
import { useToast } from '../hooks/use-toast';
import { VirtualTryPreview } from '../components/ui/virtual-try-preview';

type UserMeasurements = {
  height: string;
  weight: string;
  chestSize: string;
  skinTone: string;
};

const VirtualFittingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = id ? getProductById(id) : undefined;
  
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: '',
    weight: '',
    chestSize: '',
    skinTone: 'medium',
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('Natural');
  const filters = ['Natural', 'Warm', 'Cool', 'Vintage', 'Bright'];
  
  const [submitted, setSubmitted] = useState(false);

  // Special handling for category pages
  useEffect(() => {
    if (id === 'fashion' || id === 'cosmetics' || id === 'accessories') {
      setSubmitted(false);
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMeasurements(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields based on category
    if (id === 'fashion' || id === 'cosmetics' || id === 'accessories' || product?.category === 'fashion') {
      if (!measurements.height || !measurements.weight || !measurements.skinTone) {
        toast({
          title: "Error",
          description: "Please fill out all required measurements",
          variant: "destructive"
        });
        return;
      }
    }
    
    setSubmitted(true);
    
    toast({
      title: "Measurements submitted",
      description: "Creating your virtual fitting experience...",
    });
  };

  // Determine the virtual try-on type based on the id parameter
  const getVirtualTryTitle = () => {
    if (id === 'fashion' || product?.category === 'fashion') {
      return 'Fashion Virtual Try-On';
    } else if (id === 'cosmetics' || product?.category === 'cosmetics') {
      return 'Cosmetics Virtual Trial';
    } else if (id === 'accessories' || product?.category === 'accessories') {
      return 'Accessories Virtual Try-On';
    }
    return 'Virtual Try-On';
  };

  // Check if we're showing a category virtual try-on or a specific product
  const isCategory = id === 'fashion' || id === 'cosmetics' || id === 'accessories';
  const categoryType = isCategory ? id : product?.category;

  if (!isCategory && !product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="glass sticky top-0 z-40 p-4 flex items-center">
        <button onClick={handleGoBack} className="glass-button p-2 rounded-full mr-2 transition-all hover:bg-white/30">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold flex-1">{getVirtualTryTitle()}</h1>
      </div>

      <div className="p-4">
        {!submitted ? (
          <>
            {!isCategory && product && (
              <div className="glass-card p-4 mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 mr-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="text-sm text-muted-foreground">{product.brand}</p>
                  </div>
                </div>
                
                <p className="text-sm mb-4">
                  To create an accurate virtual fitting, please provide your measurements:
                </p>
              </div>
            )}

            {isCategory && (
              <div className="glass-card p-4 mb-6">
                <div className="text-center mb-3">
                  <h2 className="font-semibold mb-2">{getVirtualTryTitle()}</h2>
                  <p className="text-sm text-muted-foreground">
                    {categoryType === 'fashion' && 'Try on clothing virtually with AI technology'}
                    {categoryType === 'cosmetics' && 'Try makeup products virtually with AI technology'}
                    {categoryType === 'accessories' && 'Try accessories virtually with AI technology'}
                  </p>
                </div>
                
                <p className="text-sm mb-4">
                  To create an accurate virtual experience, please provide your measurements:
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">Height (cm) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="height"
                    value={measurements.height}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your height in cm"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm">Weight (kg) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    name="weight"
                    value={measurements.weight}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your weight in kg"
                    required
                  />
                </div>
                
                {(categoryType === 'fashion') && (
                  <div>
                    <label className="block mb-1 text-sm">Chest Size (cm)</label>
                    <input
                      type="number"
                      name="chestSize"
                      value={measurements.chestSize}
                      onChange={handleChange}
                      className="glass-input w-full px-3 py-2 rounded-lg"
                      placeholder="Enter your chest circumference"
                    />
                  </div>
                )}
                
                <div>
                  <label className="block mb-1 text-sm">Skin Tone <span className="text-red-500">*</span></label>
                  <select
                    name="skinTone"
                    value={measurements.skinTone}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    required
                  >
                    <option value="very-light">Very Light</option>
                    <option value="light">Light</option>
                    <option value="medium-light">Medium Light</option>
                    <option value="medium">Medium</option>
                    <option value="medium-dark">Medium Dark</option>
                    <option value="dark">Dark</option>
                    <option value="very-dark">Very Dark</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-lg mt-4 transition-all hover:bg-primary/80"
                >
                  Continue to Virtual Try-On
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="glass-card p-6 flex flex-col items-center w-full">
              <Camera size={48} className="mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">AI Virtual Try-On</h2>
              
              <VirtualTryPreview 
                categoryType={categoryType || 'fashion'} 
                filter={selectedFilter}
                className="mb-6"
              />
              
              <div className="w-full mb-6">
                <div className="flex items-center justify-between mb-2">
                  <ChevronLeft size={20} className="cursor-pointer" />
                  <div className="flex space-x-2 overflow-x-auto scrollbar-none">
                    {filters.map((filter) => (
                      <button
                        key={filter}
                        className={`px-3 py-1 text-xs rounded-full ${
                          selectedFilter === filter 
                            ? "bg-primary/20 border-primary" 
                            : "glass-button"
                        }`}
                        onClick={() => setSelectedFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                  <ChevronRight size={20} className="cursor-pointer" />
                </div>
              </div>
              
              <div className="glass p-4 rounded-lg w-full mb-4">
                <h3 className="font-medium mb-2">Your Measurements:</h3>
                <ul className="space-y-1 text-sm">
                  <li>Height: {measurements.height} cm</li>
                  <li>Weight: {measurements.weight} kg</li>
                  {measurements.chestSize && <li>Chest Size: {measurements.chestSize} cm</li>}
                  <li>Skin Tone: {measurements.skinTone.replace('-', ' ')}</li>
                </ul>
              </div>
              
              <div className="w-full">
                <button 
                  onClick={() => setSubmitted(false)}
                  className="glass-button w-full px-4 py-2 rounded-lg mb-2 transition-all hover:bg-white/30"
                >
                  Try Different Measurements
                </button>
                <button 
                  onClick={() => product ? navigate(`/product/${product.id}`) : navigate(`/${categoryType}`)}
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-2 rounded-lg transition-all hover:bg-primary/80"
                >
                  {product ? 'Return to Product' : `Browse ${categoryType}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualFittingPage;
