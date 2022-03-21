export interface QuizData {
  category: QuizCategory;
  imageUrl: string;
  favorite: boolean;
}

export enum QuizCategory {
  Linux = 'Linux',
  DevOps = 'DevOps',
  CMS = 'CMS',
  Code = 'Code',
  SQL = 'SQL',
  Docker = 'Docker',
  Random = 'Random',
}

export enum QuizDifficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard',
}
