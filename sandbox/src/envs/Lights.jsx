import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Environment, useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

export default function Lights() {
    const lightRef = useRef();
    useHelper(lightRef, DirectionalLightHelper, 5, 'red'); // 🔹 影の範囲を可視化
    return <>
<directionalLight
ref={lightRef}
    castShadow
    position={[30, 30, 0]}
    intensity={4.5}
    shadow-mapSize={[4096, 4096]}
    shadow-camera-near={0.1}
    shadow-camera-far={100}
    shadow-camera-top={100}
    shadow-camera-right={100}
    shadow-camera-bottom={-100}
    shadow-camera-left={-100}
/>
        <ambientLight intensity={1.5} />
        
        {/* 🔥 追加: 環境光を適用 */}
        {/* <Environment preset="city" /> */}
    </>
}
