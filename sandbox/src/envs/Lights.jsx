import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Environment } from "@react-three/drei"; // 🔹 環境光を追加！

export default function Lights() {
    return <>
        <directionalLight
            castShadow
            position={[5, 10, 10]}
            intensity={4.5}
            shadow-mapSize={[2048, 2048]}
            shadow-camera-near={0.1}
            shadow-camera-far={50}
            shadow-camera-top={50}
            shadow-camera-right={50}
            shadow-camera-bottom={-50}
            shadow-camera-left={-50}
        />
        <ambientLight intensity={1.5} />
        
        {/* 🔥 追加: 環境光を適用 */}
        <Environment preset="city" />
    </>
}
