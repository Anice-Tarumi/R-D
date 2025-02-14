import React from "react"
import { motion } from "framer-motion"
import dialogueData from "./dialogueData.json"
import useDialogueStore from "../manager/useDialogueStore"
import useGame from "../manager/useGame"

const DialogueUI = () => {
  const currentNPC = useDialogueStore((state) => state.currentNPC)
  const currentDialogue = useDialogueStore((state) => state.currentDialogue)
  const advanceDialogue = useDialogueStore((state) => state.advanceDialogue)
  const endTalking = useGame((state) => state.endTalking)
  const endDialogue = useDialogueStore((state) => state.endDialogue)

  if (!currentNPC || !currentDialogue) return null

  const npcDialogues = dialogueData[currentNPC]?.dialogues
  const dialogue = npcDialogues?.find((d) => d.id === currentDialogue)

  if (!dialogue) return null

  const handleClick = () => {
    if (!dialogue.options) {
      if (dialogue.next) {
        advanceDialogue(dialogue.next)
      } else {
        if (currentNPC === "npc1" || currentNPC === "npc2") {
          useDialogueStore.getState().setNpcFlag(currentNPC, true)
        }
        endTalking()
        endDialogue()
      }
    }
  }

  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // 子要素間のディレイ
        delayChildren: 0.2,   // アニメーション開始の遅延
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.2 }, // 各文字のアニメーション速度
    },
  }

  // テキストを1文字ずつ分割
  const characters = dialogue.text.split("")

  return (
    <div className="dialogue-container" onClick={handleClick}>
      <div className="dialogue-header">
        <span className="npc-name">{dialogueData[currentNPC].name}</span>
      </div>
      <div className="dialogue-content">
        <motion.div
          key={currentDialogue} // 会話が変わるたびにアニメーションをリセット
          className="animated-text"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={child}>
              {char}
            </motion.span>
          ))}
        </motion.div>
        {dialogue.image && (
          <img
            src={dialogue.image}
            alt="Dialogue Visual"
            className="dialogue-image"
          />
        )}
        {dialogue.url && (
          <a href={dialogue.url} target="_blank" rel="noopener noreferrer">
            詳細を見る
          </a>
        )}
      </div>
      {dialogue.options && (
        <div className="dialogue-buttons">
          {dialogue.options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation() // クリックイベントのバブルを防ぐ
                if (option.next) {
                  advanceDialogue(option.next)
                } else {
                  endTalking()
                  endDialogue()
                }
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DialogueUI
