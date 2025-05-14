
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById } from '../data/products';
import { useToast } from '../hooks/use-toast';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { VirtualTryPreview } from '../components/ui/virtual-try-preview';

type UserMeasurements = {
  skinTone: string;
  faceShape?: string;
};

const VirtualTrialPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const product = id ? getProductById(id) : undefined;
  
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    skinTone: 'medium',
    faceShape: 'oval',
  });

  const [selectedFilter, setSelectedFilter] = useState<string>('Natural');
  const filters = ['Natural', 'Warm', 'Cool', 'Vintage', 'Bright'];
  
  const [submitted, setSubmitted] = useState(false);

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
    
    if (!measurements.skinTone) {
      toast({
        title: "Error",
        description: "Please select your skin tone",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitted(true);
    
    toast({
      title: "Information submitted",
      description: "Creating your virtual trial experience...",
    });
  };

  // Determine the type of product
  const isCosmetics = product?.category === 'cosmetics' || id === 'cosmetics';
  const isAccessories = product?.category === 'accessories' || id === 'accessories';
  const categoryType = isCosmetics ? 'cosmetics' : isAccessories ? 'accessories' : 'fashion';

  if (!isCosmetics && !isAccessories && !product) {
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
        <h1 className="text-lg font-semibold flex-1">
          {isCosmetics ? "Cosmetics Virtual Trial" : "Accessories Virtual Try-On"}
        </h1>
      </div>

      <div className="p-4">
        {!submitted ? (
          <>
            {product && (
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
                  {isCosmetics ? 
                    "To create an accurate virtual makeup trial, please provide the following:" :
                    "To see how these accessories will look on you, please provide the following:"}
                </p>
              </div>
            )}

            {!product && (
              <div className="glass-card p-4 mb-6">
                <div className="text-center mb-3">
                  <h2 className="font-semibold mb-2">
                    {isCosmetics ? "Cosmetics Virtual Trial" : "Accessories Virtual Try-On"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {isCosmetics ? 
                      "Try makeup products virtually with AI technology" : 
                      "Try accessories virtually with AI technology"}
                  </p>
                </div>
                
                <p className="text-sm mb-4">
                  {isCosmetics ?
                    "To provide an accurate virtual makeup experience, please tell us about yourself:" :
                    "To create an accurate virtual accessories try-on, please tell us about yourself:"}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
                
                <div>
                  <label className="block mb-1 text-sm">Face Shape</label>
                  <select
                    name="faceShape"
                    value={measurements.faceShape}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                  >
                    <option value="oval">Oval</option>
                    <option value="round">Round</option>
                    <option value="square">Square</option>
                    <option value="heart">Heart</option>
                    <option value="diamond">Diamond</option>
                    <option value="rectangle">Rectangle</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-lg mt-4 transition-all hover:bg-primary/80"
                >
                  {isCosmetics ? "Continue to Virtual Makeup Trial" : "Continue to Virtual Try-On"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="glass-card p-6 flex flex-col items-center w-full">
              <Camera size={48} className="mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">
                {isCosmetics ? "AI Cosmetics Trial" : "AI Accessories Try-On"}
              </h2>
              
              <VirtualTryPreview 
                categoryType={categoryType} 
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
                <h3 className="font-medium mb-2">Your Information:</h3>
                <ul className="space-y-1 text-sm">
                  <li>Skin Tone: {measurements.skinTone.replace('-', ' ')}</li>
                  {measurements.faceShape && <li>Face Shape: {measurements.faceShape}</li>}
                </ul>
              </div>
              
              <div className="w-full">
                <button 
                  onClick={() => setSubmitted(false)}
                  className="glass-button w-full px-4 py-2 rounded-lg mb-2 transition-all hover:bg-white/30"
                >
                  Try Different Parameters
                </button>
                <button 
                  onClick={() => product ? navigate(`/product/${product.id}`) : navigate(`/${isCosmetics ? 'cosmetics' : 'accessories'}`)}
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-2 rounded-lg transition-all hover:bg-primary/80"
                >
                  {product ? 'Return to Product' : `Browse ${isCosmetics ? 'Cosmetics' : 'Accessories'}`}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VirtualTrialPage;
