// src/components/admin/AdminChallengeCustomization.tsx
import React, { useState } from "react";

interface Challenge {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  points: number;
}

const AdminChallengeCustomization: React.FC<{
  challenge: Challenge;
  onUpdate: (updatedChallenge: Challenge) => void;
  onCancel: () => void;
}> = ({ challenge, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(challenge.title);
  const [description, setDescription] = useState(challenge.description);
  const [imageUrl, setImageUrl] = useState(challenge.imageUrl || "");

  const handleUpdate = () => {
    onUpdate({ ...challenge, title, description, imageUrl });
  };

  return (
    <div className="edit-form p-6">
      <h2>Edit Challenge</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        placeholder="Challenge Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mt-2 w-full"
        placeholder="Challenge Description"
      />
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="border p-2 mt-2 w-full"
        placeholder="Image URL"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white p-2 mt-4"
      >
        Update Challenge
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default AdminChallengeCustomization;
