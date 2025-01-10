import React from "react"
import { useProgress } from "@react-three/drei"

export default function Loader({ animationDone }) {
  const { progress } = useProgress() // ロード進捗を取得 (0~100%)

  return (
    <div className={`loader-container ${animationDone ? "fade-out" : ""}`}>
      <div className="load-contents">
        {/* スピナー */}
        <div className="spinner"></div>

        {/* プログレスバー */}
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* ローディングテキスト */}
        <p className="loading-text">{Math.floor(progress)}% Loaded</p>
      </div>
    </div>
  )
}
