import React, { useRef } from "react";
import NPCController from "./NPCController";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const NpcData = ({ playerRef, npcRefs }) => {
  const npcList = [
    {
      id: "npc1",
      modelPath: "./npc/carrot.glb",
      position: [9, 0, 4],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 1],
      colliderPosition: [9 ,1.5,4],
    },
    {
      id: "npc2",
      modelPath: "./npc/jam.glb",
      position: [-9, -1, 4],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 0.8],
      colliderPosition: [-9 ,0.2,4],
    },
  ];

  return npcList.map((npc) => {
    if (!npcRefs.current[npc.id]) {
      npcRefs.current[npc.id] = React.createRef(); // 動的にrefを作成
    }

    return (
      <RigidBody
        key={npc.id}
        type={"kinematicVelocity"}
        colliders={false}
        lockRotations
      >
        <NPCController
          modelPath={npc.modelPath}
          position={npc.position}
          rotation={npc.rotation}
          scale={0.5}
          npcId={npc.id}
          playerRef={playerRef}
          ref={npcRefs.current[npc.id]}
        />
        <CapsuleCollider
          args={npc.colliderArgs}
          position={npc.colliderPosition}
          friction={1}
        />
        <CapsuleCollider
        args={npc.colliderArgs}
        position={npc.colliderPosition}
        friction={1}
        sensor
          onIntersectionEnter={(event) => {
              console.log("Player is near the chest", event);
          }}
          onIntersectionExit={() => {
              console.log("Player left the chest area");
          }}
        >
        </CapsuleCollider>
      </RigidBody>
    );
  });
};

export default NpcData;
