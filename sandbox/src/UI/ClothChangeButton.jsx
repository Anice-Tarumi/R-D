import React from "react"
import useGame from "../manager/useGame"
import { playSound } from "../manager/audioManager"

const ClothChangeButton = () => {
  const startChanging = useGame((state) => state.startChanging)
   // 着替えモードに切り替え
   const ButtonClick = () =>{
    playSound("click1")
    startChanging()
  }
   
  // return (
  //   <button
  //     className="cloth-button"
  //     onClick={ButtonClick}
  //   >
  //     着替え
  //   </button>
  // )
  return (
    <button className="cloth-change-button" onClick={ButtonClick}>
      <svg viewBox="0 0 64 64" className="cloth-icon">
        <path d="M20 10 L32 5 L44 10 L52 20 L48 28 L40 28 L40 50 L24 50 L24 28 L16 28 L12 20 Z" stroke="white" fill="none" strokeWidth="3"/>
      </svg>
    </button>
  );
}

export default ClothChangeButton
