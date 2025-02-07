import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3, Quaternion } from "three";
import useInteractionStore from "../manager/useInteractionStore"; // 会話状態を管理
import { useFrame } from "@react-three/fiber";
import useGame from "../manager/useGame";

const NPCController = forwardRef(({
  modelPath,
  position,
  scale,
  rotation,
  npcId,
  npcName,
  playerRef,
  type,
},ref) => {
  const npcRef = useRef()
  const { nodes, animations } = useGLTF(modelPath)
  const { actions } = useAnimations(animations,npcRef)
  const setCurrentTarget = useInteractionStore((state) => state.setCurrentTarget)
  const removeTarget = useInteractionStore((state) => state.removeTarget)
  const npcPosition = new Vector3()
  const playerPosition = new Vector3()
  const isTargetSetRef = useRef(false);
  const interactionDistance = 3
  const phase = useGame((state)=>state.phase)
  const npcRefs = useRef([]);

  useEffect(() => {
    if (npcRef.current) {
      npcRefs.current[npcId] = npcRef;
    }
    return () => {
      delete npcRefs.current[npcId];
    };
  }, []);
  
  useImperativeHandle(ref, () => ({
    // setClose: (value) => setIsClose(value),
    getWorldPosition: (vector) => {
      if (npcRef.current) {
        npcRef.current.getWorldPosition(vector)
      }
    },
    quaternion: npcRef.current?.quaternion,
  }))

  useEffect(() => {
    // アニメーション再生
    if (actions.idle) {
      actions.idle.reset().fadeIn(0.24).play()
      
    }

    return () => {
      if (actions && actions.idle) {
        actions.idle.fadeOut(0.5) // コンポーネントのアンマウント時に停止
      }
    }
  }, [actions])

  // useEffect(() => {
  //   console.log("カメラ制御発動");
  // }, [camera.position, camera.rotation]);
  let prevQuaternion = new Quaternion();
  useFrame((_, delta) => {
    // console.count("useFrame (npcController)");
  
    if (phase === "loading" || phase === "title" || phase === "transition" || phase === "talking") return;
  
    // elapsedTime += delta;
    // elapsedTime2 += delta;
  
    // if (elapsedTime < 0.5 && elapsedTime2 < 0.5) return;
  
    // elapsedTime = 0;
    // elapsedTime2 = 0;
  
    if (npcRef.current && playerRef?.current) {
      npcRef.current.getWorldPosition(npcPosition);
      playerRef.current.getWorldPosition(playerPosition);
  
      const distance = npcPosition.distanceTo(playerPosition);
      // console.log(distance)
      
    //   // NPCターゲットの処理
      if (distance < interactionDistance) {
        if (!isTargetSetRef.current) {
          setCurrentTarget(type, npcId);
          isTargetSetRef.current = true;
        }
      } else if (isTargetSetRef.current) {
        removeTarget();
        isTargetSetRef.current = false;
      }
  
    //   // NPCの回転処理
      if (isTargetSetRef.current) {
        const targetDirection = new Vector3().subVectors(playerPosition, npcPosition).normalize();
        const targetQuaternion = new Quaternion().setFromUnitVectors(
          new Vector3(1, 0, 0),
          new Vector3(targetDirection.x, 0, targetDirection.z)
        );
        if (npcRef.current.quaternion.angleTo(targetQuaternion) > 0.1) {
          npcRef.current.quaternion.slerp(targetQuaternion, 0.1);
        }
      }
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
  )
})

// モデルのプリロード
useGLTF.preload("./npc/carrot.glb")
useGLTF.preload("./npc/jam.glb")
useGLTF.preload("./npc/purete.glb")

export default NPCController