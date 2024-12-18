import { useEffect, useRef } from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { ChestTest } from "./chesttest";
import React from "react";

const chestData = [
  {
    id: "chest1",
    modelPath: "./chests/Chest.glb",
    position: [0, 0, 0],
    rotation: [0,Math.PI,0],
    colliderArgs: [1, 1, 1], // コライダーの大きさ
    colliderPosition: [4 ,2,10],
  },
  {
    id: "chest2",
    modelPath: "./chests/Chest.glb",
    position: [-3, -1, 10],
    rotation: [0,Math.PI,0],
    colliderArgs: [1.2, 1.2, 1.2], // コライダーの大きさ
    colliderPosition: [-3 ,0,10],
  },
  {
    id: "chest3",
    modelPath: "./chests/Chest.glb",
    position: [-0, -1, 10],
    rotation: [0,Math.PI,0],
    colliderArgs: [1.2, 1.2, 1.2], // コライダーの大きさ
    colliderPosition: [-2 ,0,10],
  }
];

const ChestGroup = ({ playerRef }) => {
  const chestRefs = useRef({}); // チェストの参照を格納するオブジェクト

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
            />
            <CuboidCollider
              args={chest.colliderArgs} // JSON データからコライダーの大きさを取得
              position={chest.colliderPosition}
              friction={1}
            />
          </RigidBody>
        );
      })}
    </>
  );
};

export default ChestGroup;
