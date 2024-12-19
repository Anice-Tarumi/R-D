import React,{ useEffect, useRef } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { ChestTest } from "./chesttest";
import useChestStore from "./useChestStore";


const normalTreasurePass = "./chests/Chest.glb"

const chestData = [
  {
    id: "chest1",
    modelPath: normalTreasurePass,
    position: [4, -1, 10],
    rotation: [0,Math.PI,0],
    colliderArgs: [1, 1, 1], // コライダーの大きさ
    colliderPosition: [4 ,0,10],
  },
  {
    id: "chest2",
    modelPath: normalTreasurePass,
    position: [-3, -1, 10],
    rotation: [0,Math.PI,0],
    colliderArgs: [1.2, 1.2, 1.2], // コライダーの大きさ
    colliderPosition: [-3 ,0,10],
  },
  {
    id: "chest3",
    modelPath: normalTreasurePass,
    position: [0, 0, 15],
    rotation: [0,Math.PI,0],
    colliderArgs: [1.2, 1.2, 1.2], // コライダーの大きさ
    colliderPosition: [0 ,1,15],
  }
];

const ChestGroup = ({ playerRef,chestRefs }) => {
  const chestStates = useChestStore((state) => state.chestStates);
  // console.log("chestData",chestData)
  useEffect(() => {
    console.log("Chest Refs:", chestRefs.current);
  }, [chestRefs]);

  return (
    <>
      {chestData.map((chest) => {
        if (!chestRefs.current[chest.id]) {
          chestRefs.current[chest.id] = React.createRef(); // 動的にrefを作成
        }

        return (
          <RigidBody
            key={chest.id}
            colliders={false}
            type={"kinematicVelocity"}
            lockRotations
          >
            <ChestTest
              ref={chestRefs.current[chest.id]}
              modelPath={chest.modelPath}
              position={chest.position}
              rotation={chest.rotation}
              playerRef={playerRef}
              // isOpen={chestStates[chest.id]} // 状態を渡す
            />
            <CuboidCollider
              args={chest.colliderArgs} // JSON データからコライダーの大きさを取得
              position={chest.colliderPosition}
              friction={1}
            />
            {/* <Html>
            <button
              onClick={() => {
                chestRefs.current[chest.id].current.openTreasure();
              }}
            >
              Open {chest.id}
            </button>
            </Html> */}
          </RigidBody>
        );
      })}
    </>
  );
};

export default ChestGroup;
