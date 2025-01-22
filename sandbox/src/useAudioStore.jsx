// useAudioStore.jsx
import { create } from "zustand";

const useAudioStore = create((set) => ({
  bgm: null, // Audioオブジェクト
  isPlaying: false,
  isFirstTime: true,
  
  playBGM: () => set((state) => {
    if (!state.bgm) {
      const audio = new Audio('/audio/BGM.mp3'); // 音声ファイルのパス
      audio.loop = true; // ループ再生
      if(state.isFirstTime){
        let volume = 0; // 初期音量
      audio.volume = volume; // 初期音量設定
        const interval = setInterval(() => {
        volume += 0.01; // 徐々に増加
        console.log("1回目")
      if (volume >= 0.1) {
        volume = 0.1; // 最大音量に達したら終了
        clearInterval(interval);
        state.isFirstTime = false
        console.log('1回目終わり')
      }
      audio.volume = volume;
    }, 100); // 100ms間隔で音量変更
      }else{
        audio.volume = 0.1; // 音量調整（0.0～1.0）
        console.log("2回目以降")
      }
      
      audio.play();
      return { bgm: audio, isPlaying: true };
    } else if (!state.isPlaying) {
      state.bgm.play();
      return { isPlaying: true };
    }
    return state;
  }),

  pauseBGM: () => set((state) => {
    if (state.bgm && state.isPlaying) {
      state.bgm.pause();
      return { isPlaying: false };
    }
    return state;
  }),

  stopBGM: () => set((state) => {
    if (state.bgm) {
      state.bgm.pause();
      state.bgm.currentTime = 0; // 再生位置をリセット
      return { isPlaying: false };
    }
    return state;
  }),
  setShouldFadeIn: (value) => set({ shouldFadeIn: value }),
}));

export default useAudioStore;
