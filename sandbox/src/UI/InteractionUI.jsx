import React, { useState } from "react"
import useInteractionStore from "../manager/useInteractionStore"
import DialogButton from "./DialogButton"
import DialogueUI from "./DialogueUI"
import useGame from "../manager/useGame"
import useStageStore from "../manager/useStageStore"

const InteractionUI = () => {
  const  currentTarget  = useInteractionStore((state) => (state.currentTarget))
  const removeTarget = useInteractionStore((state) => state.removeTarget)
  const addLoading = useGame((state) => state.addLoading)
  const setStage = useStageStore((state) => state.setStage)
  const phase = useGame((state) => state.phase)
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  if (!currentTarget) return null
  const handlePortalInteraction = () => {
    removeTarget()
    setIsButtonVisible(false) // ボタンを非表示
    setTimeout(() => {
      addLoading()
      setTimeout(() => {
        setStage("Theatre")
      }, 3000)
    }, 0)
  }
  switch (currentTarget.type) {
    case "NPC":
      return (
        <>
          <DialogButton/>
          <DialogueUI/>
        </>
      )
    // case "CHEST":
    //   return (
    //     <button className="interaction-ui-button" onClick={() => console.log(`Opening chest: ${currentTarget.id}`)}>
    //       Open Chest
    //     </button>
    //   )
    case "PORTAL":
    return (
      <div className="portal-ui">
      {phase === "playing" && (<button
        className="interaction-ui-button"
        onClick={handlePortalInteraction}
      >
        Enter Portal
      </button>)}
      </div>
    )
    default:
      return null
  }
}

export default InteractionUI
