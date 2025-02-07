import {create} from "zustand"

const useStageStore = create((set) => ({
  currentStage: "City", // 初期ステージ
  setStage: (stage) => set({ currentStage: stage }),
}))

export default useStageStore
