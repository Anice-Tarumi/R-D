import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { CapsuleCollider, CuboidCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './WildWest.jsx'
import React, { useEffect, useRef } from 'react'
import NpcData from './NpcData.jsx'
// import Chest from './Chest.jsx'
import Portal from './portal.jsx'
import * as THREE from 'three'
import useInteractionStore from './useInteractionStore.jsx'
import { useFrame } from '@react-three/fiber'
import Theatre from './Theatre.jsx'
import useStageStore from './useStageStore.jsx'
// import chestData from './chestData.jsx';
// import ChestGroup from './ChestGroup.jsx'
// import SimpleChest from './SimpleChest.jsx'

export default function Experience({canvasRef,onChestProximity})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const npcRefs = useRef({}); // NPCの参照をまとめて管理
    const chestRef = useRef();
    const chestRefs = useRef({});
    const raycaster = new THREE.Raycaster(); // レイキャスターを初期化
    const direction = new THREE.Vector3(); // カメラ方向を計算するためのベクトル
    const currentStage = useStageStore((state) => state.currentStage)
   
    // 宝箱の近接状態を親コンポーネントに通知
  const handleProximity = (isNearby) => {
    onChestProximity(isNearby, () => chestRef.current?.openChest());
  };

  const renderStage = () => {
    console.log(currentStage)
    switch (currentStage) {
        case "WildWest":
            return (
              <group key="wildwest"> {/* keyを付与してステージ全体を再生成 */}
                <RigidBody type="fixed" colliders="trimesh" friction={0}>
                  <WildWest scale={10} />
                </RigidBody>
                <group name="NPC">
                  <NpcData playerRef={playerRef} npcRefs={npcRefs} chestRefs={chestRefs} />
                </group>
                <group name="Portal">
                  <RigidBody type="fixed" colliders="trimesh">
                    <Portal position={[0, -2.5, -21]} id={"portal1"} playerRef={playerRef}/>
                  </RigidBody>
                </group>
              </group>
            );
          case "Theatre":
            return (
              <group key="theatre">
                <RigidBody type="fixed" colliders="trimesh" friction={0}>
                  <Theatre scale={8} />
                </RigidBody>
              </group>
            );
          default:
            return null;
    }
  };
      
    return <>
        {/* <OrbitControls makeDefault /> */}
        <Perf position='top-left' />
        <Lights />
        <Physics key={currentStage} debug >
            <CharacterController canvasRef={canvasRef} npcRefs={npcRefs} ref={playerRef} />
            {/* <RigidBody type='fixed' colliders={"trimesh"} friction={0}>
            {renderStage()}
            </RigidBody> */}
            {renderStage()}
            {/* <group name="NPC">
                <NpcData playerRef={playerRef} npcRefs={npcRefs} chestRefs={chestRefs}/>
            </group>
            <group name="Portal">
                <RigidBody type='fixed' colliders='trimesh'>
                    <Portal position={[0,-2.5,-21]} id={1}/>
                </RigidBody>
            </group> */}
        </Physics>
    </>
}