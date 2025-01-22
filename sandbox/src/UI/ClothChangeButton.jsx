import React from "react"
import useGame from "../manager/useGame"

const ClothChangeButton = () => {
  const startChanging = useGame((state) => state.startChanging) // 着替えモードに切り替え

  return (
    <button
      className="cloth-button"
      onClick={startChanging}
    >
      着替え
    </button>
  )
}

export default ClothChangeButton
