import React from "react";

interface CategoryCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default CategoryCard;
