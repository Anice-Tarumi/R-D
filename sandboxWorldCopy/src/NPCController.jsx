import React, { useEffect, useRef,forwardRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3 } from "three";
import useInteractionStore from "./useInteractionStore"; // 会話状態を管理
import { useFrame } from "@react-three/fiber";
import { Quaternion } from "three";

const NPCController = forwardRef(({
  modelPath,
  position,
  scale,
  rotation,
  npcId,
  npcName,
  playerRef,
},ref) => {
  const { nodes, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
  const { actions } = useAnimations(animations); // アニメーションを管理
  const setCurrentNPC = useInteractionStore((state) => state.setCurrentNPC); // 会話可能なNPCを設定
  const clearNPC = useInteractionStore((state) => state.clearNPC); // 会話可能なNPCを設定
  let isClose = false
  // let isClose = true
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
    // console.log(playerRef,ref,isClose)
    if (playerRef?.current && ref?.current && isClose) {
      const npcPosition = new Vector3();
      const playerPosition = new Vector3();
      // console.log(npcPosition,playerPosition)
      ref.current.getWorldPosition(npcPosition);
      playerRef.current.getWorldPosition(playerPosition);
      // console.log("mamamam")
  
      // NPCが向くべき方向を計算
      const targetDirection = new Vector3().subVectors(playerPosition, npcPosition).normalize();
      const targetQuaternion = new Quaternion().setFromUnitVectors(
        new Vector3(1, 0, 0), // NPCの正面方向
        new Vector3(targetDirection.x, 0, targetDirection.z) // Y軸回転のみ考慮
      );
  
      // 現在の回転を取得し補間
      ref.current.quaternion.slerp(targetQuaternion, 0.1); // 0.1は補間速度
    }
  });

  
  

  // useEffect(() => {
  //   // console.log(ref.current,playerRef?.current)
  //   // プレイヤーとNPCの距離をチェック
  //   const checkProximity = () => {
  //       if (ref.current && playerRef?.current) {
  //       const npcPosition = new Vector3();
  //       const playerPosition = new Vector3();
  //       ref.current.getWorldPosition(npcPosition); // NPCのワールド座標を取得
  //       playerRef.current.getWorldPosition(playerPosition); // プレイヤーのワールド座標を取得
        
  //       const distance = npcPosition.distanceTo(playerPosition); // 距離を計算
  //       // console.log(distance)
  //       // 初回評価と近づいた状態の切り替え
  //       // console.log(distance < 3 , !isClose)
  //       if (distance < 3 && !isClose) {
  //         console.log(`Player is close to NPC ${npcId}`);
  //         isClose = true;
  //         setCurrentNPC(npcId); // NPCを設定
  //       } else if (distance >= 3 && isClose) {
  //         // console.log(`Player moved away from NPC ${npcId}`);
  //         isClose = false;
  //         clearNPC(); // NPCの状態をリセット
  //       }
  //     }
  //   };

  //   const interval = setInterval(checkProximity, 100); // 定期的にチェック
  //   return () => clearInterval(interval); // クリーンアップ
  // }, [npcId, playerRef, setCurrentNPC]);

  return (
    <group ref={ref} position={position} scale={scale} rotation={rotation} userData={{ type: "NPC", id: npcId, name: npcName}}>
      {/* モデルの描画 */}
      <primitive object={nodes.Scene} />
    </group>
  );
})

// export const facePlayer = (npcRef, playerPosition) => {
//   const npcPosition = new THREE.Vector3();
//   npcRef.current.getWorldPosition(npcPosition);

//   // プレイヤーとNPCの位置差を計算
//   const direction = new THREE.Vector3().subVectors(playerPosition, npcPosition);

//   // atan2でY軸回転角度を計算
//   const angle = Math.atan2(direction.x, direction.z);

//   // NPCの回転を更新
//   npcRef.current.rotation.set(0, angle, 0);
// };

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb");
export default NPCController;
