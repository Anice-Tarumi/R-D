import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Chara from './Chara.jsx'
import { MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import NPCController from './NPCController.jsx'

export default function Experience({canvasRef,gameState})
{
    return <>

        {/* <OrbitControls makeDefault /> */}
        <Perf position='top-left'/>
        <Lights />
        <Physics debug >
            
            <CharacterController canvasRef={canvasRef} gameState={gameState}/>
            {/* <RigidBody type='fixed' colliders={"hull"}>
                <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ [100,100,0.2] }>
                    <boxGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody> */}
            <RigidBody type='fixed' colliders={"trimesh"} friction={0}>
                <WildWest scale={10} />
            </RigidBody>
            <RigidBody type='fixed' >
            <NPCController modelPath="./npc/carrot.glb" position={[9 ,0,4]} scale={0.5} rotation={[0,Math.PI,0]}/>
            </RigidBody>
        </Physics>

    </>
}