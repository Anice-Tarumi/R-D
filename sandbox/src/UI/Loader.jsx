// import React from "react"
// import { useProgress } from "@react-three/drei"

// export default function Loader({ animationDone }) {
//   const { progress } = useProgress() // ロード進捗を取得 (0~100%)

//   return (
//     <div className={`loader-container ${animationDone ? "fade-out" : ""}`}>
//       <div className="load-contents">
//         {/* スピナー */}
//         <div className="spinner"></div>

//         {/* プログレスバー */}
//         <div className="progress-bar">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>

//         {/* ローディングテキスト */}
//         <p className="loading-text">{Math.floor(progress)}% Loaded</p>
//       </div>
//     </div>
//   )
// }
// Loader.jsx
import React, { useEffect, useState } from "react";
import { useGLTF, useProgress } from "@react-three/drei";
import useGame from "../manager/useGame";
import { useFrame } from "@react-three/fiber";

export default function Loader() {
  const { progress } = useProgress(); // ロード進捗を取得 (0~100%)
  const [fadeOut, setFadeOut] = useState(false);
  const title = useGame((state) => state.title)
  useGLTF.preload("./map/city/scenev3.gltf");
  useGLTF.preload("./npc/carrot.glb");
  useGLTF.preload("./npc/jam.glb");
  useGLTF.preload("./npc/purete.glb");

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true); // 🔹 フェードアウト開始
        setTimeout(() => {
          title(); // 🔹 フェードアウトが完了した後に `title()` を実行
        }, 1000); // 1秒かけてフェードアウトしてからタイトル画面へ
      }, 500); // 0.5秒後に `fadeOut` 開始
    }
  }, [progress, title]);

  return (
    <div className={`loader-container ${fadeOut ? "fade-out" : ""}`}>
      <div className="load-contents">
        {/* ゲームのロゴ */}
        <div className="loader-logo">GAME LOGO</div>

        {/* ローディングの進捗（% のみ表示） */}
        <p className="loading-text">{Math.floor(progress)}%</p>
      </div>
    </div>
  );
}