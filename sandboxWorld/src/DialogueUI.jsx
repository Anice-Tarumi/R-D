import React from "react";
import useDialogueStore from "./useDialogueStore";
import dialogueData from "./dialogueData.json";
import useGame from "./useGame";

const DialogueUI = () => {
  const currentNPC = useDialogueStore((state) => state.currentNPC);
  const currentDialogue = useDialogueStore((state) => state.currentDialogue);
  const advanceDialogue = useDialogueStore((state) => state.advanceDialogue);
  const endTalking = useGame((state) => state.endTalking); // 会話終了処理
  const endDialogue = useDialogueStore((state) => state.endDialogue); // 会話をリセット

  if (!currentNPC || !currentDialogue) return null;

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

  return (
    <div
      className="dialogue-container"
      onClick={handleClick} // コンテナ全体にクリックイベントを設定
    >
      <div className="dialogue-header">
        <span className="npc-name">{dialogueData[currentNPC].name}</span>
      </div>

      <div className="dialogue-content">
        <p>{dialogue.text}</p>
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
