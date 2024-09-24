// src/types/types.ts
export interface Challenge {
  id: number;
  title: string;
  description: string;
  images?: string[]; // Optional field for images
  questionPrompt: string;
  flagValue: string;
}

