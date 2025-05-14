
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { getProductById } from '../../data/products';
import { useToast } from '../../hooks/use-toast';
import { WebLayout } from '../../components/layouts/WebLayout';
import { VirtualTryPreview } from '../../components/ui/virtual-try-preview';

type UserMeasurements = {
  height: string;
  weight: string;
  chestSize: string;
  skinTone: string;
};

const WebVirtualFittingPage = () => {
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
      <WebLayout>
        <div className="flex items-center justify-center py-12">
          <p>Product not found</p>
        </div>
      </WebLayout>
    );
  }

  return (
    <WebLayout>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center mb-8">
          <button onClick={handleGoBack} className="glass-button p-3 rounded-full mr-4 transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl lg:text-3xl font-semibold">{getVirtualTryTitle()}</h1>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {!isCategory && product && (
                <div className="glass-card p-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 mr-5">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{product.name}</h2>
                      <p className="text-muted-foreground">{product.brand}</p>
                      <p className="mt-1">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                  
                  <p className="mb-4">
                    To create an accurate virtual fitting, please provide your measurements:
                  </p>
                </div>
              )}

              {isCategory && (
                <div className="glass-card p-6 mb-6">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold mb-2">{getVirtualTryTitle()}</h2>
                    <p className="text-muted-foreground">
                      {categoryType === 'fashion' && 'Try on clothing virtually with AI technology'}
                      {categoryType === 'cosmetics' && 'Try makeup products virtually with AI technology'}
                      {categoryType === 'accessories' && 'Try accessories virtually with AI technology'}
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    To create an accurate virtual experience, please provide your measurements:
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="glass-card p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Height (cm) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="height"
                      value={measurements.height}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-2 rounded-lg"
                      placeholder="Enter your height in cm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Weight (kg) <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      name="weight"
                      value={measurements.weight}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-2 rounded-lg"
                      placeholder="Enter your weight in kg"
                      required
                    />
                  </div>
                  
                  {(categoryType === 'fashion') && (
                    <div>
                      <label className="block mb-2 text-sm font-medium">Chest Size (cm)</label>
                      <input
                        type="number"
                        name="chestSize"
                        value={measurements.chestSize}
                        onChange={handleChange}
                        className="glass-input w-full px-4 py-2 rounded-lg"
                        placeholder="Enter your chest circumference"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Skin Tone <span className="text-red-500">*</span></label>
                    <select
                      name="skinTone"
                      value={measurements.skinTone}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-2 rounded-lg"
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
                    className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-lg mt-4 hover:bg-primary"
                  >
                    Continue to Virtual Try-On
                  </button>
                </div>
              </form>
            </div>
            
            <div className="glass-card p-6 flex flex-col items-center justify-center">
              <div className="text-center mb-6">
                <Camera size={48} className="mx-auto mb-4 text-primary" />
                <h2 className="text-xl font-semibold">AI-Powered Try-On</h2>
                <p className="text-muted-foreground mt-2">Fill out the form to see a preview here</p>
              </div>
              <div className="w-full max-w-md mx-auto">
                <VirtualTryPreview showLabel={false} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">
                AI Virtual Try-On
              </h2>
              
              <div className="glass p-6 rounded-lg w-full mb-6">
                <h3 className="font-medium mb-3">Your Measurements:</h3>
                <ul className="space-y-2">
                  <li>Height: {measurements.height} cm</li>
                  <li>Weight: {measurements.weight} kg</li>
                  {measurements.chestSize && <li>Chest Size: {measurements.chestSize} cm</li>}
                  <li>Skin Tone: {measurements.skinTone.replace('-', ' ')}</li>
                </ul>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Apply Filters:</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 text-sm rounded-full ${
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
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => setSubmitted(false)}
                  className="glass-button flex-1 px-4 py-3 rounded-lg transition-all hover:bg-white/30"
                >
                  Try Different Measurements
                </button>
                <button 
                  onClick={() => product ? navigate(`/web/product/${product.id}`) : navigate(`/web/${categoryType}`)}
                  className="bg-primary glass-button text-primary-foreground flex-1 px-4 py-3 rounded-lg hover:bg-primary"
                >
                  {product ? 'Return to Product' : `Browse ${categoryType}`}
                </button>
              </div>
            </div>
            
            <div className="glass-card p-6 flex items-center justify-center">
              <div className="w-full max-w-md">
                <VirtualTryPreview
                  categoryType={categoryType || 'fashion'}
                  filter={selectedFilter}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </WebLayout>
  );
};

export default WebVirtualFittingPage;
