import React, { useRef, useEffect, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import * as THREE from "three";
import { Sky } from "three/examples/jsm/objects/Sky";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

extend({ Sky });

const SkyComponent = () => {
  const skyRef = useRef();
  const starsRef = useRef();
  const sun = useRef(new THREE.Vector3());
  const moon = useRef(new THREE.Vector3());
  const { scene, gl } = useThree();

  // 🌞 太陽 & 🌙 月 のライト
  const sunLightRef = useRef();
  const moonLightRef = useRef();
  const ambientLightRef = useRef();

  const [time, setTime] = useState(0);
  useFrame(({ clock }) => {
    // const newTime = (clock.getElapsedTime() % 240) / 240; // 30秒で1日サイクル
    const newTime = (clock.getElapsedTime() % 20) / 20; 
    setTime(newTime);
  });

  // 🌅 デバッグ用GUI（パラメータ調整）
  const { turbidity, rayleigh, mieCoefficient, mieDirectionalG, azimuth, exposure } = useControls({
    turbidity: { value: 10, min: 0, max: 20, step: 0.1 },
    rayleigh: { value: 3, min: 0, max: 4, step: 0.001 },
    mieCoefficient: { value: 0.005, min: 0, max: 0.1, step: 0.001 },
    mieDirectionalG: { value: 0.7, min: 0, max: 1, step: 0.001 },
    azimuth: { value: 180, min: -180, max: 180, step: 0.1 },
    exposure: { value: 0.5, min: 0, max: 1, step: 0.0001 },
  });

  useEffect(() => {
    if (!skyRef.current) return;

    const sky = skyRef.current;
    sky.scale.setScalar(450000);
    scene.add(sky);

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    const starVertices = [];

    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    starsRef.current = stars;
    scene.add(stars);

    return () => {
      scene.remove(stars);
    };
  }, [scene]);

  useEffect(() => {
    if (!skyRef.current) return;

    const sky = skyRef.current;
    sky.scale.setScalar(450000);
    scene.add(sky);

    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = turbidity;
    uniforms["rayleigh"].value = rayleigh;
    uniforms["mieCoefficient"].value = mieCoefficient;
    uniforms["mieDirectionalG"].value = mieDirectionalG;

    // 🌞 太陽の位置を更新（360°回転するように）
    const angle = time * Math.PI * 2; // 0 ~ 360°
    const radius = 50; // 軌道の半径
    sun.current.set(
      Math.cos(angle) * radius, // X座標
      Math.sin(angle) * radius, // Y座標（高さ）
      0 // Z座標
    );

    uniforms["sunPosition"].value.copy(sun.current);

    // 🌙 月の位置（太陽と180°反対側）
    moon.current.set(
      Math.cos(angle + Math.PI) * radius, // X座標
      Math.sin(angle + Math.PI) * radius, // Y座標（高さ）
      0 // Z座標
    );

    // 🌅 昼夜の明るさ調整
    gl.toneMappingExposure = exposure * Math.max(0.6, Math.sin(angle) * 1.5);
  }, [time, turbidity, rayleigh, mieCoefficient, mieDirectionalG, azimuth, exposure]);

  // 🌅 昼から夜の色変化をスムーズに補間
  useFrame(() => {
    if (ambientLightRef.current) {
      const t = (Math.sin(time * Math.PI * 2) + 1) / 2; // 0.0 (夜) ～ 1.0 (昼)

      // 🌅 夕焼けオレンジ → 夜の青白い光へスムーズに補間
      const dayColor = new THREE.Color(1, 1, 1); // 白 (昼)
      const sunsetColor = new THREE.Color(1, 0.6, 0.3); // 夕焼けオレンジ
      const nightColor = new THREE.Color(0.5, 0.7, 1); // 夜の青白

      const interpolatedColor = new THREE.Color();
      interpolatedColor.lerpColors(
        t > 0.5 ? sunsetColor : nightColor,
        t > 0.5 ? dayColor : sunsetColor,
        t > 0.5 ? (t - 0.5) * 2 : t * 2
      );

      ambientLightRef.current.color.copy(interpolatedColor);
      ambientLightRef.current.intensity = 1.5 + (1 - t) * 1.2;
    }

    if (sunLightRef.current) {
      sunLightRef.current.position.copy(sun.current);
      sunLightRef.current.intensity = Math.max(0.5, Math.sin(time * Math.PI * 2) ** 2 * 5);
      sunLightRef.current.target.position.set(0, 5, 0);
      sunLightRef.current.target.updateMatrixWorld();
    }

    if (moonLightRef.current) {
      moonLightRef.current.position.copy(moon.current);
      moonLightRef.current.intensity = Math.max(1.0, Math.cos(time * Math.PI * 2) ** 2 * 5);
      moonLightRef.current.target.position.set(0, 5, 0);
      moonLightRef.current.target.updateMatrixWorld();

      starsRef.current.visible = time < 0.5 ? false : true;
    }
  });

  return (
    <>
      <sky ref={skyRef} />
      <directionalLight
        ref={sunLightRef}
        castShadow
        intensity={5}
        color={"white"}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.1}
        shadow-camera-far={300}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={-100}
      />
      {/* <Leva/> */}
      <directionalLight
        ref={moonLightRef}
        castShadow
        intensity={5}
        color={"#aabbff"}
        shadow-mapSize={[4096, 4096]}
        shadow-camera-near={0.1}
        shadow-camera-far={300}
        shadow-camera-top={100}
        shadow-camera-right={100}
        shadow-camera-bottom={-100}
        shadow-camera-left={-100}
      />
      <ambientLight ref={ambientLightRef} intensity={1.5} />
    </>
  );
};

export default SkyComponent;
