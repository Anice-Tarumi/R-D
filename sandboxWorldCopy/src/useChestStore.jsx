import {create} from "zustand";

const useChestStore = create((set) => ({
  chests: {}, // 各宝箱の状態をIDごとに管理
  openChest: (id) =>
    set((state) => ({
      chests: { ...state.chests, [id]: true }, // 対象の宝箱を開いた状態にする
    })),
  isChestOpen: (id) => (state) => state.chests[id] || false, // 対象の宝箱が開いているか
}));

export default useChestStore