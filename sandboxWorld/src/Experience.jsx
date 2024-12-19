import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { CapsuleCollider, CuboidCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import React, { useEffect, useRef } from 'react'
import NpcData from './NpcData.jsx'
import ChestGroup from './ChestGroup.jsx'

export default function Experience({canvasRef})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const npcRef = useRef(); // NPCへの参照
    const npcRef2 = useRef(); // NPCへの参照
    const npcRefs = useRef({}); // NPCの参照をまとめて管理
    const chestRefs = useRef({}); // 宝箱の参照を管理
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
            <NpcData playerRef={playerRef} npcRefs={npcRefs} />
            <ChestGroup playerRef={playerRef} chestRefs={chestRefs}/>
        </Physics>
    </>
}