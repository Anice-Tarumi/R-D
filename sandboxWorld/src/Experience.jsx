import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import { CapsuleCollider, CuboidCollider, MeshCollider, Physics, RigidBody } from '@react-three/rapier'
import CharacterController from './CharacterController.jsx'
import { Perf } from 'r3f-perf'
import WildWest from './Scene.jsx'
import React, { useEffect, useRef } from 'react'
import NpcData from './NpcData.jsx'
import Chest from './Chest.jsx'
import Portal from './portal.jsx'
import * as THREE from 'three'
import useInteractionStore from './useInteractionStore.jsx'
import { useFrame } from '@react-three/fiber'

export default function Experience({canvasRef,onChestProximity})
{
    const playerRef = useRef(); // プレイヤーの参照を作成
    const npcRefs = useRef({}); // NPCの参照をまとめて管理
    const chestRef = useRef();
    const chestRefs = useRef({}); // 宝箱の参照を管理
    const raycaster = new THREE.Raycaster(); // レイキャスターを初期化
    const direction = new THREE.Vector3(); // カメラ方向を計算するためのベクトル
   
    // 宝箱の近接状態を親コンポーネントに通知
  const handleProximity = (isNearby) => {
    onChestProximity(isNearby, () => chestRef.current?.openChest());
  };


// useFrame(() => {
//     if (playerRef.current) {
//       const playerPosition = new THREE.Vector3();
//       const direction = new THREE.Vector3();
  
//       // プレイヤーの位置と向きを取得
//       playerRef.current.getWorldPosition(playerPosition);
//       console.log(playerRef.current)
//       playerRef.current.getWorldDirection(direction);
  
//       // レイキャストを設定
//       raycaster.set(playerPosition, direction);
  
//       // シーン全体を対象にレイキャスト
//       const intersects = raycaster.intersectObjects(scene.children, true);
  
//       if (intersects.length > 0) {
//         const targetObject = intersects[0].object;
  
//         // オブジェクトの名前で条件分岐
//         switch (targetObject.name) {
//           case "Chest":
//             useInteractionStore.setState({ currentTarget: "Chest", action: "Open the chest" });
//             break;
//           case "NPC":
//             useInteractionStore.setState({ currentTarget: "NPC", action: "Talk to the NPC" });
//             break;
//           case "Portal":
//             useInteractionStore.setState({ currentTarget: "Portal", action: "Enter the portal" });
//             break;
//           default:
//             useInteractionStore.setState({ currentTarget: null });
//             break;
//         }
//       } else {
//         useInteractionStore.setState({ currentTarget: null });
//       }
//     }
//   });
      
    return <>
        {/* <OrbitControls makeDefault /> */}
        <Perf position='top-left' />
        <Lights />
        <Physics debug >
            <CharacterController canvasRef={canvasRef} npcRefs={npcRefs} ref={playerRef} />
            <RigidBody type='fixed' colliders={"trimesh"} friction={0}>
                <WildWest scale={10} />
            </RigidBody>

            <group name="NPC">
                <NpcData playerRef={playerRef} npcRefs={npcRefs} />
            </group>
            

            <group name="Chest">
                <RigidBody 
                    colliders={false} 
                    type='kinematicPosition' 
                >
                    <Chest 
                        position={[4,-1,10]} 
                        playerRef={playerRef} 
                        onProximity={handleProximity} 
                        ref={chestRef}
                    />
                    <CuboidCollider 
                        args={[1,1,1]} 
                        position={[4,0,10]}
                    />
                    <CuboidCollider 
                        args={[1,1,1]} 
                        position={[4,0,10]}
                        sensor
                        onIntersectionEnter={(event) => {
                            console.log("Player is near the chest", event);
                        }}
                        onIntersectionExit={() => {
                            console.log("Player left the chest area");
                        }}
                    />
                </RigidBody>
            </group>

            <group name="Portal">
                <RigidBody type='fixed' colliders='trimesh'>
                    <Portal position={[0,-2.5,-21]} scale={3}/>
                </RigidBody>
            </group>
        </Physics>
        
    </>
}