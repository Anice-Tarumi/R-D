import useAudioStore from "../manager/useAudioStore"

const AudioButton = () => {
    const playBGM = useAudioStore((state) => state.playBGM)
    const pauseBGM = useAudioStore((state) => state.pauseBGM)
    const isPlaying = useAudioStore((state) => state.isPlaying)
  const toggleBGM = () => {
    if (isPlaying) {
      pauseBGM()
    } else {
      playBGM()
    }
  }
  
  // return (
  //   <button
  //     className="bgm-button"
  //     onClick={toggleBGM}
  //   >
  //     {isPlaying ? "⏸️" : "▶️"}
  //   </button>
  // )
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
  )
  }
  
  export default AudioButton
  