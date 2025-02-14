import { create } from "zustand"

const useClothStore = create((set) => ({
  selectedHat: "",
  selectedBag: "",
  selectedShoes: "",

  setHat: (hat) => set({ selectedHat: hat }),
  setBag: (bag) => set({ selectedBag: bag }),
  setShoes: (shoes) => set({ selectedShoes: shoes }),

  hats: ["","Santa Hat", "Headphones"],
  bags: ["","Open Backpack", "Backpack"],
  shoes: ["","Slippers", "Boots"],
  
  changeHat: (direction) =>
    set((state) => {
      const currentIndex = state.hats.indexOf(state.selectedHat)
      const nextIndex = (currentIndex + direction + state.hats.length) % state.hats.length
      return { selectedHat: state.hats[nextIndex] }
    }),
    
  changeBag: (direction) =>
    set((state) => {
      const currentIndex = state.bags.indexOf(state.selectedBag)
      const nextIndex = (currentIndex + direction + state.bags.length) % state.bags.length
      return { selectedBag: state.bags[nextIndex] }
    }),
    
  changeShoes: (direction) =>
    set((state) => {
      const currentIndex = state.shoes.indexOf(state.selectedShoes)
      const nextIndex = (currentIndex + direction + state.shoes.length) % state.shoes.length
      return { selectedShoes: state.shoes[nextIndex] }
    }),
}))

export default useClothStore