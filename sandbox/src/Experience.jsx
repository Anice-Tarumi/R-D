import { Physics, RigidBody } from "@react-three/rapier"
import CharacterController from "./player/CharacterController.jsx"
import { Perf } from "r3f-perf"
import React, { useEffect, useRef } from "react"
import City from "./maps/City.jsx"
import NPCs from "./npc/NPCs.jsx"
import useGame from "./manager/useGame.jsx"
import usePlayerStore from "./manager/usePlayerStore.jsx"
import SimpleCloud from "./envs/SimpleCloud.jsx"
import SkyComponent from "./envs/SkyComponent.jsx"
import Ocean from "./envs/Ocean.jsx"
import useAudioStore from "./manager/useAudioStore.jsx"
import { useFrame } from "@react-three/fiber"

export default function Experience({ canvasRef }) {
  const playerRef = useRef()
  const npcRefs = useRef({})
  const phase = useGame((state) => state.phase)
  const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
  const sunRef = useRef()
  const isPlaying = useAudioStore((state) => state.isPlaying)
  const playBGM = useAudioStore((state) => state.playBGM)

  useEffect(() => {
    playBGM()
  }, [])

  return (
    <>
    {/* <Water rotation={[-Math.PI/2,0,0]} position={[0,-1,0]}/> */}
      {/* <Perf position="top-left" /> */}
      {/* <Lights /> */}
      <SimpleCloud/>
      {/* <Sun /> */}
      {/* <SkyShader/> */}
      {/* <SimpleSky/> */}
      <SkyComponent />
      {/* <SkyComponentv2/> */}
      <Ocean/>
      <Physics >
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
