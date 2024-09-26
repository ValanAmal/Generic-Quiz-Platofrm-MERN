// src/components/admin/AddChallengeForm.tsx
import React, { useState } from "react";

interface AddChallengeFormProps {
  onAddChallenge: (title: string, description: string, points: number) => void;
}

const AddChallengeForm: React.FC<AddChallengeFormProps> = ({
  onAddChallenge,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0); // Add points state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description && points > 0) {
      onAddChallenge(title, description, points); // Pass points to onAddChallenge
      setTitle("");
      setDescription("");
      setPoints(0); // Reset fields after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label htmlFor="title" className="block text-sm font-bold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-bold">
          Description:
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <div>
        <label htmlFor="points" className="block text-sm font-bold">
          Points:
        </label>
        <input
          type="number"
          id="points"
          value={points}
          onChange={(e) => setPoints(parseInt(e.target.value, 10))}
          className="border border-gray-300 p-2 w-full"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Add Challenge
      </button>
    </form>
  );
};

export default AddChallengeForm;
