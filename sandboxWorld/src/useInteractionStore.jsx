import { create } from "zustand";

const useInteractionStore = create((set) => ({
  currentNPC: null, // 現在会話可能なNPC
  setCurrentNPC: (npcId) => set({ currentNPC: npcId }), // 会話可能なNPCを設定
  clearNPC: () => set({ currentNPC: null }), // NPCの状態をリセット
}));

export default useInteractionStore;
