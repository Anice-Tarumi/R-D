import { create } from "zustand";

const useInteractionStore = create((set) => ({
  // targets: {}, // ターゲットを管理するオブジェクト
  currentTarget: null, // 現在インタラクション中のターゲット

  // 現在のターゲットを設定
  setCurrentTarget: (target) =>
    set(() => ({
      currentTarget: target,
    })),

  // ターゲットを追加
  // addTarget: (target) =>
  //   set((state) => ({
  //     targets: { ...state.targets, [target.id]: target },
  //   })),

  // ターゲットを削除
  removeTarget: (id) =>
    set((state) => {
      const newTargets = { ...state.targets };
      delete newTargets[id];
      return { targets: newTargets };
    }),
}));

export default useInteractionStore;
