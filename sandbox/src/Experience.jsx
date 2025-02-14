import { Physics, RigidBody } from "@react-three/rapier"
import CharacterController from "./player/CharacterController.jsx"
import React, { useEffect, useRef } from "react"
import City from "./maps/City.jsx"
import NPCs from "./npc/NPCs.jsx"
import useGame from "./manager/useGame.jsx"
import SimpleCloud from "./envs/SimpleCloud.jsx"
import SkyComponent from "./envs/SkyComponent.jsx"
import Ocean from "./envs/Ocean.jsx"
import useAudioStore from "./manager/useAudioStore.jsx"
import { Cloud, Clouds } from "@react-three/drei"
import * as THREE from "three"

export default function Experience({ canvasRef}) {
  const playerRef = useRef()
  const npcRefs = useRef({})
  const phase = useGame((state) => state.phase)
  const playBGM = useAudioStore((state) => state.playBGM)

  useEffect(() => {
    playBGM()
  }, [])

  return (
    <>
      <SimpleCloud/>
      {/* <Clouds material={THREE.MeshBasicMaterial}> */}
        {/* <Cloud segments={40} bounds={[10, 2, 2]} volume={10} color="orange" position={[0,10,100]} scale={2} visible/>
        <Cloud seed={1} scale={2} volume={5} color="hotpink" fade={100} position={[0,0,30]}/> */}
      {/* </Clouds> */}
      <SkyComponent />
      <Ocean/>
      <Physics >
        <CharacterController canvasRef={canvasRef} npcRefs={npcRefs} ref={playerRef}/>
        <group key="city">
          <RigidBody type="fixed" friction={1}>
            <City position={[0, -1, 0]} />
          </RigidBody>
          <group name="NPC">
            <NPCs playerRef={playerRef} npcRefs={npcRefs} />
          </group>
        </group>
      </Physics>
    </>
  )
}
