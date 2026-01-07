export type LearningRoomKey = "intro1" | "C1" | "C2" | "C3" | "C4" | "intro2";

export interface LearningRoomMeta {
  key: LearningRoomKey;
  label: string;
  sceneId: string;
  cardImage: string;

  conceptId?: "C1" | "C2" | "C3" | "C4";
}

export const LEARNING_ROOMS: Record<LearningRoomKey, LearningRoomMeta> = {
  intro1: {
    key: "intro1",
    label: "ห้องเรียน INTRO 1",
    sceneId: "intro1",
    cardImage: "/panos/intro1.jpg",
  },
  C1: {
    key: "C1",
    label: "ห้องเรียน CONCEPT 1",
    sceneId: "concept1",
    cardImage: "/panos/concept1.jpg",
    conceptId: "C1",
  },
  C2: {
    key: "C2",
    label: "ห้องเรียน CONCEPT 2",
    sceneId: "concept2",
    cardImage: "/panos/concept2.jpg",
    conceptId: "C2",
  },
  C3: {
    key: "C3",
    label: "ห้องเรียน CONCEPT 3",
    sceneId: "concept3",
    cardImage: "/panos/concept3.jpg",
    conceptId: "C3",
  },
  C4: {
    key: "C4",
    label: "ห้องเรียน CONCEPT 4",
    sceneId: "concept4",
    cardImage: "/panos/concept4.jpg",
    conceptId: "C4",
  },
  intro2: {
    key: "intro2",
    label: "ห้องเรียน INTRO 2",
    sceneId: "intro2",
    cardImage: "/panos/intro2.jpg",
  },
};
