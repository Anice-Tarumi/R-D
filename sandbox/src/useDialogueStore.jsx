import { create } from "zustand"

const useDialogueStore = create((set) => ({
  currentNPC: null, // 現在のNPC ID
  currentDialogue: null, // 現在の会話ID
  startDialogue: (npcId, dialogueId) =>
    set({ currentNPC: npcId, currentDialogue: dialogueId }),
  advanceDialogue: (nextId) =>
    set((state) => ({
      currentDialogue: nextId || null, // 次の会話へ進む
      currentNPC: nextId ? state.currentNPC : null, // 会話終了時にNPCもリセット
    })),
  endDialogue: () => set({ currentNPC: null, currentDialogue: null }), // 会話を完全にリセット
}))

export default useDialogueStore
