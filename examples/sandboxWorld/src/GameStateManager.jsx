import React, { useState, useEffect } from "react";
import Loader from "./Loader"; // ローディング画面
import { useProgress } from "@react-three/drei";

// メニューボタンのデザインとアニメーション
const MenuButton = () => {
  return (
    <button className="menu-button">
      <span className="line"></span>
      <span className="line middle"></span>
      <span className="line"></span>
    </button>
  );
};

const GameStateManager = () => {
  const [state, setState] = useState("loading"); // 状態: loading, start, playing, end
  const { progress } = useProgress(); // Drei のロード進捗取得
  const [animationDone, setAnimationDone] = useState(false); // ローディングアニメーション完了管理

  // ロードが完了したらアニメーションを開始
  useEffect(() => {
    if (progress === 100 && state === "loading") {
      setTimeout(() => {
        setAnimationDone(true); // アニメーションを開始
      }, 500); // 0.5秒遅延
    }
  }, [progress, state]);

  // アニメーション完了後にスタート画面へ遷移
  useEffect(() => {
    if (animationDone) {
      setTimeout(() => setState("start"), 1500); // アニメーション後1.5秒でスタート画面に遷移
    }
  }, [animationDone]);

  // 状態ごとのUIを切り替える関数
  const renderState = () => {
    switch (state) {
      case "loading":
        return (
          <div className={`loader-container ${animationDone ? "slide-down" : ""}`}>
            <div className="load-contents">
                <div className="spinner"></div>
                <div className="progress-bar">
                <div
                    className="progress-bar-fill"
                    style={{ width: `${progress}%` }}
                ></div>
                </div>
            </div>
          </div>
        );
      case "start":
        return (
          <div className="game-state-container">
            <div className="title">
              <h1>Welcome to the Game!</h1>
              <button
                className="start-button"
                onClick={() => {
                  setState("playing");
                }}
              >
                Start Game
              </button>
            </div>
          </div>
        );
      case "playing":
        return (
          <>
            {/* 右上にメニューボタンを表示 */}
            <MenuButton />
          </>
        );
      case "end":
        return (
          <div className="game-state-container">
            <h1>Game Over</h1>
            <button
              className="restart-button"
              onClick={() => {
                setState("start");
              }}
            >
              Restart Game
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderState()}</>;
};

export default GameStateManager;
