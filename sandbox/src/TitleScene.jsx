import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text, Preload, ContactShadows, useGLTF } from '@react-three/drei'
import { easing, geometry } from 'maath'
import Experience from './Experience'
import useGame from './manager/useGame'
import Lights from './envs/Lights'

extend(geometry)

export const TitleScene = (canvasRef) => 
    {
      const phase = useGame((state) => state.phase)
      const transition = useGame((state) => state.transition) // 🔹 フェーズ変更用
      const start = useGame((state) => state.start) // 🔹 `playing` へ移行用
      const [zoomed, setZoomed] = useState(false)
      
      // if (phase !== "title" && phase !== "transition") return null
      return (
      <>
      <color attach="background" args={['#f0f0f0']} />
      <Frame id="01" name={`game`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[0, 0, 0]} rotation={[0, 0, 0]} setZoomed={setZoomed} transition={transition}>
        {/* <Gltf src="./map/city/scenev3.gltf" scale={8} position={[0, -20, -2]} />
        <Lights/> */}
        <Experience canvasRef={canvasRef}/>
      </Frame>
        <Rig zoomed={zoomed} start={start}/>
      <Preload all />
      </>
  )
  }


function Frame({ id, name, bg, width = 5, height = 8, children,setZoomed, transition, ...props }) {
  const portal = useRef()
  const [hovered, hover] = useState(false)
  const phase = useGame((state) => state.phase)
  const planeRef = useRef()
  
  // const start = useGame((state) => state.start)
  
  const rotationMesh = useRef()
  const newScale = 0.01

  useCursor(hovered)
  useFrame((state,delta, dt) => {
    // console.count("useFrame (TitleScene)")
    // if(phase === "playing")
    if(portal?.current){
      easing.damp(portal.current, 'blend', phase === "transition" ? 1 : 0, 0.2, dt)
    }
    if (planeRef.current.scale.x < 1) {
      planeRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.02) // 🔹 `lerp` で滑らかに拡大
    }
    
  })
  return (
    <>
    <group {...props} ref={rotationMesh}>
      {/* <Text font={suspend(medium).default} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={suspend(regular).default} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text> */}
      <mesh
        onDoubleClick={(e) => {
          if (phase === "title") {
            setZoomed(true) // 🔹 ズームを開始
            transition() // 🔹 `phase = "transition"` に変更
            
          }
          e.stopPropagation()
        }}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        ref={planeRef}
        scale={0.01}
      >
        <roundedPlaneGeometry args={[width, height, 0.1]} />
          <MeshPortalMaterial ref={portal} side={THREE.DoubleSide} >
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
        <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" />
      </mesh>
    </group>
    </>
  )
}
// function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0),zoomed,start }) {
  function Rig({ zoomed, start }) {
    const phase = useGame((state) => state.phase)
    const { camera } = useThree()
    const targetPosition = useRef(new THREE.Vector3(0, 1, -5))
    const focus = useRef(new THREE.Vector3(0, 1, 0))
    const transitionComplete = useRef(false)
    const lerpSpeed = 2
  
    useEffect(() => {
      if (phase !== "transition") return
      transitionComplete.current = false
    }, [phase])
  
    useFrame((state, delta) => {
      // console.count("useFrame (TitleScene)")
      if (phase !== "transition" || transitionComplete.current) return
      camera.position.lerp(targetPosition.current, 1 - Math.exp(-lerpSpeed * delta))
      camera.lookAt(focus.current)
      if (camera.position.distanceTo(targetPosition.current) < 0.01) {
        transitionComplete.current = true
        start()
      }
    })

    return null
}

export default TitleScene