import React from 'react';
import { Input } from '@refhire/ui';
import { Search } from 'lucide-react';

export const SearchLine = () => {
  return (
    <div className="relative w-full max-w-md float">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="search"
        placeholder="Search..."
        className="w-full pl-10 bg-[#FAFAF7]"
      />
    </div>
  );
};
