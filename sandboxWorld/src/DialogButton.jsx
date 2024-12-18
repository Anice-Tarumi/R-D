import React from "react";
import useInteractionStore from "./useInteractionStore";
import useGame from "./useGame";
import useDialogueStore from "./useDialogueStore";

export default function DialogButton({  }) {
  const currentNPC = useInteractionStore((state) => state.currentNPC); // 現在の会話可能NPCを取得
  const phase = useGame((state) => state.phase); // 現在のゲーム状態
  const startTalking = useGame((state) => state.startTalking);
  const startDialogue = useDialogueStore((state) => state.startDialogue);
  
  if (!currentNPC || phase === "talking") return null; // 会話可能でない場合は何も表示しない

  const handleClick = () => {
    // console.log(`Starting conversation with NPC: ${currentNPC}`);
    startTalking(); // ゲーム状態を「talking」に変更
    startDialogue(currentNPC, "d1"); // 会話を開始（最初の会話IDを指定）
  };

  return (
    <div className="dialog-button">
      <button onClick={handleClick}>Talk</button>
    </div>
  );
}
