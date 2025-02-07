import useAudioStore from "../manager/useAudioStore";
import { useState } from "react";
const AudioButton = () => {
    const playBGM = useAudioStore((state) => state.playBGM);
    const pauseBGM = useAudioStore((state) => state.pauseBGM);
    const stopBGM = useAudioStore((state) => state.stopBGM);
    const bgm = useAudioStore((state) => state.bgm);

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
  
  // return (
  //   <button
  //     className="bgm-button"
  //     onClick={toggleBGM}
  //   >
  //     {isPlaying ? "⏸️" : "▶️"}
  //   </button>
  // );
  return (
    <button 
      className={`audio-button ${isPlaying ? "playing" : "paused"}`} 
      onClick={toggleBGM}
    >
      <div className="wave-container">
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </button>
  );
  };
  
  export default AudioButton;
  