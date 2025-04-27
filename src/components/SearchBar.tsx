
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={18} className="text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="glass-input w-full pl-10 pr-10 py-2 rounded-full text-sm"
        />
        {query.length > 0 && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </form>
  );
};
