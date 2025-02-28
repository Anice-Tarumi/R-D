import React, { useEffect, useState } from "react"
import { useGLTF, useProgress } from "@react-three/drei"
import useGame from "../manager/useGame"
// import { EffectComposer, Mask, MaskPass } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber"

export default function Loader() {
  const { progress } = useProgress() // ロード進捗を取得 (0~100%)
  const [maskRadius, setMaskRadius] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const start = useGame((state) => state.start);
  const title = useGame((state) => state.title);

  useGLTF.preload("./map/city/scenev3.gltf");
  // useGLTF.preload("./npc/carrot.glb");
  // useGLTF.preload("./npc/jam.glb");
  // useGLTF.preload("./npc/purete.glb");

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setFadeOut(true); // 🔹 フェードアウト開始
        let startTime = performance.now();
        let duration = 1000;

        // requestAnimationFrame(animate);

        // setTimeout(() => {
          title(); // 🔹 フェードアウトが完了した後に `start()` を実行
          // start();
        // }, 1500);
      }, 1000); // 1秒後にフェードアウト開始
    }
  }, [progress, start]);

  return (
    <>
      <div className={`loader-container`}>
        <div className="load-contents">
          <p className="loading-text">{Math.floor(progress)}%</p>
        </div>
      </div>
    </>
  );
}
