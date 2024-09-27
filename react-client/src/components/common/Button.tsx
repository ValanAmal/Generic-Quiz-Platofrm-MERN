// src/components/common/Button.tsx
import React from "react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, isPrimary = true }) => {
  const buttonStyles = isPrimary
    ? "bg-gray-600 text-white rounded-md hover:bg-white hover:text-black transition duration-300 glow-button font-bold"
    : "bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-300";

  return (
    <button className={`w-full mt-6 py-2 ${buttonStyles}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
