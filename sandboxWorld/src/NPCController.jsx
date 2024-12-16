// import React, { useEffect } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";

// export default function NPCController({ modelPath, position, scale, rotation }) {
//   const { nodes, materials, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
//   const { actions } = useAnimations(animations); // アニメーションを管理

//   useEffect(() => {
//     console.log("Available animations:", animations); // ログでアニメーション名を確認
//     console.log("Available actions:", actions); // ログでactionsを確認

//     if (actions && actions.idle) {
//       actions.idle.reset().fadeIn(0.24).play(); // "idle" アニメーションを再生
//     } else {
//       console.warn("Idle animation not found");
//     }

//     return () => {
//       if (actions && actions.idle) {
//         actions.idle.fadeOut(0.5); // コンポーネントのアンマウント時に停止
//       }
//     };
//   }, [actions]);

//   return (
//     <group position={position} scale={scale} rotation={rotation}>
//       {/* モデルの描画 */}
//       <primitive object={nodes.Scene} />
//     </group>
//   );
// }

// // モデルのプリロード
// useGLTF.preload("./npc/carrot.glb");

import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3 } from "three";
import useInteractionStore from "./useInteractionStore"; // 会話状態を管理

export default function NPCController({
  modelPath,
  position,
  scale,
  rotation,
  npcId,
  playerRef,
}) {
  const { nodes, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
  const { actions } = useAnimations(animations); // アニメーションを管理
  const npcRef = useRef(); // NPCの参照
  const setCurrentNPC = useInteractionStore((state) => state.setCurrentNPC); // 会話可能なNPCを設定

  useEffect(() => {
    // アニメーション再生
    if (actions && actions.idle) {
      actions.idle.reset().fadeIn(0.24).play(); // "idle" アニメーションを再生
    }

    return () => {
      if (actions && actions.idle) {
        actions.idle.fadeOut(0.5); // コンポーネントのアンマウント時に停止
      }
    };
  }, [actions]);

  useEffect(() => {
    // プレイヤーとNPCの距離をチェック
    const checkProximity = () => {
        if (npcRef.current && playerRef?.current) {
        const npcPosition = new Vector3();
        const playerPosition = new Vector3();
        npcRef.current.getWorldPosition(npcPosition); // NPCのワールド座標を取得
        playerRef.current.getWorldPosition(playerPosition); // プレイヤーのワールド座標を取得
        
        const distance = npcPosition.distanceTo(playerPosition); // 距離を計算
        // console.log(distance)
        if (distance < 3) {
          setCurrentNPC(npcId); // 会話可能なNPCを設定
        //   console.log(npcId)
        } else {
          setCurrentNPC(null); // 離れたらリセット
        }
      }
    };

    const interval = setInterval(checkProximity, 100); // 定期的にチェック
    return () => clearInterval(interval); // クリーンアップ
  }, [npcId, playerRef, setCurrentNPC]);

  return (
    <group ref={npcRef} position={position} scale={scale} rotation={rotation}>
      {/* モデルの描画 */}
      <primitive object={nodes.Scene} />
    </group>
  );
}

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb");
