import React from "react";
import useInteractionStore from "./useInteractionStore";
import useGame from "./useGame";

export default function DialogButton({ onStartConversation }) {
  const currentNPC = useInteractionStore((state) => state.currentNPC); // 現在の会話可能NPCを取得
  const startTalking = useGame((state) => state.startTalking);
  
  if (!currentNPC) return null; // 会話可能でない場合は何も表示しない

  const handleClick = () => {
    // console.log(`Starting conversation with NPC: ${currentNPC}`);
    startTalking(); // ゲーム状態を「talking」に変更
  };

  return (
    <div className="dialog-button">
      <button onClick={handleClick}>Talk</button>
    </div>
  );
}
