import React, { useState, useEffect } from "react";
import { Cloud, Sky } from "@react-three/drei";

const Sun = () => {
  const [time, setTime] = useState(12); // ☀️ 正午（快晴）

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => (prev + 0.1) % 24); // 時間を進める
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // ☀️ 太陽の位置を時間に応じて変化
  const sunX = Math.sin((time / 24) * Math.PI * 2) * 100;
  const sunY = Math.cos((time / 24) * Math.PI * 2) * 50 + 50; // 🔥 Y軸を高めにする
  const sunZ = Math.sin((time / 24) * Math.PI * 2) * 100;

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[sunX, sunY, sunZ]} // ☀️ 太陽の位置を調整
        inclination={0} // ☀️ 青空を強調
        azimuth={0.25}
        mieCoefficient={0.001} // ☁️ 霞みを抑える
        mieDirectionalG={0.7}
        rayleigh={5} // 🔥 快晴の青空
      />
      <Cloud opacity={0.5} position={[0, 50, 0]} />
      <Cloud opacity={0.4} position={[30, 55, -40]} />
      <Cloud opacity={0.3} position={[-20, 60, 20]} />
    </>
  );
};

export default Sun;
