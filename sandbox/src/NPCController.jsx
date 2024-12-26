import React, { useEffect, useRef,forwardRef, useState, useImperativeHandle } from "react";
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
  const npcRef = useRef();
  const { nodes, animations } = useGLTF(modelPath); // モデルとアニメーションをロード
  const { actions } = useAnimations(animations,npcRef); // アニメーションを管理
  const  currentTarget  = useInteractionStore((state) => (state.currentTarget));
  const [isClose, setIsClose] = useState(false); // 接触状態を管理する

  useImperativeHandle(ref, () => ({
    setClose: (value) => setIsClose(value),
    getWorldPosition: (vector) => {
      if (npcRef.current) {
        npcRef.current.getWorldPosition(vector);
      }
    },
    quaternion: npcRef.current?.quaternion, // クォータニオンを公開
  }));

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
    // console.log(isClose,npcId)
    if (playerRef?.current && ref?.current && isClose) {
      const npcPosition = new Vector3();
      const playerPosition = new Vector3();
      npcRef.current.getWorldPosition(npcPosition);
      playerRef.current.getWorldPosition(playerPosition);
  
      // NPCが向くべき方向を計算
      const targetDirection = new Vector3().subVectors(playerPosition, npcPosition).normalize();
      const targetQuaternion = new Quaternion().setFromUnitVectors(
        new Vector3(1, 0, 0), // NPCの正面方向
        new Vector3(targetDirection.x, 0, targetDirection.z) // Y軸回転のみ考慮
      );
  
      // 現在の回転を取得し補間
      npcRef.current.quaternion.slerp(targetQuaternion, 0.1); // 0.1は補間速度
    }
  });
  return (
    <group 
      ref={npcRef} 
      position={position} 
      scale={scale} 
      rotation={rotation} 
      userData={{ type: "NPC", id: npcId, name: npcName}}
    >
      {/* モデルの描画 */}
      <primitive object={nodes.Scene} />
    </group>
  );
})

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb");
export default NPCController;
