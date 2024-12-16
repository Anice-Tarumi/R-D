import React from "react";
import useInteractionStore from "./useInteractionStore";

export default function DialogButton({ onStartConversation }) {
  const currentNPC = useInteractionStore((state) => state.currentNPC); // 現在の会話可能NPCを取得
  console.log("DialogButton currentNPC:", currentNPC); // デバッグログ
  if (!currentNPC) return null; // 会話可能でない場合は何も表示しない
    console.log('近い')
  return (
    <div className="dialog-button">
      <button onClick={() => onStartConversation(currentNPC)}>Talk</button>
    </div>
  );
}
