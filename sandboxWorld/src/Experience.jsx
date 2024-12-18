import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Chara from './Chara.jsx'
import { CapsuleCollider, CuboidCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import NPCController from './NPCController.jsx'
import React, { useEffect, useRef } from 'react'
import DialogButton from './DialogButton.jsx'
import NpcData from './NpcData.jsx'
import DialogueUI from './DialogueUI.jsx'
import ChestController from './ChestController.jsx'
import { ChestTest } from './chesttest.jsx'
import ChestGroup from './ChestGroup.jsx'

export default function Experience({canvasRef})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const npcRef = useRef(); // NPCへの参照
    const npcRef2 = useRef(); // NPCへの参照
    const npcRefs = useRef({}); // NPCの参照をまとめて管理
    // console.log("npcRefs",npcRefs)
    const handleConversationStart = (npcId) => {
        console.log(`Starting conversation with NPC: ${npcId}`);
        // 会話開始のロジックをここに追加
      };
      useEffect(() => {
        // console.log("After render npcRef:", npcRef);
      }, []);
    return <>

        {/* <OrbitControls makeDefault /> */}
        <Perf position='top-left' />
        <Lights />
        <Physics debug >
            
            <CharacterController canvasRef={canvasRef} npcRefs={npcRefs} ref={playerRef} />
            <RigidBody type='fixed' colliders={"trimesh"} friction={0}>
                <WildWest scale={10} />
            </RigidBody>
            {/* <RigidBody  type={'kinematicVelocity'} colliders={false} lockRotations>
                <NPCController modelPath="./npc/carrot.glb" position={[9 ,0,4]} scale={0.5} rotation={[0,Math.PI,0]} npcId="npc1" playerRef={playerRef} ref={npcRef}/>
                <CapsuleCollider args={[0.5, 1]} friction={1} position={[9 ,1.5,4]} />
            </RigidBody>

            <RigidBody  type={'kinematicVelocity'} colliders={false} lockRotations>
                <NPCController modelPath="./npc/jam.glb" position={[-9 ,-1,4]} scale={0.5} rotation={[0,Math.PI,0]} npcId="npc2" playerRef={playerRef} ref={npcRef2}/>
                <CapsuleCollider args={[0.5, 0.8]} friction={1} position={[-9 ,0.2,4]} />
            </RigidBody> */}
            {/* NPC */}
            <NpcData playerRef={playerRef} npcRefs={npcRefs} />
            {/* <ChestController /> */}
            {/* <RigidBody colliders={false} type='fixed'>
                <ChestTest position={[4,-1,10]} rotation={[0,Math.PI,0]} >
                </ChestTest>
                <CuboidCollider args={[1,1,1]} position={[4,0,10]}/>
            </RigidBody> */}
            <ChestGroup playerRef={playerRef}/>
        </Physics>
        

    </>
}