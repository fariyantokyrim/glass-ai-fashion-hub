
import React, { useState } from 'react';
import { ResponsiveLayout } from '../components/layouts/ResponsiveLayout';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

const AccountSettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    notificationsEnabled: true,
    marketingEnabled: false,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    // Here you would update the user's information in a real app
    toast({
      title: "Settings updated",
      description: "Your account settings have been updated successfully",
    });
  };
  
  return (
    <ResponsiveLayout>
      <div className={`container mx-auto px-4 py-8 ${!isMobile ? "max-w-3xl" : ""}`}>
        <div className="mb-6 flex items-center">
          <Link to="/profile">
            <Button variant="outline" size="sm" className="mr-4">
              <ArrowLeft size={16} className="mr-2" />
              Back to Profile
            </Button>
          </Link>
          <h1 className={isMobile ? "text-xl font-bold" : "text-3xl font-bold"}>Account Settings</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">Leave blank to keep your current password</p>
              </div>
              
              <div>
                <label className="block mb-2 text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="glass-input w-full px-4 py-2 rounded-lg"
                />
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notificationsEnabled"
                  name="notificationsEnabled"
                  checked={formData.notificationsEnabled}
                  onChange={handleChange}
                  className="mr-3 h-4 w-4"
                />
                <label htmlFor="notificationsEnabled" className="text-sm">
                  Receive order status updates and shipping notifications
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="marketingEnabled"
                  name="marketingEnabled"
                  checked={formData.marketingEnabled}
                  onChange={handleChange}
                  className="mr-3 h-4 w-4"
                />
                <label htmlFor="marketingEnabled" className="text-sm">
                  Receive marketing emails about new products and promotions
                </label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Save size={16} />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </ResponsiveLayout>
  );
};

export default AccountSettingsPage;
