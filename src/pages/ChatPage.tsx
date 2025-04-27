
import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { ArrowLeft, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your FandiShop AI assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse: string;
      
      if (inputMessage.toLowerCase().includes('product') || inputMessage.toLowerCase().includes('item')) {
        aiResponse = "You can browse our products by category: Fashion, Cosmetics, and Accessories. Would you like me to recommend something specific?";
      } else if (inputMessage.toLowerCase().includes('virtual') || inputMessage.toLowerCase().includes('try')) {
        aiResponse = "Yes, we offer virtual try-on features for all categories! You can virtually try fashion items, cosmetics, and accessories using our AI technology.";
      } else if (inputMessage.toLowerCase().includes('sale') || inputMessage.toLowerCase().includes('discount')) {
        aiResponse = "We have several ongoing promotions! Check out our Fashion section for seasonal discounts of up to 30% off select items.";
      } else if (inputMessage.toLowerCase().includes('help') || inputMessage.toLowerCase().includes('question')) {
        aiResponse = "I'm here to help! You can ask me about products, virtual try-on features, your account, orders, or anything else related to FandiShop.";
      } else {
        aiResponse = "Thank you for your message! Is there anything specific you'd like to know about our products or services?";
      }
      
      const aiMessageObj: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessageObj]);
    }, 1000);
  };

  return (
    <div className="pb-20 flex flex-col h-screen">
      {/* Header */}
      <div className="glass sticky top-0 z-40 px-4 py-3">
        <div className="flex items-center">
          <Link to="/" className="glass-button p-2 mr-3 rounded-full transition-all hover:bg-white/30">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-semibold">AI Assistant</h1>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-xl ${
                  message.sender === 'user' 
                    ? 'bg-primary/20 rounded-tr-none' 
                    : 'glass-card rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-[10px] text-right text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 glass">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 glass-input rounded-full px-4 py-2 text-sm"
          />
          <button 
            type="submit"
            className="glass-button ml-2 p-2 rounded-full transition-all hover:bg-white/30"
            disabled={!inputMessage.trim()}
          >
            <Send size={20} className={!inputMessage.trim() ? 'opacity-50' : ''} />
          </button>
        </form>
      </div>
      
      <Navigation />
    </div>
  );
};

export default ChatPage;
