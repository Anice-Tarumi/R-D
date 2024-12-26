import { create } from "zustand";

const useInteractionStore = create((set) => ({
  currentTarget: [], // 現在インタラクション中のターゲット

  // 現在のターゲットを設定
  setCurrentTarget: (type,id,ref) =>
    set(() => ({
      currentTarget: target,
    })),

  // 現在のターゲットを削除（リセット）
  removeTarget: () =>
    set(() => ({
      currentTarget: null,
    })),
}));

export default useInteractionStore;
