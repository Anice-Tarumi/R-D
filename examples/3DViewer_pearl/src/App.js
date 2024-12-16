import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, CameraControls, Environment, PivotControls } from '@react-three/drei'
import { useControls } from 'leva'



export const App = () => (

  <>
    <Canvas shadows camera={{ position: [-3, 0.5, 3] }}>
      {/* <PivotControls anchor={[-1.1, -1.1, -1.1]} scale={0.75} lineWidth={3.5}> */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2, 2, 2]} />
          <Edges />
          <Side rotation={[0, 0, 0]} index={0}>
            {/* <torusGeometry args={[0.65, 0.3, 64]} /> */}
            <Ring1  scale={50}/>
            {/* <meshNormalMaterial /> */}
          </Side>
          <Side rotation={[0, Math.PI, 0]} index={1}>
            {/* <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
            <meshNormalMaterial /> */}
            <Ring2  scale={30}/>
          </Side>
          <Side rotation={[0, Math.PI / 2, Math.PI / 2]} index={2}>
            {/* <boxGeometry args={[1.15, 1.15, 1.15]} /> */}
            <Ring3  scale={50}/>
          </Side>
          <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} index={3}>
            {/* <octahedronGeometry /> */}
            <Ring4  scale={50}/>
          </Side>
          <Side rotation={[0, -Math.PI / 2, 0]} index={4}>
            {/* <icosahedronGeometry /> */}
            <Ring5  scale={30}/>
          </Side>
          <Side rotation={[0, Math.PI / 2, 0]} index={5}>
            {/* <dodecahedronGeometry /> */}
            <Ring6  scale={50}/>
          </Side>
        </mesh>
      {/* </PivotControls> */}
      <CameraControls makeDefault />
    </Canvas>
  </>
)

function Side({ rotation = [0, 0, 0], bg = '#e2f0ea', children, index }) {
  const mesh = useRef()
  const { worldUnits } = useControls({ worldUnits: false })
  const { nodes } = useGLTF('/aobox-transformed.glb')
  useFrame((state, delta) => {
    if(index == '0' || index == '1' || index == '4' || index == '5')
    mesh.current.rotation.y += delta
    else if(index == '2' || index == '3')
      mesh.current.rotation.x += delta
  })
  return (
    <MeshPortalMaterial worldUnits={worldUnits} attach={`material-${index}`}>
      {/** Everything in here is inside the portal and isolated from the canvas */}
      <ambientLight intensity={0.5} />
      <Environment preset="city" />
      {/** A box with baked AO */}
      <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
        <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
        <spotLight castShadow color={bg} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
      </mesh>
      {/** The shape */}
      <mesh castShadow receiveShadow ref={mesh}>
        {children}
        <meshLambertMaterial color={bg} />
      </mesh>
    </MeshPortalMaterial>
  )
}

function Ring1({scale})
{
  const ring1 = useGLTF('/ring1.gltf')
  
  
  return <primitive object={ring1.scene}  scale={scale} rotation={[-Math.PI * 0.5,0,-Math.PI * 0.5]}/>
  
}
function Ring2({scale})
{
  const ring2 = useGLTF('/ring2.gltf')
  
  
  return <primitive object={ring2.scene}  scale={scale} rotation={[-Math.PI * 0.5,0,-Math.PI * 0.5]}/>
  
}
function Ring3({scale})
{
  const ring3 = useGLTF('/ring3.gltf')
  
  
  return <primitive object={ring3.scene}  scale={scale} rotation={[-Math.PI * 0.5,0,-Math.PI * 0.5]}/>
  
}
function Ring4({scale})
{
  const ring4 = useGLTF('/ring4.gltf')
  
  
  return <primitive object={ring4.scene}  scale={scale} rotation={[-Math.PI * 0.5,-Math.PI * 0.5,-Math.PI * 0.5]}/>
  
}
function Ring5({scale})
{
  const ring5 = useGLTF('/ring5.gltf')
  
  
  return <primitive object={ring5.scene}  scale={scale} rotation={[-Math.PI * 0.5,0,0]}/>
  
}
function Ring6({scale})
{
  const ring6 = useGLTF('/ring6.gltf')
  
  
  return <primitive object={ring6.scene}  scale={scale} rotation={[-Math.PI * 0.5,0,0]}/>
  
}