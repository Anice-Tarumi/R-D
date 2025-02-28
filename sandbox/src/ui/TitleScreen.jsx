import { useState } from "react";
import { Html, Mask, PivotControls, useMask } from "@react-three/drei";
import useGame from "../manager/useGame";
import * as THREE from "three";
import { Leva, useControls } from "leva";

export default function TitleScreen() {
  const startGame = useGame((state) => state.start);
  const [radius, setRadius] = useState(0);
  const [isExpanding, setIsExpanding] = useState(false);
  const phase = useGame((state) => state.phase);
  
  

const { invert } = useControls({ invert: true })
const stencil = useMask(1, true); 
  const Frame = (props) => (
    <mesh {...props}>
      <ringGeometry args={[radius, radius+0.1, 64]} />
      <meshPhongMaterial color="white" />
    </mesh>
  )

  // ボタンを押したら円を広げる
  const expandCircle = () => {
    setIsExpanding(true);
    let startTime = performance.now();
    let duration = 1000; 

    const animate = (time) => {
      let elapsed = time - startTime;
      let progress = Math.min(elapsed / duration, 1);
      setRadius(0.5 + progress * 10); 

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        startGame();
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <>
    
      {/* Stencil Mask の適用 */}
      {/* <PivotControls offset={[0, 0, -3]} disableRotations>
        <Frame position={[0, 0, -3]} rotation={[0, Math.PI, 0]}> */}
      <Mask id={1} position={[0, 1, -5]} rotation={[0, Math.PI, 0]}>
      {/* <mesh rotation={[0, Math.PI, 0]}> */}
        <circleGeometry args={[radius, 64]} />
        {/* <meshBasicMaterial color="red" /> */}
        {/* </mesh> */}
      </Mask>
      {/* </Frame>
        </PivotControls> */}
      {/* 黒い Plane に Stencil Mask を適用 */}
      <mesh position={[0, 2, -8]} rotation={[0, 0, 0]} >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial 
        side={THREE.DoubleSide}
        color="#000000"
        {...stencil} 
        />
      </mesh>
      {phase === "title" && !isExpanding &&
        <Html position={[0, 1.8, -7.9]} center>
          <button
            onClick={expandCircle}
            style={{
              padding: "10px 20px",
              fontSize: "40px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Start
          </button>
        </Html>
      }
      
    </>
  );
}
