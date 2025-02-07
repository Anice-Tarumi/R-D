import {create} from "zustand"

const useChestStore = create((set) => ({
  chests: {},
  openChest: (id) =>
    set((state) => ({
      chests: { ...state.chests, [id]: true },
    })),
  isChestOpen: (id) => (state) => state.chests[id] || false,
}))

export default useChestStore