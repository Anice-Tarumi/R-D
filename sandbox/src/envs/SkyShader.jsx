import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function SkyShader() {
  const materialRef = useRef();
  const lightRef = useRef();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    console.log("time", time);
    const sunAngle = time * 0.01; // フレームレート依存しない時間の進行
    const radius = 30;
    const sunHeight = Math.sin(sunAngle) * 30;
    const sunIntensity = Math.max(0.2, Math.sin(sunAngle));

    // ☀️ 太陽（DirectionalLight）の移動
    lightRef.current.position.set(
      Math.cos(sunAngle) * radius,
      sunHeight,
      Math.sin(sunAngle) * radius
    );
    lightRef.current.target.position.set(0, 0, 0);
    lightRef.current.target.updateMatrixWorld();

    // ☀️ 太陽の色と明るさを変更
    lightRef.current.intensity = sunIntensity * 2;
    lightRef.current.color.setHSL(0.1, 0.8, sunIntensity);

    // 🟡 シェーダーの時間を更新
    materialRef.current.uniforms.uTime.value = time;
  });

  return (
    <>
      {/* 🌌 空 (GLSL シェーダー) */}
      <mesh>
        <sphereGeometry args={[100, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={{
            uTime: { value: 0 },
            uColorDay: { value: new THREE.Color(0.5, 0.7, 1) }, // 昼の空色
            uColorNight: { value: new THREE.Color(0.02, 0.02, 0.1) }, // 夜の空色
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ☀️ 太陽（DirectionalLight） */}
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
    </>
  );
}

// 🎭 頂点シェーダー
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// 🎨 フラグメントシェーダー (昼夜の色変化)
const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorDay;
  uniform vec3 uColorNight;
  varying vec2 vUv;

  void main() {
    float mixFactor = pow(sin(uTime * 0.1) * 0.5 + 0.5, 1.5); // 🌞 ガンマ補正で自然な変化
    vec3 color = mix(uColorNight, uColorDay, mixFactor);
    color = pow(color, vec3(0.8)); // ☀️ 昼の明るさを調整
    gl_FragColor = vec4(color, 1.0);
  }
`;
