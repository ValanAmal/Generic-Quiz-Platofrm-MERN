// src/components/admin/AddChallengeForm.tsx
import React, { useState } from 'react';

interface AddChallengeFormProps {
  onAddChallenge: (title: string, description: string) => void;
}

const AddChallengeForm: React.FC<AddChallengeFormProps> = ({ onAddChallenge }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChallenge(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Challenge Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Challenge Description"
        required
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Challenge
      </button>
    </form>
  );
};

export default AddChallengeForm;
