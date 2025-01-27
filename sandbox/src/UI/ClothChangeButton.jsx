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
   
  return (
    <button
      className="cloth-button"
      onClick={ButtonClick}
    >
      着替え
    </button>
  )
}

export default ClothChangeButton
