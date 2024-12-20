import {create} from "zustand";

const useChestStore = create((set) => ({
  isChestOpen: false, // 宝箱の開閉状態
  openChest: () =>
    set(() => ({
      isChestOpen: true, // 宝箱を開けた状態に変更
    })),
}));

export default useChestStore;
