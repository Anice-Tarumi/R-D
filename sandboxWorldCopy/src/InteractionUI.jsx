import React from "react";
import useInteractionStore from "./useInteractionStore";
import DialogButton from "./DialogButton";
import DialogueUI from "./DialogueUI";

const InteractionUI = () => {
  const  currentTarget  = useInteractionStore((state) => (state.currentTarget));
//   console.log(currentTarget)
  const  setCurrentTarget  = useInteractionStore((state) => state.setCurrentTarget);
//   const currentNPC = useInteractionStore((state) => state.currentNPC); // 現在の会話可能NPCを取得
//   const setCurrentNPC = useInteractionStore((state) => state.setCurrentNPC); // 会話可能なNPCを設定
console.log(currentTarget)
  if (!currentTarget) return null;
  switch (currentTarget.type) {
    case "NPC":
      return (
        <>
          <DialogButton/>
          <DialogueUI/>
        </>
      );
    case "CHEST":
      return (
        <button className="interaction-ui-button" onClick={() => console.log(`Opening chest: ${currentTarget.id}`)}>
          Open Chest
        </button>
      );
    default:
      return null;
  }
};

export default InteractionUI;
