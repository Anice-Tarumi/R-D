import useAudioStore from "./useAudioStore";
import { useState } from "react";
const AudioButton = () => {
    const playBGM = useAudioStore((state) => state.playBGM);
    const pauseBGM = useAudioStore((state) => state.pauseBGM);
    const stopBGM = useAudioStore((state) => state.stopBGM);
    const bgm = useAudioStore((state) => state.bgm);
    // const shouldFadeIn = useAudioStore((state) => state.shouldFadeIn);
    // const setShouldFadeIn = useAudioStore((state) => state.setShouldFadeIn);
  
    // const changeVolume = (event) => {
    //   if (bgm) {
    //     bgm.volume = event.target.value / 100;
    //   }
    // };

    // const fadeInVolume = () => {
    //     let volume = 0; // 初期音量
    //     if (bgm) bgm.volume = volume; // 初期音量設定
    //     const interval = setInterval(() => {
    //       volume += 0.01; // 徐々に増加
    //       if (volume >= 0.2) {
    //         volume = 0.2; // 最大音量に達したら終了
    //         clearInterval(interval);
    //         setShouldFadeIn(false); // フェードインを一度だけ実行
    //       }
    //       if (bgm) bgm.volume = volume;
    //     }, 100); // 100ms間隔で音量変更
    //   };

  const [isPlaying, setIsPlaying] = useState(true);

  const toggleBGM = () => {
    if (isPlaying) {
      pauseBGM()
      setIsPlaying(false);
    } else {
      playBGM()
      setIsPlaying(true);
    }
  };
  
  return (
    <button
      className="bgm-button"
      onClick={toggleBGM}
    >
      {isPlaying ? "⏸️" : "▶️"}
    </button>
  );
  };
  
  export default AudioButton;
  