import React from "react";

interface ChallengeFiltersProps {
  onFilterChange: (filter: string) => void; // Prop for handling filter changes
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  onFilterChange,
}) => {
  const filters = ["All", "Web", "Cryptography", "Forensic", "Steganography"];

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex space-x-4">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)} // Call onFilterChange with the selected filter
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-blue-500 hover:text-white"
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChallengeFilters;
