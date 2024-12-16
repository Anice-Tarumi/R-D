import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Chara from './Chara.jsx'
import { MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
export default function Experience({canvasRef})
{
    return <>

        {/* <OrbitControls makeDefault /> */}
        <Perf position='top-left'/>
        <Lights />
        <Physics debug >
            
            <CharacterController canvasRef={canvasRef}/>
            {/* <RigidBody type='fixed' colliders={"hull"}>
                <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ [100,100,0.2] }>
                    <boxGeometry />
                    <meshStandardMaterial color="greenyellow" />
                </mesh>
            </RigidBody> */}
            <RigidBody type='fixed' colliders={"trimesh"} friction={0}>
                <WildWest scale={10} />
            </RigidBody>
        </Physics>

    </>
}