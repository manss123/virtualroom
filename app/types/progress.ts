// app/types/progress.ts
export interface QuizAttempt {
  quizId: string;           // "intro1"
  roomKey: string;          // "intro1" | "C1" ...
  hotspotId?: string;       // "intro1-quiz"
  submittedAt: any;         // Firestore Timestamp (admin) or Date (client)
  total: number;
  correct: number;
  passed: boolean;

  // store what they chose (optional but requested)
  answers: Record<string, string>; // { q1:"c", q2:"c", ... }
}

export interface ProgressState {
  preTestDone: boolean;
  postTestDone?: boolean;
  
  pdpaDone?: boolean;
  questionnaireDone: boolean;
  planningDone: boolean;

  completedRooms: string[]; // ["intro1", "C1", ...]
  completedHotspotsByRoom?: Record<string, string[]>;

  // timestamps
  updatedAt?: any; // Timestamp
  roomFinishedAt?: Record<string, any>; // { intro1: Timestamp, C1: Timestamp }

  // quiz data
  quizAttemptsByRoom?: Record<string, QuizAttempt[]>; // roomKey -> attempts[]
  lastQuizResultByRoom?: Record<string, QuizAttempt>; // quick access

  reflection?: {
    submitted: boolean;
    text?: string;
    submittedAt?: string; // ISO
  };
}

