import {
  shaderMaterial,
  Sparkles,
  useGLTF,
  useTexture,
} from "@react-three/drei"
import { useFrame, extend } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"
import portalVertexShader from "../portal/vertex.glsl"
import portalFragmentShader from "../portal/fragment.glsl"
import useInteractionStore from "../manager/useInteractionStore"

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color("#ffffff"),
    uColorEnd: new THREE.Color("#000000"),
  },
  portalVertexShader,
  portalFragmentShader
)

extend({ PortalMaterial })

export default function Portal({ position, id, playerRef }) {
  const portalRef = useRef()
  const setCurrentTarget = useInteractionStore(
    (state) => state.setCurrentTarget
  )
  const removeTarget = useInteractionStore((state) => state.removeTarget)
  const [isTargetSet, setIsTargetSet] = useState(false)
  const { nodes } = useGLTF("./model/portal.glb")

  const bakedTexture = useTexture("./model/baked.jpg")
  bakedTexture.flipY = false

  const portalMaterial = useRef()
  const portalPosition = new THREE.Vector3()
  const playerPosition = new THREE.Vector3()
  let elapsedTime = 0
  const checkDistance = 5
  const interactionDistance = 3

  useFrame((delta) => {
    elapsedTime += delta // フレームごとに時間を加算
    if (elapsedTime < 0.3) return // 0.5秒未満なら処理をスキップ
        elapsedTime = 0 // 経過時間をリセット
    // console.log(portalRef.current,playerRef.current)
    if (!portalRef.current || !playerRef?.current) return

    portalRef.current.getWorldPosition(portalPosition)
    playerRef.current.getWorldPosition(playerPosition)
    const distance = portalPosition.distanceTo(playerPosition)
    if (distance > checkDistance) return

    if (distance < interactionDistance) {
      if (!isTargetSet) {
        setCurrentTarget("PORTAL", id)
        setIsTargetSet(true)
      }
    } else {
      if (isTargetSet) {
        removeTarget()
        setIsTargetSet(false)
      }
    }
  })

  useFrame(()=>{
    // ポータルシェーダーの時間更新
    if (portalMaterial.current) {
        portalMaterial.current.uTime += 0.05 // ポータルシェーダーのアニメーション速度
      }
  })

  return (
    <>
      <group
        position={position}
        scale={3}
        userData={{ type: "PORTAL", id }}
        ref={portalRef}
      >
        <mesh geometry={nodes.baked.geometry}>
          <meshBasicMaterial map={bakedTexture} />
        </mesh>

        <mesh
          geometry={nodes.poleLightA.geometry}
          position={nodes.poleLightA.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.poleLightB.geometry}
          position={nodes.poleLightB.position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>

        <mesh
          geometry={nodes.portalLight.geometry}
          position={nodes.portalLight.position}
          rotation={nodes.portalLight.rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles
          scale={[4, 2, 4]}
          count={40}
          size={6}
          position-y={1}
          speed={0.2}
          color={"black"}
        />
      </group>
    </>
  )
}
