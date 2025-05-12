
import React, { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { Button } from '../../components/ui/button';
import { useToast } from '../../hooks/use-toast';
import { useAuth } from '../../contexts/AuthContext';
import { Save } from 'lucide-react';

const AdminAccountSettingsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@example.com',
    password: '',
    confirmPassword: '',
    darkMode: true,
    emailNotifications: true
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
    
    toast({
      title: "Settings updated",
      description: "Your account settings have been updated successfully",
    });
  };
  
  return (
    <AdminLayout>
      <div className="glass-card p-6 mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>
      
      <form onSubmit={handleSubmit} className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
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
            
            <h2 className="text-xl font-semibold mb-4 mt-8">Security</h2>
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
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleChange}
                  className="mr-3 h-4 w-4"
                />
                <label htmlFor="darkMode" className="text-sm">
                  Use dark mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleChange}
                  className="mr-3 h-4 w-4"
                />
                <label htmlFor="emailNotifications" className="text-sm">
                  Receive email notifications
                </label>
              </div>
              
              <div className="mt-8 glass-card p-4 bg-white/5">
                <h3 className="font-medium mb-2">Account Info</h3>
                <p className="text-sm text-muted-foreground">Role: Administrator</p>
                <p className="text-sm text-muted-foreground">Last login: May 12, 2025</p>
                <p className="text-sm text-muted-foreground">Account created: January 15, 2025</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button type="submit" className="gap-2">
            <Save size={16} />
            Save Changes
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default AdminAccountSettingsPage;
