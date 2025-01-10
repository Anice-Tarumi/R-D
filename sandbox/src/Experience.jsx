import Lights from "./Lights.jsx"
import { Physics, RigidBody } from "@react-three/rapier"
import CharacterController from "./CharacterController.jsx"
import { Perf } from "r3f-perf"
import React, { useRef } from "react"
import NpcData from "./NpcData.jsx"
import * as THREE from "three"
import Theatre from "./Theatre.jsx"
import useStageStore from "./useStageStore.jsx"
import City from "./city.jsx"
import { Sky } from "@react-three/drei"

export default function Experience({ canvasRef, onChestProximity }) {
  const playerRef = useRef()
  const npcRefs = useRef({})
  const chestRef = useRef()
  const chestRefs = useRef({})
  const raycaster = new THREE.Raycaster()
  const direction = new THREE.Vector3()
  const currentStage = useStageStore((state) => state.currentStage)

  const renderStage = () => {
    console.log(currentStage)
    switch (currentStage) {
      case "WildWest":
        return (
          <group key="wildwest">
            {" "}
            {/* keyを付与してステージ全体を再生成 */}
            <RigidBody type="fixed" friction={0}>
              {/* <WildWest scale={10} /> */}
              <City position={[0, -1, 0]} />
            </RigidBody>
            <group name="NPC">
              <NpcData
                playerRef={playerRef}
                npcRefs={npcRefs}
                chestRefs={chestRefs}
              />
            </group>
          </group>
        )
      case "Theatre":
        return (
          <group key="theatre">
            <RigidBody type="fixed" colliders="trimesh" friction={0}>
              <Theatre scale={8} />
            </RigidBody>
          </group>
        )
      default:
        return null
    }
  }

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <Perf position="top-left" />
      <Lights />
      <Sky
        distance={450000} // 空の描画範囲
        sunPosition={[100, 10, 100]} // 太陽の位置
        inclination={0.49} // 太陽の傾き
        azimuth={0.25} // 太陽の方位
        mieCoefficient={0.005} // 大気散乱の強さ
        mieDirectionalG={0.8} // 大気の前方散乱の強さ
        rayleigh={1} // 空の青み
      />
      <Physics key={currentStage} debug>
        <CharacterController
          canvasRef={canvasRef}
          npcRefs={npcRefs}
          ref={playerRef}
        />
        {renderStage()}
      </Physics>
    </>
  )
}
