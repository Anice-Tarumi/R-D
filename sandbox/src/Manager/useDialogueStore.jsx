import { create } from "zustand"

const useDialogueStore = create((set) => ({
  currentNPC: null,
  currentDialogue: null,
  npcFlags: {},

  startDialogue: (npcId) =>
  {  
    // console.log("startDialogue 実行: NPC", npcId)
    console.time("zustand set dialogue") // ⏱️ 計測開始
    set((state) => {
      // console.log("startDialogue 実行: NPC", npcId)
      // フラグ判定
      const isUnlocked =
        npcId === "npc3"
          ? state.npcFlags["npc1"] && state.npcFlags["npc2"]
          : true

      return {
        currentNPC: npcId,
        currentDialogue: isUnlocked ? "d1" : "d1_locked",
      }
    })
    console.timeEnd("zustand set dialogue") // ⏱️ 計測終了
  },

  advanceDialogue: (nextId) =>
    set((state) => ({
      currentDialogue: nextId || null,
      currentNPC: nextId ? state.currentNPC : null,
    })),

    endDialogue: () => set(() => {
      // console.log("endDialogue 実行")
      return { currentNPC: null, currentDialogue: null }
    }),

  setNpcFlag: (npcId, value) =>
    set((state) => ({
      npcFlags: { ...state.npcFlags, [npcId]: value },
    })),
}))


export default useDialogueStore
