import { create } from "zustand"

const useAudioStore = create((set) => ({
  bgm: null,
  isPlaying: false,
  isFirstTime: true,
  
  playBGM: () => set((state) => {
    
    const audio = new Audio('./audio/BGM.mp3')
    // console.log(state)
    if (!state.bgm) {
      // console.log("adsa")
      // const audio = new Audio('./audio/BGM.mp3')
      audio.loop = true
      if(state.isFirstTime){
        let volume = 0
      audio.volume = volume
        const interval = setInterval(() => {
        volume += 0.01
      if (volume >= 0.1) {
        volume = 0.1
        clearInterval(interval)
        audio.muted=false
        audio.autoplay = false
        state.isFirstTime = false
        audio.play()
      }
      audio.volume = volume
    }, 100)
      }else{
        audio.volume = 0.1
      }
      
      // audio.play()
      return { bgm: audio, isPlaying: true }
    } else if (!state.isPlaying) {
      state.bgm.play()
      return { isPlaying: true }
    }
    return state
  }),

  pauseBGM: () => set((state) => {
    if (state.bgm && state.isPlaying) {
      state.bgm.pause()
      return { isPlaying: false }
    }
    return state
  }),

  stopBGM: () => set((state) => {
    if (state.bgm) {
      state.bgm.pause()
      state.bgm.currentTime = 0 
      return { isPlaying: false }
    }
    return state
  }),
  setShouldFadeIn: (value) => set({ shouldFadeIn: value }),
}))

export default useAudioStore
