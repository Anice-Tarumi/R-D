import { create } from "zustand";

const useChestStore = create((set) => ({
  chestStates: {}, // 宝箱の状態（IDごとに管理）
  openChest: (id) =>
    set((state) => ({
      chestStates: {
        ...state.chestStates,
        [id]: true, // 宝箱を開く
      },
    })),
  closeChest: (id) =>
    set((state) => ({
      chestStates: {
        ...state.chestStates,
        [id]: false, // 宝箱を閉じる
      },
    })),
  toggleChest: (id) =>
    set((state) => ({
      chestStates: {
        ...state.chestStates,
        [id]: !state.chestStates[id], // 宝箱をトグル
      },
    })),
}));

export default useChestStore;
