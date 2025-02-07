import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { Vector3, Quaternion } from "three";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";
import useInteractionStore from "../manager/useInteractionStore"; // 会話状態を管理
import { useFrame } from "@react-three/fiber";
import useGame from "../manager/useGame";

const NPC_LIST = [
  {
    id: "npc1",
    name: "Carrot",
    modelPath: "./npc/carrot.glb",
    position: [9, -1, 4],
    scale: [0.5, 0.5, 0.5],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.5, 1],
    colliderPosition: [9, 0.5, 4],
  },
  {
    id: "npc2",
    name: "Jam",
    modelPath: "./npc/jam.glb",
    position: [-9, -1, 4],
    scale: [0.5, 0.5, 0.5],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.5, 0.8],
    colliderPosition: [-9, 0.2, 4],
  },
  {
    id: "npc3",
    name: "Purete",
    modelPath: "./npc/purete.glb",
    position: [-9, -0.7, 15],
    scale: [0.5, 0.5, 0.5],
    rotation: [0, Math.PI, 0],
    colliderArgs: [0.5, 0.8],
    colliderPosition: [-9, 0.2, 15],
  },
];

const NPCs = forwardRef(({ playerRef, npcRefs }, ref) => {
  const isTargetSetRef = useRef({});
  const setCurrentTarget = useInteractionStore((state) => state.setCurrentTarget);
  const removeTarget = useInteractionStore((state) => state.removeTarget);
  const phase = useGame((state) => state.phase);
  const interactionDistance = 3;

  useImperativeHandle(ref, () => ({
    getNPCRef: (id) => npcRefs.current[id] || null,
  }));

  useFrame(() => {
    if (phase === "loading" || phase === "title" || phase === "transition" || phase === "talking") return;

    Object.keys(npcRefs.current).forEach((npcId) => {
      const npcRef = npcRefs.current[npcId];
      if (!npcRef || !npcRef.current || !playerRef.current) return;

      const npcPosition = new Vector3();
      const playerPosition = new Vector3();

      npcRef.current.getWorldPosition(npcPosition);
      playerRef.current.getWorldPosition(playerPosition);

      const distance = npcPosition.distanceTo(playerPosition);

      if (distance < interactionDistance) {
        if (!isTargetSetRef.current[npcId]) {
          setCurrentTarget("NPC", npcId);
          isTargetSetRef.current[npcId] = true;
        }
      } else if (isTargetSetRef.current[npcId]) {
        removeTarget();
        isTargetSetRef.current[npcId] = false;
      }

      if (isTargetSetRef.current[npcId]) {
        const targetDirection = new Vector3().subVectors(playerPosition, npcPosition).normalize();
        const targetQuaternion = new Quaternion().setFromUnitVectors(
          new Vector3(1, 0, 0),
          new Vector3(targetDirection.x, 0, targetDirection.z)
        );

        if (npcRef.current.quaternion.angleTo(targetQuaternion) > 0.1) {
          npcRef.current.quaternion.slerp(targetQuaternion, 0.1);
        }
      }
    });
  });

  return (
    <group name="NPCs">
      {NPC_LIST.map(({ id, name, modelPath, position, scale, rotation, colliderArgs, colliderPosition }) => {
        const npcRef = useRef();

        useEffect(() => {
          if (npcRef.current) {
            npcRefs.current[id] = npcRef;
          }
          return () => {
            delete npcRefs.current[id];
          };
        }, []);

        const { nodes, animations } = useGLTF(modelPath);
        const { actions } = useAnimations(animations, npcRef);

        useEffect(() => {
          if (actions?.idle) {
            actions.idle.reset().fadeIn(0.24).play();
          }
          return () => {
            if (actions?.idle) {
              actions.idle.fadeOut(0.5);
            }
          };
        }, [actions]);

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
            </group>
            <CapsuleCollider args={colliderArgs} position={colliderPosition} friction={1} />
          </RigidBody>
        );
      })}
    </group>
  );
});


export default NPCs;
