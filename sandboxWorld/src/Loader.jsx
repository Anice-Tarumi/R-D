import React from "react";
import {useProgress } from "@react-three/drei";

export default function Loader(){
  const { progress } = useProgress(); // ロード進捗を取得 (0~100%)

  return (
    <div>
      <div className="loader-container">
        {/* プログレスバー */}
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* ローディングの進捗テキスト */}
        <p>{Math.round(progress)}%</p>
        {/* スピナー */}
        <div className="spinner"></div>
      </div>
      </div>
  )
}