import React from "react";
import {useProgress } from "@react-three/drei";

export default function Loader({animationDone}){
  const { progress } = useProgress(); // ロード進捗を取得 (0~100%)

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
  )
}