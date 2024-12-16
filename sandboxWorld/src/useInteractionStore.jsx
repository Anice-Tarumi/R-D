import { create } from "zustand";

const useInteractionStore = create((set) => ({
  currentNPC: null, // 現在会話可能なNPCのID
  setCurrentNPC: (npcId) => set({ currentNPC: npcId }), // 会話可能なNPCを設定
}));

export default useInteractionStore;
