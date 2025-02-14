import { create } from "zustand";

export const useJoystickStore = create((set) => ({
  position: { x: 0, y: 0 },
  startPosition: { x: 0, y: 0 },
  isActive: false,

  setStartPosition: (x, y) => set({ startPosition: { x, y }, isActive: true }),
  setPosition: (x, y) => set({ position: { x, y } }),
  setIsActive: (active) => set({ isActive: active }),
  resetJoystick: () => set({ isActive: false, position: { x: 0, y: 0 } }),
}));

export default useJoystickStore;
