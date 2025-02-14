import {create} from "zustand"

export const useDeviceStore = create(() => ({
  isMobile: /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent), // モバイル判定
}))
export default useDeviceStore