import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { Vector3, Quaternion } from "three"
import { RigidBody, CapsuleCollider } from "@react-three/rapier"
import useInteractionStore from "../manager/useInteractionStore" // 会話状態を管理
import { useFrame } from "@react-three/fiber"
import useGame from "../manager/useGame"
import * as THREE from "three"
import { useMemo } from "react"
import Indicator from "../ui/Indicator"

const NPC_LIST = [
  {
    id: "npc1",
    name: "Carrot",
    modelPath: "./low_chara/m_5.glb",
    position: [9, -0.8, 4],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.6, 0.5],
    colliderPosition: [9, 0.5, 4],
  },
  {
    id: "npc2",
    name: "Jam",
    modelPath: "./low_chara/m_6.glb",
    position: [-9, -0.8, 4],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.6, 0.5],
    colliderPosition: [-9, 0.2, 4],
  },
  // {
  //   id: "npc3",
  //   name: "Purete",
  //   modelPath: "./npc/purete.glb",
  //   position: [-9, -0.7, 15],
  //   scale: [0.5, 0.5, 0.5],
  //   rotation: [0, Math.PI, 0],
  //   colliderArgs: [0.5, 0.8],
  //   colliderPosition: [-9, 0.2, 15],
  // },
  {
    id: "npc4",
    name: "M2",
    modelPath: "./low_chara/m_3.glb",
    position: [5, -1, 15],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.6, 0.5],
    colliderPosition: [5, 0.2, 15],
  },
  {
    id: "npc5",
    name: "M3",
    modelPath: "./low_chara/m_4.glb",
    position: [-9, -0.8, 20],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, 0, 0],
    colliderArgs: [0.6, 0.5],
    colliderPosition: [-9, 0.2, 20],
  },
]

const NPCs = forwardRef(({ playerRef, npcRefs }, ref) => {
  const isTargetSetRef = useRef({})
  const { currentTarget, setCurrentTarget, removeTarget } = useInteractionStore();
  const phase = useGame((state) => state.phase)
  const interactionDistance = 3
  const npcPosition = useMemo(() => new Vector3(), []);
  const playerPosition = useMemo(() => new Vector3(), []);
  let frameCounter = 0;

  useImperativeHandle(ref, () => ({
    getNPCRef: (id) => npcRefs.current[id] || null,
  }))

  const normalizeAngle = (angle) => {
    while (angle > Math.PI) angle -= 2 * Math.PI;
    while (angle < -Math.PI) angle += 2 * Math.PI;
    return angle;
  };
  

  useFrame(() => {
    
    frameCounter++;
  if (frameCounter % 2 !== 0) return
    if (phase === "loading" || phase === "title" || phase === "transition" || phase === "talking") return;
  
    Object.keys(npcRefs.current).forEach((npcId) => {
      const npcRef = npcRefs.current[npcId];
      if (!npcRef || !npcRef.current || !playerRef.current) return;
  
      // const npcPosition = new Vector3();
      // const playerPosition = new Vector3();
  
      npcRef.current.getWorldPosition(npcPosition);
      playerRef.current.getWorldPosition(playerPosition);
  
      const distance = npcPosition.distanceTo(playerPosition);
  
      // NPCがプレイヤーに近づいた際に向きを調整
      if (distance < interactionDistance) {
        if (!isTargetSetRef.current[npcId]) {
          setCurrentTarget("NPC", npcId);
          isTargetSetRef.current[npcId] = true;
          console.log(npcId)
        }
  
        // プレイヤー方向への回転計算
        const targetDirection = new Vector3().subVectors(playerPosition, npcPosition).normalize();
        const targetYRotation = Math.atan2(targetDirection.x, targetDirection.z);

        const currentYRotation = npcRef.current.rotation.y;
        let angleDifference = normalizeAngle(targetYRotation - currentYRotation);
        npcRef.current.rotation.y += angleDifference * 0.2;
  
        // Y軸のみ回転をスムーズに適用
        // const smoothedRotation = THREE.MathUtils.lerp(currentYRotation, targetYRotation, 0.05);
        // npcRef.current.rotation.y = smoothedRotation;
  
      } else if (isTargetSetRef.current[npcId]) {
        removeTarget();
        isTargetSetRef.current[npcId] = false;
        console.log(isTargetSetRef.current[npcId])
      }
    });
  });
  
  return (
    <group name="NPCs">
      {NPC_LIST.map(({ id, name, modelPath, position, scale, rotation, colliderArgs, colliderPosition }) => {
        const npcRef = useRef()

        useEffect(() => {
          if (npcRef.current) {
            npcRefs.current[id] = npcRef
          }
          return () => {
            delete npcRefs.current[id]
          }
        }, [])

        const { nodes, animations } = useGLTF(modelPath)
        const { actions } = useAnimations(animations, npcRef)

        useEffect(() => {
          const idleanimation = actions?.idle || actions?.Idle
          if (actions?.idle || actions?.Idle) {
            idleanimation.reset().fadeIn(0.24).play()
          }
          return () => {
            if (actions?.idle) {
              idleanimation.fadeOut(0.5)
            }
          }
        }, [actions])

        return (
          <RigidBody
            key={id}
            type={"kinematicVelocity"}
            colliders={false}
            lockRotations
            userData={{ type: "NPC", id, name }}
          >
            <group ref={npcRef} scale={scale} position={position} rotation={rotation} userData={{ type: "NPC", id, name }}>
              <primitive object={nodes.Scene} />
              <Indicator targetRef={npcRefs.current[id]} text="..." color="white" textColor="black" baseScale={0.2} activeScale={1.5} heightOffset={2.3} isActive={currentTarget?.type === "NPC" && currentTarget?.id === id} />
            </group>
            <CapsuleCollider args={colliderArgs} position={colliderPosition} friction={1} />
          </RigidBody>
        )
      })}
    </group>
  )
})

export default NPCs
