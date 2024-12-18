import React, { useEffect, useRef,forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3 } from "three";
import useInteractionStore from "./useInteractionStore"; // 会話状態を管理
import { useFrame } from "@react-three/fiber";

const NPCController = forwardRef(({
  modelPath,
  position,
  scale,
  rotation,
  npcId,
  playerRef,
},ref) => {
  const { nodes, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
  const { actions } = useAnimations(animations); // アニメーションを管理
  // const npcRef = useRef(); // NPCの参照
  // const npcInternalRef = useRef();
  const setCurrentNPC = useInteractionStore((state) => state.setCurrentNPC); // 会話可能なNPCを設定
  const clearNPC = useInteractionStore((state) => state.clearNPC); // 会話可能なNPCを設定
  let isClose = false
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

  useFrame(() => {
    if (playerRef?.current && ref?.current) {
      const playerPosition = new Vector3();
      const npcPosition = new Vector3();
  
      playerRef.current.getWorldPosition(playerPosition); // プレイヤー座標を取得
      ref.current.getWorldPosition(npcPosition); // NPC座標を取得
  
      // プレイヤーとNPCの水平位置差分を計算
      const direction = playerPosition.clone().sub(npcPosition);
      direction.y = 0; // Y軸の高さを無視（水平回転のみ）
  
      // Y軸の回転角度を計算（atan2を使用）
      const targetRotationY = Math.atan2(direction.x, direction.z);
  
      // 角度をNPCのrotation.yに適用
      ref.current.rotation.y = targetRotationY - Math.PI/2; // 補正のためMath.PIを加える
    }
  });
  

  // useEffect(() => {
  //   // 親コンポーネントのrefに内部のgroup要素を渡す
  //   if (ref) {
  //     ref.current = npcRef.current;
  //     // console.log("Ref successfully set in NPCController:", ref.current);
  //   }
  // }, [ref]);

  // useEffect(() => {
  //   if (playerRef.current && ref.current) {
  //     const playerPosition = new Vector3();
  //     playerRef.current.getWorldPosition(playerPosition);

  //     // NPCをプレイヤーの方向に向ける
  //     ref.current.lookAt(playerPosition);
  //   }
  //   // console.log(npcRef)
  // }, []);

  useEffect(() => {
    // console.log(ref.current,playerRef?.current)
    // プレイヤーとNPCの距離をチェック
    const checkProximity = () => {
        if (ref.current && playerRef?.current) {
        const npcPosition = new Vector3();
        const playerPosition = new Vector3();
        ref.current.getWorldPosition(npcPosition); // NPCのワールド座標を取得
        playerRef.current.getWorldPosition(playerPosition); // プレイヤーのワールド座標を取得
        
        const distance = npcPosition.distanceTo(playerPosition); // 距離を計算
        // console.log(distance)
        // 初回評価と近づいた状態の切り替え
        if (distance < 3 && !isClose) {
          // console.log(`Player is close to NPC ${npcId}`);
          isClose = true;
          setCurrentNPC(npcId); // NPCを設定
        } else if (distance >= 3 && isClose) {
          // console.log(`Player moved away from NPC ${npcId}`);
          isClose = false;
          clearNPC(); // NPCの状態をリセット
        }
      }
    };

    const interval = setInterval(checkProximity, 100); // 定期的にチェック
    return () => clearInterval(interval); // クリーンアップ
  }, [npcId, playerRef, setCurrentNPC]);

  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation}>
      {/* モデルの描画 */}
      <primitive object={nodes.Scene} />
    </group>
  );
})

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb");
export default NPCController;
