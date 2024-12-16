import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Chara from './Chara.jsx'
import { MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import NPCController from './NPCController.jsx'
import React, { useRef } from 'react'
import DialogButton from './DialogButton.jsx'

export default function Experience({canvasRef})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const handleConversationStart = (npcId) => {
        console.log(`Starting conversation with NPC: ${npcId}`);
        // 会話開始のロジックをここに追加
      };
    return <>

        {/* <OrbitControls makeDefault /> */}
        {/* <Perf position='top-left' /> */}
        <Lights />
        <Physics debug >
            
            <CharacterController canvasRef={canvasRef} ref={playerRef}/>
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
                <NPCController modelPath="./npc/carrot.glb" position={[9 ,0,4]} scale={0.5} rotation={[0,Math.PI,0]} npcId="npc1" playerRef={playerRef}>
                <DialogButton onStartConversation={handleConversationStart} />
                </NPCController>
            </RigidBody>
           
        </Physics>
        

    </>
}