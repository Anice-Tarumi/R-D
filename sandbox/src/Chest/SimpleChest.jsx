import React, { useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import * as THREE from "three"

const SimpleChest = () => {
  const chestRef = useRef()
  const { scene, animations } = useGLTF("./chests/Chest.glb")
  const { actions } = useAnimations(animations, chestRef)

  const openChest = () => {
    const animationName = "Chest_Open"
    if (actions[animationName]) {
      const action = actions[animationName]
      action.reset()
      action.setLoop(THREE.LoopOnce) // アニメーションを一度だけ再生
      action.clampWhenFinished = true // 最後のフレームで停止
      action.play()
      console.log(`Playing animation: ${animationName}`)
    } else {
      console.warn(`Animation ${animationName} not found`)
    }
  }

  return (
    <group ref={chestRef} onClick={openChest}>
      <primitive object={scene} />
    </group>
  )
}

export default SimpleChest
