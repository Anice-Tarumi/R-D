import React from "react";
import useDialogueStore from "./useDialogueStore";
import dialogueData from "./dialogueData.json";
import useGame from "./useGame";
import { motion } from "framer-motion";
import useInteractionStore from "./useInteractionStore";

const DialogueUI = () => {
  const currentNPC = useDialogueStore((state) => state.currentNPC);
  const currentDialogue = useDialogueStore((state) => state.currentDialogue);
  const advanceDialogue = useDialogueStore((state) => state.advanceDialogue);
  const endTalking = useGame((state) => state.endTalking); // 会話終了処理
  const endDialogue = useDialogueStore((state) => state.endDialogue); // 会話をリセット
  const target = useInteractionStore((state) => state.currentTarget)
  // console.log("target",target)
  if (!target || !currentDialogue) return null;

  const npcDialogues = dialogueData[currentNPC]?.dialogues;
  const dialogue = npcDialogues?.find((d) => d.id === currentDialogue);

  if (!dialogue) return null;

  const handleClick = () => {
    if (!dialogue.options) {
        if (dialogue.next) {
            advanceDialogue(dialogue.next); // 次の会話へ進む
          } else {
            endTalking(); // 会話終了
            endDialogue();
          }
    }
  };

  // テキストを一文字ずつ分割
  const characters = dialogue.text.split("");

  // アニメーション設定
  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren:  0.2 }, },
  };

  const child = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.2 }, // 文字ごとのアニメーション速度
  };

  return (
    <div
      className="dialogue-container"
      onClick={handleClick} // コンテナ全体にクリックイベントを設定
    >
      <div className="dialogue-header">
        <span className="npc-name">{dialogueData[currentNPC].name}</span>
      </div>

      <div className="dialogue-content">
      <motion.div
          key={currentDialogue} // 会話が変わるたびに再レンダリング
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
        {dialogue.image && <img src={dialogue.image} alt="Dialogue Visual" className="dialogue-image" />}
        {dialogue.url && (
          <a href={dialogue.url} target="_blank" rel="noopener noreferrer" className="dialogue-link">
            詳細を見る
          </a>
        )}
      </div>

      {/* 選択肢がある場合のみボタンを表示 */}
      {dialogue.options && (
        <div className="dialogue-buttons">
          {dialogue.options.map((option, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation(); // コンテナのクリックイベントを防止
                if (option.next) {
                    advanceDialogue(option.next); // 選択肢で分岐
                  } else {
                    endTalking(); // 最後の選択肢で会話終了
                    endDialogue();
                  }
              }}
            >
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DialogueUI;
