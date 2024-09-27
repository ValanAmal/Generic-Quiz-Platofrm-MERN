// src/components/layout/ChallengeList.tsx
import React from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChallengeCard from "../common/ChallengeCard";
import { Challenge } from "../../types/types";

interface ChallengeListProps {
  challenges: Challenge[];
  isAdmin: boolean;
  onMoveChallenge: (dragIndex: number, hoverIndex: number) => void; // New prop to handle reorder
  onEditChallenge: (
    id: string,
    updatedTitle: string,
    updatedDescription: string,
    updatedPoints: number,
  ) => void;
  onDeleteChallenge: (id: string) => void;
}

const ItemType = "CHALLENGE"; // Unique key for drag type

// Single Challenge component wrapped with useDrag and useDrop
const DraggableChallenge: React.FC<{
  challenge: Challenge;
  index: number;
  onMoveChallenge: (dragIndex: number, hoverIndex: number) => void;
  isAdmin: boolean;
  onEditChallenge: (
    id: string,
    updatedTitle: string,
    updatedDescription: string,
    updatedPoints: number,
  ) => void;
  onDeleteChallenge: (id: string) => void;
}> = ({
  challenge,
  index,
  onMoveChallenge,
  isAdmin,
  onEditChallenge,
  onDeleteChallenge,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Hook to drag the challenge
  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
  });

  // Hook to drop the challenge into a new position
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMoveChallenge(item.index, index); // Move the challenge to the new index
        item.index = index; // Update the drag item's index
      }
    },
  });

  drag(drop(ref)); // Attach drag and drop to the DOM node

  return (
    <div ref={ref}>
      <ChallengeCard
        challenge={challenge}
        isAdmin={isAdmin}
        onEditChallenge={onEditChallenge}
        onDeleteChallenge={onDeleteChallenge}
      />
    </div>
  );
};

const ChallengeList: React.FC<ChallengeListProps> = ({
  challenges,
  isAdmin,
  onMoveChallenge,
  onEditChallenge,
  onDeleteChallenge,
}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4">
        {challenges.map((challenge, index) => (
          <DraggableChallenge
            key={challenge.id}
            challenge={challenge}
            index={index}
            onMoveChallenge={onMoveChallenge}
            isAdmin={isAdmin}
            onEditChallenge={onEditChallenge}
            onDeleteChallenge={onDeleteChallenge}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default ChallengeList;
