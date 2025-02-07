import { create } from 'zustand'

const usePlayerStore = create((set) => ({
  playerRef: null,
  setPlayerRef: (ref) => set({ playerRef: ref })
}))

export default usePlayerStore
