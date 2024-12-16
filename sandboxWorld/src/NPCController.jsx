import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function NPCController({ modelPath, position, scale, rotation }) {
  const { nodes, materials, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
  const { actions } = useAnimations(animations); // アニメーションを管理

  useEffect(() => {
    console.log(nodes)
    console.log("Available animations:", animations); // ログでアニメーション名を確認
    console.log("Available actions:", actions); // ログでactionsを確認

    if (actions && actions.idle) {
      actions.idle.reset().fadeIn(0.24).play(); // "idle" アニメーションを再生
    } else {
      console.warn("Idle animation not found");
    }

    return () => {
      if (actions && actions.idle) {
        actions.idle.fadeOut(0.5); // コンポーネントのアンマウント時に停止
      }
    };
  }, [actions]);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {/* モデルの描画 */}
      <primitive object={nodes.Scene} />
    </group>
  );
}

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb");
