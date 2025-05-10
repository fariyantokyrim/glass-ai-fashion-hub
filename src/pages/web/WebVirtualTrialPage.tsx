
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { getProductById } from '../../data/products';
import { useToast } from '../../hooks/use-toast';
import { WebLayout } from '../../components/layouts/WebLayout';

type UserMeasurements = {
  skinTone: string;
  faceShape?: string;
};

const WebVirtualTrialPage = () => {
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

  if (!isCosmetics && !isAccessories && !product) {
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
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button onClick={handleGoBack} className="glass-button p-3 rounded-full mr-4 transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl lg:text-3xl font-semibold">
            {isCosmetics ? "Cosmetics Virtual Trial" : "Accessories Virtual Try-On"}
          </h1>
        </div>

        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              {product && (
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
                    {isCosmetics ? 
                      "To create an accurate virtual makeup trial, please provide the following:" :
                      "To see how these accessories will look on you, please provide the following:"}
                  </p>
                </div>
              )}

              {!product && (
                <div className="glass-card p-6 mb-6">
                  <div className="text-center mb-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {isCosmetics ? "Cosmetics Virtual Trial" : "Accessories Virtual Try-On"}
                    </h2>
                    <p className="text-muted-foreground">
                      {isCosmetics ? 
                        "Try makeup products virtually with AI technology" : 
                        "Try accessories virtually with AI technology"}
                    </p>
                  </div>
                  
                  <p className="mb-4">
                    {isCosmetics ?
                      "To provide an accurate virtual makeup experience, please tell us about yourself:" :
                      "To create an accurate virtual accessories try-on, please tell us about yourself:"}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="glass-card p-6">
                <div className="space-y-4">
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
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium">Face Shape</label>
                    <select
                      name="faceShape"
                      value={measurements.faceShape}
                      onChange={handleChange}
                      className="glass-input w-full px-4 py-2 rounded-lg"
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
                    className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-lg mt-4 hover:bg-primary"
                  >
                    {isCosmetics ? "Continue to Virtual Makeup Trial" : "Continue to Virtual Try-On"}
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
              <div className="w-full aspect-square max-w-md mx-auto bg-black/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-white/30">
                <p className="text-muted-foreground text-center px-8">
                  Your virtual try-on will appear here after submitting your information
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold mb-4">
                {isCosmetics ? "AI Makeup Trial" : "AI Accessories Try-On"}
              </h2>
              
              <div className="glass p-6 rounded-lg w-full mb-6">
                <h3 className="font-medium mb-3">Your Information:</h3>
                <ul className="space-y-2">
                  <li>Skin Tone: {measurements.skinTone.replace('-', ' ')}</li>
                  {measurements.faceShape && <li>Face Shape: {measurements.faceShape}</li>}
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
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleGoBack}
                  className="glass-button flex-1 px-4 py-3 rounded-lg transition-all hover:bg-white/30"
                >
                  Try Different Parameters
                </button>
                <button 
                  onClick={() => product ? navigate(`/web/product/${product.id}`) : navigate(`/web/${isCosmetics ? 'cosmetics' : 'accessories'}`)}
                  className="bg-primary glass-button text-primary-foreground flex-1 px-4 py-3 rounded-lg hover:bg-primary"
                >
                  {product ? 'Return to Product' : `Browse ${isCosmetics ? 'Cosmetics' : 'Accessories'}`}
                </button>
              </div>
            </div>
            
            <div className="glass-card p-6 flex items-center justify-center">
              <div className="w-full max-w-md aspect-square bg-gray-100 rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="border-2 border-dashed border-gray-300 rounded-full w-64 h-64 flex items-center justify-center">
                    <div className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
                      <Camera size={32} className="text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-center py-3">
                  {isCosmetics ? "Try on virtual makeup - Filter: " + selectedFilter : "Try on virtual accessories - Filter: " + selectedFilter}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WebLayout>
  );
};

export default WebVirtualTrialPage;
