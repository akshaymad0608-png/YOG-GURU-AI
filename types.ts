
export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export enum PoseCategory {
  STANDING = 'Standing',
  SITTING = 'Sitting',
  BALANCING = 'Balancing',
  LYING = 'Lying',
  MEDITATION = 'Meditation'
}

export interface YogaPose {
  id: string;
  nameEn: string;
  nameHi: string;
  difficulty: Difficulty;
  category: PoseCategory;
  description: string;
  benefits: string[];
  precautions: string[];
  duration: string;
  breathing: string;
  commonMistakes: string[];
  image: string;
  idealAngles: Record<string, number>;
}

export interface UserProgress {
  streak: number;
  caloriesBurned: number;
  flexibilityScore: number;
  accuracyHistory: { date: string; score: number }[];
  masteryLevels: Record<string, number>;
}

export interface PoseFeedback {
  accuracy: number;
  message: string;
  corrections: string[];
  isCorrect: boolean;
}
