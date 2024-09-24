// src/components/admin/AdminChallengeForm.tsx
import React, { useState } from 'react';

const AdminChallengeForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Challenge submitted:', { title, description });

    // Clear the form
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <h2 className="text-2xl font-semibold mb-4">Add/Edit Challenge</h2>
      <div className="mb-4">
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md"
          required
        ></textarea>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
        Submit Challenge
      </button>
    </form>
  );
};

export default AdminChallengeForm;
