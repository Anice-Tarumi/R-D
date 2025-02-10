import React, { useRef, useMemo } from "react";
import { Sky, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SimpleCloud = () => {
  const { scene } = useGLTF("./model/Clouds.glb");
  const cloudRefs = useRef([]);

  // 🔹 複数の雲をランダムに配置
  // const cloudPositions = useMemo(() => {
  //   return Array.from({ length: 5 }).map(() => ({
  //     position: [
  //       // (Math.random() - 0.5) * 400, // X位置
  //       // Math.random() * 30 + 50, // Y位置（高さ）
  //       // (Math.random() - 0.5) * 400, // Z位置
  //       0,0,0
  //     ],
  //     scale: Math.random() * 5 + 5, // サイズ
  //   }));
  // }, []);

  // useFrame(({ clock }) => {
    // console.count("useFrame (SimpleCloud)");
    // cloudRefs.current.forEach((cloud, index) => {
    //   if (cloud) {
    //     cloud.position.y += Math.sin(clock.getElapsedTime() * 0.1 + index) * 0.02; // ゆっくり上下
    //     // cloud.rotation.y += 0.0005; // ゆっくり回転
    //   }
    // });
  // });

  return (
    // <group>
    //   {cloudPositions.map((data, i) => (
    //     <group key={i} ref={(el) => (cloudRefs.current[i] = el)} position={data.position} scale={data.scale}>
    //       <primitive object={scene.clone()} />
    //     </group>
    //   ))}
    // </group>
  <>
  <Sky
        distance={450000}
        sunPosition={[5, 1, 0]}
        inclination={0}
        azimuth={0.25}
      />
  {/* 前 */}
  <group position={[0,20,100]} scale={20}>
  <primitive object={scene.clone()} />
  </group>
  {/* 後ろ */}
  <group position={[0,20,-100]} scale={20}>
  <primitive object={scene.clone()} />
  </group>
  {/* 左 */}
  <group position={[100,20,0]} scale={20} rotation={[0,Math.PI/2,0]}>
  <primitive object={scene.clone()} />
  </group>
  {/* 右 */}
  <group position={[-100,20,0]} scale={20} rotation={[0,Math.PI/2,0]}>
  <primitive object={scene.clone()} />
  </group>
  {/* 斜め */}
  <group position={[-100,20,100]} scale={20} rotation={[0,-Math.PI/4,0]}>
  <primitive object={scene.clone()} />
  </group>
  <group position={[100,20,100]} scale={20} rotation={[0,Math.PI/4,0]}>
  <primitive object={scene.clone()} />
  </group>
  <group position={[-100,20,-100]} scale={20} rotation={[0,Math.PI/4,0]}>
  <primitive object={scene.clone()} />
  </group>
  <group position={[100,20,-100]} scale={20} rotation={[0,-Math.PI/4,0]}>
  <primitive object={scene.clone()} />
  </group>
  
  
  
  
  </>
    
  );
};

export default SimpleCloud;
