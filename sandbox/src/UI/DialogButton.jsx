import React from "react"
import useInteractionStore from "../manager/useInteractionStore"
import useGame from "../manager/useGame"
import useDialogueStore from "../manager/useDialogueStore"

export default function DialogButton({  }) {
  const currentNPC = useInteractionStore((state) => state.currentNPC) // 現在の会話可能NPCを取得
  const phase = useGame((state) => state.phase) // 現在のゲーム状態
  const startTalking = useGame((state) => state.startTalking)
  const startDialogue = useDialogueStore((state) => state.startDialogue)
  const target = useInteractionStore((state) => state.currentTarget)
  // console.log("taet",target?.type,phase)
  // console.log(target.type,phase)
  if (target?.type !== "NPC" || phase !== "playing") return null // 会話可能でない場合は何も表示しない

  const handleClick = () => {
    // console.log(`Starting conversation with NPC: ${currentNPC}`)
    startTalking() // ゲーム状態を「talking」に変更
    startDialogue(target.id, "d1") // 会話を開始（最初の会話IDを指定）
  }

  return (
      <button className="dialog-button" onClick={handleClick}>Talk</button>
  )
}
