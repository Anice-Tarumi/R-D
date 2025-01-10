import React from "react";
import useGame from "./useGame";

const ClothChangeUI = ({ onApply, onCancel }) => {
  const resume = useGame((state) => state.resume)
  return (
    <div className="cloth-change-ui">
      {/* 頭部の左右ボタン */}
      <div className="arrow-container head">
        <button className="arrow-button arrow-left" onClick={() => console.log("頭部: 左")}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => console.log("頭部: 右")}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 体の左右ボタン */}
      <div className="arrow-container body">
        <button className="arrow-button arrow-left" onClick={() => console.log("体: 左")}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => console.log("体: 右")}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 足の左右ボタン */}
      <div className="arrow-container legs">
        <button className="arrow-button arrow-left" onClick={() => console.log("足: 左")}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => console.log("足: 右")}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 下部に配置される操作ボタン */}
      <div className="bottom-controls">
        <button className="cancel-button" onClick={resume}>❌</button>
        <button className="confirm-button" onClick={onApply}>✅</button>
      </div>
    </div>
  );
};

export default ClothChangeUI;
