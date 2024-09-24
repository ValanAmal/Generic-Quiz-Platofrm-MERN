// src/components/common/SearchBar.tsx
import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="flex space-x-2 mb-8">
      <input
        type="text"
        placeholder="Search challenges..."
        className="px-4 py-2 border border-gray-300 rounded-md"
      />
      <button className="px-4 py-2 bg-green-500 text-white rounded-md">Search</button>
    </div>
  );
};

export default SearchBar;
