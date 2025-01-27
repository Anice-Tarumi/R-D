import { create } from "zustand"

const useDialogueStore = create((set) => ({
  currentNPC: null,
  currentDialogue: null,
  npcFlags: {},

  startDialogue: (npcId) =>
    set((state) => {
      // フラグ判定
      const isUnlocked =
        npcId === "npc3"
          ? state.npcFlags["npc1"] && state.npcFlags["npc2"]
          : true;

      return {
        currentNPC: npcId,
        currentDialogue: isUnlocked ? "d1" : "d1_locked",
      };
    }),

  advanceDialogue: (nextId) =>
    set((state) => ({
      currentDialogue: nextId || null,
      currentNPC: nextId ? state.currentNPC : null,
    })),

  endDialogue: () => set({ currentNPC: null, currentDialogue: null }),

  setNpcFlag: (npcId, value) =>
    set((state) => ({
      npcFlags: { ...state.npcFlags, [npcId]: value },
    })),
}));


export default useDialogueStore
