import React from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { Cloud } from "@react-three/drei";

const SimpleSky = () => {
  const { scene } = useThree();

  return (
    <>
    <mesh scale={500} rotation={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={"#87CEEB"} // 🔥 スカイブルー
        side={THREE.BackSide} // 🔥 内側を描画
      />
    </mesh>
    <Cloud opacity={1} position={[0, 0, 100]} />
    </>
    
  );
};

export default SimpleSky;
