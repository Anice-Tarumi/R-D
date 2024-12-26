import React, { useState } from "react";
import useInteractionStore from "./useInteractionStore";
import DialogButton from "./DialogButton";
import DialogueUI from "./DialogueUI";
import useGame from "./useGame";
import useStageStore from "./useStageStore";

const InteractionUI = () => {
  const  currentTarget  = useInteractionStore((state) => (state.currentTarget));
  const  setCurrentTarget  = useInteractionStore((state) => state.setCurrentTarget);
  const addLoading = useGame((state) => state.addLoading)
  const setStage = useStageStore((state) => state.setStage)
  const phase = useGame((state) => state.phase)
  const [isButtonVisible, setIsButtonVisible] = useState(true)
  if (!currentTarget) return null;
  const handlePortalInteraction = () => {
    setIsButtonVisible(false); // ボタンを非表示
    setTimeout(() => {
      addLoading(); // ローディング状態に切り替え
      setTimeout(() => {
        setStage("Theatre"); // ステージをTheatreに切り替え
      }, 3000); // 最低3秒のローディング後にステージ変更
    }, 0);
  };

  // console.log("currentTarget.type",currentTarget.type)
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
    );
    default:
      return null;
  }
};

export default InteractionUI;
