import React from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Cloud, Clouds } from "@react-three/drei"
import SimpleCloud from "./SimpleCloud"

const GradientSky = () => {
  const { viewport } = useThree()

  const planes = [
    { position: [0, 500, 0], rotation: [-Math.PI / 2, 0, 0] }, // 上面
    { position: [0, -500, 0], rotation: [Math.PI / 2, 0, 0] }, // 下面
    { position: [0, 0, -500], rotation: [0, Math.PI, 0] }, // 前面
    { position: [0, 0, 500], rotation: [0, 0, 0] }, // 背面
    { position: [-500, 0, 0], rotation: [0, -Math.PI / 2, 0] }, // 左面
    { position: [500, 0, 0], rotation: [0, Math.PI / 2, 0] }, // 右面
  ]

  return (
    <>
      {planes.map((plane, index) => (
        <mesh key={index} position={plane.position} rotation={plane.rotation} scale={[viewport.width * 5, viewport.height * 5, 1]}>
          <planeGeometry args={[500, 500]} />
          <shaderMaterial
            attach="material"
            args={[{
              uniforms: {
                colorTop: { value: new THREE.Color("#87CEEB") }, // 上部の空（スカイブルー）
                colorBottom: { value: new THREE.Color("#FFFFFF") }, // 下部の空（白っぽい）
              },
              vertexShader: `
                varying vec2 vUv
                void main() {
                  vUv = uv
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0)
                }
              `,
              fragmentShader: `
                varying vec2 vUv
                uniform vec3 colorTop
                uniform vec3 colorBottom
                void main() {
                  gl_FragColor = vec4(mix(colorBottom, colorTop, vUv.y), 1.0)
                }
              `,
            }]}
            side={THREE.BackSide} // 🔥 内側を描画（空の内側を覆う）
          />
        </mesh>
      ))}
      <SimpleCloud />
      {/* <Clouds material={THREE.MeshBasicMaterial} >
      
      <Cloud segments={100} bounds={[40, 4, 4]} volume={20} position={[0, 20, 200]} speed={0.2}  growth={10} />
      <Cloud scale={1} opacity={1} position={[0, 0, 80]} speed={0.5}/>
      
      <Cloud scale={2} opacity={1} position={[0, 20, -200]} />
      <Cloud scale={2} opacity={1} position={[20, 20, -200]} />
      
      <Cloud scale={2} opacity={1} position={[200, 20, 0]} />
      <Cloud scale={2} opacity={1} position={[200, 20, 20]} />
      
      <Cloud scale={2} opacity={1} position={[-200, 20, 0]} />
      <Cloud scale={2} opacity={1} position={[-200, 20, 20]} />
      </Clouds> */}
    </>
  )
}

export default GradientSky
