import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(-1)}
      className="cursor-pointer flex items-center text-blue-500 font-bold"
    >
      <ArrowLeftIcon className="w-5 h-5 mr-2" />
      <span>Back</span>
    </div>
  );
};

export default BackButton;
