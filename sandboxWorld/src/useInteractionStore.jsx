// import { create } from "zustand";

// const useInteractionStore = create((set) => ({
//   currentNPC: null, // 現在会話可能なNPC
//   setCurrentNPC: (npcId) => set({ currentNPC: npcId }), // 会話可能なNPCを設定
//   clearNPC: () => set({ currentNPC: null }), // NPCの状態をリセット
// }));

// export default useInteractionStore;



import { create } from 'zustand';

const useInteractionStore = create((set) => ({
  currentNPC: null, // 現在会話可能なNPC
  setCurrentNPC: (npcId) => set({ currentNPC: npcId }), // 会話可能なNPCを設定
  clearNPC: () => set({ currentNPC: null }), // NPCの状態をリセット
  currentTarget: null, // 現在のターゲット（オブジェクトの名前など）
  targetType: null, // ターゲットの種類（chest, npc, portalなど）
  setTarget: (target, type) =>
    set(() => ({
      currentTarget: target,
      targetType: type,
    })),
  clearTarget: () =>
    set(() => ({
      currentTarget: null,
      targetType: null,
    })),
}));

export default useInteractionStore;
