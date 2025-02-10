import React, { useRef, useEffect, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { Sky } from "three/examples/jsm/objects/Sky";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

extend({ Sky });

const SkyComponentv2 = () => {
  const skyRef = useRef();
  const sun = useRef(new THREE.Vector3());
  const moon = useRef(new THREE.Vector3());
  const { scene, gl } = useThree();

  // 🌞 太陽 & 🌙 月 のライト
  const sunLightRef = useRef();
  const moonLightRef = useRef();
  const ambientLightRef = useRef();

  const [time, setTime] = useState(0);
  useFrame(({ clock }) => {
    const newTime = (clock.getElapsedTime() % 240) / 240; // 30秒で1日サイクル
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
        if (!guiRef.current) {
            const gui = new GUI();
            guiRef.current = gui;

            const folderSky = gui.addFolder("Sky");
            folderSky.add(skyParams, "turbidity", 0, 20, 0.1).onChange((value) => {
                skyParams.turbidity = value;
            });
            folderSky.add(skyParams, "rayleigh", 0, 4, 0.001).onChange((value) => {
                skyParams.rayleigh = value;
            });
            folderSky.add(skyParams, "mieCoefficient", 0, 0.1, 0.001).onChange((value) => {
                skyParams.mieCoefficient = value;
            });
            folderSky.add(skyParams, "mieDirectionalG", 0, 1, 0.001).onChange((value) => {
                skyParams.mieDirectionalG = value;
            });
            folderSky.add(skyParams, "elevation", 0, 90, 0.1).onChange((value) => {
                skyParams.elevation = value;
            });
            folderSky.add(skyParams, "azimuth", -180, 180, 0.1).onChange((value) => {
                skyParams.azimuth = value;
            });
            folderSky.add(skyParams, "exposure", 0, 1, 0.0001).onChange((value) => {
                skyParams.exposure = value;
            });

            folderSky.open();
        }

        return () => {
            guiRef.current?.destroy();
            guiRef.current = null;
        };
    }, []);
    
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

export default SkyComponentv2;
