// app/types/progress.ts
export interface ProgressState {
  preTestDone: boolean;
  pdpaDone?: boolean;
  questionnaireDone: boolean;
  planningDone: boolean;
  completedRooms: string[]; // ["intro1", "C1", ...]
  completedHotspotsByRoom?: Record<
    string, // roomKey e.g. "intro1", "C2"
    string[] // hotspot ids in that room
  >;
}
