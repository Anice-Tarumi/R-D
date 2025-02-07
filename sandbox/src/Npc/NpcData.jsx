import React from "react"
import NPCController from "./NPCController"
import { RigidBody, CapsuleCollider, BallCollider } from "@react-three/rapier"

const NpcData = ({ playerRef, npcRefs }) => { 
  
  const npcList = [
    {
      id: "npc1",
      name: "Carrot",
      modelPath: "./npc/carrot.glb",
      position: [9, -1, 4],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 1],
      colliderPosition: [9 ,0.5,4],
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
    {
      id: "npc3",
      name: "Purete",
      modelPath: "./npc/purete.glb",
      position: [-9, -0.7, 15],
      rotation: [0, Math.PI, 0],
      colliderArgs: [0.5, 0.8],
      colliderPosition: [-9 ,0.2,15],
    },
  ]
  return npcList.map((npc) => {
    if (!npcRefs.current[npc.id]) {
      npcRefs.current[npc.id] = React.createRef()
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
          type = {"NPC"}
          ref={npcRefs.current[npc.id]}
          npcRefs={npcRefs}
        />
        <CapsuleCollider
          args={npc.colliderArgs}
          position={npc.colliderPosition}
          friction={1}
        />
      </RigidBody>
    )
  })
}

export default NpcData
