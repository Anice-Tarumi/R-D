import React, { forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import chestData from "./chestData.json"; // 宝箱データを読み込む
import { CuboidCollider, RigidBody } from "@react-three/rapier";

const ChestController = forwardRef(({ playerRef }, ref) => {
  return (
    <>
      {Object.values(chestData).map((chest) => (
        <group
          key={chest.id}
          ref={ref}
          position={chest.position}
          rotation={chest.rotation}
          scale={chest.scale}
        >
          {/* 宝箱のモデルを読み込み */}
          <ChestModel modelPath={chest.modelPath} />
        </group>
      ))}
    </>
  );
});

// 宝箱モデルの描画用コンポーネント
const ChestModel = ({ modelPath }) => {
  const { nodes, materials } = useGLTF(modelPath);
    // console.log("nodes",nodes.Root_Scene)
  return (
    <RigidBody type='kinematicPosition' colliders={false} >
        <primitive object={nodes.Root_Scene} />
        <CuboidCollider args={[1, 1]} position={[0,5,0]}/>
    </RigidBody>
  );
};

// モデルのプリロード
Object.values(chestData).forEach((chest) => {
  useGLTF.preload(chest.modelPath);
});

export default ChestController;
