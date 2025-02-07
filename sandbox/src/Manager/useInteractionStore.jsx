import { create } from "zustand"

const useInteractionStore = create((set) => ({
  currentTarget: [], // 現在インタラクション中のターゲット

  // 現在のターゲットを設定
  setCurrentTarget: (type,id) =>
    {
      console.log("setCurrentTarget 実行", type, id);
      set(() => ({
      currentTarget: {type,id},
    }))},

  // 現在のターゲットを削除（リセット）
  removeTarget: () =>
    set(() => ({
      currentTarget: null,
    })),
}))

export default useInteractionStore
