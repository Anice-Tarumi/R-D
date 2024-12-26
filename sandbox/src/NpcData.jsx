import React, { useRef } from "react";
import NPCController from "./NPCController";
import { RigidBody, CapsuleCollider, BallCollider } from "@react-three/rapier";

const NpcData = ({ playerRef, npcRefs }) => { 
  
  const npcList = [
    {
      id: "npc1",
      name: "Carrot",
      modelPath: "./npc/carrot.glb",
      position: [9, 0, 4],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 1],
      colliderPosition: [9 ,1.5,4],
    },
    {
      id: "npc2",
      name: "Jam",
      modelPath: "./npc/jam.glb",
      position: [-9, -1, 4],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 0.8],
      colliderPosition: [-9 ,0.2,4],
    },
  ];
  return npcList.map((npc) => {
    if (!npcRefs.current[npc.id]) {
      npcRefs.current[npc.id] = React.createRef();
    }

    return (
      <RigidBody
        key={npc.id}
        type={"kinematicVelocity"}
        colliders={false}
        lockRotations
        userData={{ type: "NPC", id: npc.id, name: npc.name}}
      >
        <NPCController
          modelPath={npc.modelPath}
          position={npc.position}
          rotation={npc.rotation}
          scale={0.5}
          npcId={npc.id}
          npcName={npc.name}
          playerRef={playerRef}
          ref={npcRefs.current[npc.id]}
        />
        <CapsuleCollider
          args={npc.colliderArgs}
          position={npc.colliderPosition}
          friction={1}
        />
        <BallCollider
          args={npc.colliderArgs}
          position={npc.colliderPosition}
          sensor={true}
          // collisionGroups={{
          //   group: 0b0010,
          //   mask : 0b0001,
          // }}
          onIntersectionEnter={(event) =>{
            // console.log("event",event)
            const { type, id } = event.other.rigidBodyObject.userData || {};
            if (type === "Player") {
              // console.log(`Player is near NPC: ${npc.id}`);
              npcRefs.current[npc.id].current.setClose(true);
            }
          }}
          onIntersectionExit={(event) => {
            const { type, id } = event.other.rigidBodyObject.userData || {};
            if (type === "Player") {
              // console.log(`Player left NPC: ${npc.id}`);
              npcRefs.current[npc.id].current.setClose(false);
            }
          }}
        />
      </RigidBody>
    );
  });
};

export default NpcData;
