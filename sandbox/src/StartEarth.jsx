import React, { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Cloud, Clouds, useGLTF } from "@react-three/drei"
import { useSpring, a } from "@react-spring/three"
import useGame from "./manager/useGame.jsx"
import { MeshBasicMaterial } from "three"

const StartEarth = () => {
  const phase = useGame((state) => state.phase)
  const transition = useGame((state) => state.transition)
  const earthRef = useRef()
  const { scene } = useGLTF("./model/Earth.glb") // 🌍 3Dモデルをロード
  const [clicked, setClicked] = useState(false)
  const [disappeared, setDisappeared] = useState(false) // 🔥 消滅トリガー
  const rotationSpeedRef = useRef(0.3) // 🔥 初期回転速度
  const emissiveIntensityRef = useRef(0) // 🔥 発光強度
  const maxSpeed = 30 // 🔥 最大回転速度
  const acceleration = 0.1 // 🔥 回転加速度

  // 🔹 Earthのマテリアルを取得（ロード後に適用）
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.emissive = child.material.color // 🔥 元の色を発光に適用
          child.material.emissiveIntensity = 0 // 🔥 初期発光ゼロ
        }
      })
    }
  }, [scene])

  // 🔹 弾けて消えるアニメーション
  const { scale, opacity } = useSpring({
    scale: disappeared ? 0 : 0.05, // 🔥 消えるエフェクト
    opacity: disappeared ? 0 : 1,
    config: { mass: 1, tension: 500, friction: 50 },
    onRest: () => {
      if (disappeared) transition() // 🔥 爆発後にゲーム開始
    },
  })

  // 🔹 クリック後に徐々に回転速度を上げ、最大速度で弾ける
  useFrame(() => {
    // console.log(earthRef.current)
    if (earthRef.current && !disappeared) {
       
      if (clicked) {
        rotationSpeedRef.current = Math.min(rotationSpeedRef.current + acceleration, maxSpeed)
        emissiveIntensityRef.current = Math.min(rotationSpeedRef.current * 0.5, 10)

        earthRef.current.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.emissiveIntensity = emissiveIntensityRef.current
          }
        })

        if (rotationSpeedRef.current >= maxSpeed) {
          setDisappeared(true)
        }
      }
      earthRef.current.rotation.y += rotationSpeedRef.current * 0.02
    }
  })

  return (
    <>
     <a.primitive
      ref={earthRef}
      object={scene}
      scale={scale}
      position={[0, 100, 50]}
      opacity={opacity}
      onClick={() => setClicked(true)}
    />
    <Clouds material={MeshBasicMaterial}>
      <Cloud opacity={1} position={[0, 80, 0]} />
    </Clouds>
    </>
   
  )
}

export default StartEarth
