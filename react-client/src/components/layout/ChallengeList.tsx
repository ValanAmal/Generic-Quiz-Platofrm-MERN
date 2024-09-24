// src/components/layout/ChallengeList.tsx
import React from 'react';
import ChallengeCard from '../common/ChallengeCard';

interface Challenge {
  id: number;
  title: string;
  description: string;
  images?: string[];
}

interface ChallengeListProps {
  challenges: Challenge[];
  isAdmin: boolean;
  onEditChallenge: (id: number, updatedTitle: string, updatedDescription: string) => void;
  onDeleteChallenge: (id: number) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({
  challenges,
  isAdmin,
  onEditChallenge,
  onDeleteChallenge,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {challenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isAdmin={isAdmin}
          onEditChallenge={onEditChallenge}
          onDeleteChallenge={onDeleteChallenge}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
