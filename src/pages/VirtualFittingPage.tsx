
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { getProductById } from '../data/products';
import { useToast } from '../hooks/use-toast';

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
    
    // Validate all fields are filled
    if (Object.values(measurements).some(value => !value)) {
      toast({
        title: "Error",
        description: "Please fill out all measurements",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitted(true);
    
    toast({
      title: "Measurements submitted",
      description: "Creating your virtual fitting experience...",
    });
  };

  if (!product) {
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
        <button onClick={handleGoBack} className="glass-button p-2 rounded-full mr-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold flex-1">Virtual Fitting</h1>
      </div>

      <div className="p-4">
        {!submitted ? (
          <>
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

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={measurements.height}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your height in cm"
                  />
                </div>
                
                <div>
                  <label className="block mb-1 text-sm">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={measurements.weight}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
                    placeholder="Enter your weight in kg"
                  />
                </div>
                
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
                
                <div>
                  <label className="block mb-1 text-sm">Skin Tone</label>
                  <select
                    name="skinTone"
                    value={measurements.skinTone}
                    onChange={handleChange}
                    className="glass-input w-full px-3 py-2 rounded-lg"
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
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-3 rounded-lg mt-4"
                >
                  Continue to Virtual Fitting
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="glass-card p-6 flex flex-col items-center">
              <Camera size={48} className="mb-4 text-primary" />
              <h2 className="text-xl font-semibold mb-2">AI Virtual Fitting</h2>
              <p className="text-center text-muted-foreground mb-6">
                In a real app, an AI-powered virtual fitting would display here,
                showing how {product.name} would look on you based on your measurements.
              </p>
              
              <div className="glass p-4 rounded-lg w-full mb-4">
                <h3 className="font-medium mb-2">Your Measurements:</h3>
                <ul className="space-y-1 text-sm">
                  <li>Height: {measurements.height} cm</li>
                  <li>Weight: {measurements.weight} kg</li>
                  <li>Chest Size: {measurements.chestSize} cm</li>
                  <li>Skin Tone: {measurements.skinTone.replace('-', ' ')}</li>
                </ul>
              </div>
              
              <div className="w-full">
                <button 
                  onClick={handleGoBack}
                  className="glass-button w-full px-4 py-2 rounded-lg mb-2"
                >
                  Try Different Measurements
                </button>
                <button 
                  onClick={() => navigate(`/product/${id}`)}
                  className="bg-primary glass-button text-primary-foreground w-full px-4 py-2 rounded-lg"
                >
                  Return to Product
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
