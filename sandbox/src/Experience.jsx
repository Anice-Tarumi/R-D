import Lights from "./envs/Lights.jsx"
import { Physics, RigidBody } from "@react-three/rapier"
import CharacterController from "./player/CharacterController.jsx"
import { Perf } from "r3f-perf"
import React, { useEffect, useRef } from "react"
import NpcData from "./npc/NpcData.jsx"
// import useStageStore from "./manager/useStageStore.jsx"
import City from "./maps/City.jsx"
// import useGame from "./manager/useGame.jsx"
import NPCs from "./npc/NPCs.jsx"
import useGame from "./manager/useGame.jsx"
import MiniMap from "./ui/MiniMap.jsx"
import usePlayerStore from "./manager/usePlayerStore.jsx"

export default function Experience({ canvasRef }) {
  const playerRef = useRef()
  const npcRefs = useRef({})
  const phase = useGame((state) => state.phase)
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);

  // useEffect(() => {
  //   if (playerRef.current) {
  //     setPlayerRef(playerRef);
  //   }
  // }, [playerRef, setPlayerRef]);
  // const currentStage = useStageStore((state) => state.currentStage)

  return (
    <>
      {/* <Perf position="top-left" /> */}
      <Lights />
      <Physics debug>
        <CharacterController canvasRef={canvasRef} npcRefs={npcRefs} ref={playerRef} />
        <group key="city">
          <RigidBody type="fixed" friction={1}>
            <City position={[0, -1, 0]} />
          </RigidBody>
          <group name="NPC">
            <NPCs playerRef={playerRef} npcRefs={npcRefs} />
            {/* <NpcData playerRef={playerRef} npcRefs={npcRefs} />  */}
          </group>
        </group>
      </Physics>
      {/* {phase === "playing" && <MiniMap mapImage="/images/plane.png"/>} */}
    </>
  )
}
