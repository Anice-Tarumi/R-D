import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { CapsuleCollider, CuboidCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import React, { useEffect, useRef } from 'react'
import NpcData from './NpcData.jsx'
import Chest from './Chest.jsx'
import { useState } from 'react'
import Portal from './portal.jsx'
// import ChestGroup from './ChestGroup.jsx'

export default function Experience({canvasRef,onChestProximity})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const npcRefs = useRef({}); // NPCの参照をまとめて管理
    const chestRef = useRef();
    const chestRefs = useRef({}); // 宝箱の参照を管理
   
    // 宝箱の近接状態を親コンポーネントに通知
  const handleProximity = (isNearby) => {
    onChestProximity(isNearby, () => chestRef.current?.openChest());
  };

//   useEffect(() => {
//     console.log("Chest Refs:", chestRefs.current);
//   }, [chestRefs]);
      
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
            {/* <ChestGroup playerRef={playerRef} chestRefs={chestRefs}/> */}

            <RigidBody colliders={false} type='kinematicPosition'>
            <Chest 
                position={[4,-1,10]} 
                playerRef={playerRef} 
                onProximity={handleProximity} 
                ref={chestRef}
            />
            <CuboidCollider args={[1,1,1]} position={[4,0,10]}/>
            </RigidBody>
            <RigidBody type='fixed' colliders='trimesh'>
                <Portal position={[0,-2.5,-21]} scale={3}/>
            </RigidBody>
        </Physics>
        
    </>
}