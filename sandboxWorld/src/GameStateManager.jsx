import React, { useState, useEffect } from "react";
import Loader from "./Loader"; // ローディング画面
import { useProgress } from "@react-three/drei";
import useGame from "./useGame.jsx"

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
  const { progress } = useProgress(); // Drei のロード進捗取得
  const [animationDone, setAnimationDone] = useState(false); // ローディングアニメーション完了管理
  const phase = useGame((state) => state.phase)
  const ready = useGame((state) => state.ready)
  const start = useGame((state) => state.start)

  // ロードが完了したらアニメーションを開始
  useEffect(() => {
    if (progress === 100 && phase === 'loading') {
      setTimeout(() => {
        setAnimationDone(true); // アニメーションを開始
      }, 500); // 0.5秒遅延
    }
  }, [progress, phase]);

  // アニメーション完了後にスタート画面へ遷移
  useEffect(() => {
    if (animationDone) {
      setTimeout(() => ready(), 1500); // アニメーション後1.5秒でスタート画面に遷移
    }
  }, [animationDone]);

  // 状態ごとのUIを切り替える関数
  const renderState = () => {
    switch (phase) {
      case 'loading':
        return <Loader animationDone={animationDone}/>
      case 'ready':
        return (
          <div className="game-state-container">
            <div className="title">
              <h1>Welcome to the Game!</h1>
              <button
                className="start-button"
                onClick={() => {
                  start();
                }}
              >
                Start Game
              </button>
            </div>
          </div>
        );
      case 'playing':
        return (
          <>
            <MenuButton />
          </>
        );
      default:
        return null;
    }
  };

  return <>{renderState()}</>;
};

export default GameStateManager;
