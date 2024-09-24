import React from 'react';

const ChallengeFilters: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">All</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Web</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Cryptogrphy</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Forensic</button>
        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Steganography</button>
      </div>
    </div>
  );
};

export default ChallengeFilters;
