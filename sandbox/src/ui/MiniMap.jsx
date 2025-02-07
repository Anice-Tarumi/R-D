import React, { useState, useRef, useEffect } from "react";
import useGame from "../manager/useGame";
import usePlayerStore from "../manager/usePlayerStore";
import gsap from "gsap";
import * as THREE from "three";

const MiniMap = ({ mapImage, mapWidth = 1254, mapHeight = 912}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(null);
  const phase = useGame((state) => state.phase);
  const playerRef = usePlayerStore((state) => state.playerRef);

  if (phase !== "playing") return null;

  const teleportPoints = [
    { id: "top", x: 0.5, y: 0.1, worldPos: { x: 0, y: 2, z: -70 } },
    { id: "bottom", x: 0.5, y: 0.9, worldPos: { x: 0, y: 2, z: 60 } },
    { id: "left", x: 0.1, y: 0.435, worldPos: { x: -50, y: 2, z: -13 } },
    { id: "right", x: 0.9, y: 0.435, worldPos: { x: 50, y: 2, z: -13 } },
    { id: "center", x: 0.5, y: 0.435, worldPos: { x: 0, y: 2, z: -13 } }
  ];
//2/5
const handleTeleport = (point) => {
  if (!playerRef.current) return;

  // 🔹 現在のプレイヤー位置を取得
  const playerPosition = new THREE.Vector3();
  playerRef.current.getWorldPosition(playerPosition);
  console.log("playerPosition", playerRef.current.object.setTranslation);

  // 🔹 RigidBody かどうか確認
  if (playerRef.current.object.setTranslation) {
    console.log("RigidBody の setTranslation を使用");

    // 🔹 物理エンジンの位置を変更
    playerRef.current.object.setTranslation({ x: point.worldPos.x, y: point.worldPos.y, z: point.worldPos.z }, true);
  } else {
    console.warn("playerRef に RigidBody が見つかりませんでした。Object3D を移動します。");

    // 🔹 Three.js の Object3D で位置を変更（物理無視）
    gsap.to(playerRef.current.position, {
      x: point.worldPos.x,
      y: point.worldPos.y,
      z: point.worldPos.z,
      duration: 1.5,
      ease: "power2.out",
    });
  }
};


  const [frameSize, setFrameSize] = useState(500);

useEffect(() => {
  const updateSize = () => {
    const width = window.innerWidth;
    if (width <= 480) setFrameSize(300); // 小さい画面（スマホ）
    else if (width <= 768) setFrameSize(500); // タブレット
    else setFrameSize(600); // PC
  };

  window.addEventListener("resize", updateSize);
  updateSize(); // 初回実行

  return () => window.removeEventListener("resize", updateSize);
}, []);

const handleTouchStart = (e) => {
    if (!isExpanded) return;
    isDragging.current = true;
    const touch = e.touches[0];
    dragStart.current = { x: touch.clientX - mapOffset.x, y: touch.clientY - mapOffset.y };
    velocity.current = { x: 0, y: 0 };
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const newX = touch.clientX - dragStart.current.x;
    const newY = touch.clientY - dragStart.current.y;
    velocity.current = { x: newX - mapOffset.x, y: newY - mapOffset.y };
  
    const offsetLimitX = (mapWidth - frameSize) / 2;
    const offsetLimitY = (mapHeight - frameSize) / 2;
  
    setMapOffset({
      x: Math.min(offsetLimitX, Math.max(-offsetLimitX, newX)),
      y: Math.min(offsetLimitY, Math.max(-offsetLimitY, newY)),
    });
  };
  

  const toggleMap = () => {
    setIsExpanded(!isExpanded);
    setMapOffset({ x: 0, y: 0 }); // マップ位置をリセット
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--frame-size", `${frameSize}px`);
    document.documentElement.style.setProperty("--map-width", `${mapWidth}px`);
    document.documentElement.style.setProperty("--map-height", `${mapHeight}px`);
  }, [frameSize, mapWidth, mapHeight]);

  const handleMouseDown = (e) => {
    if (!isExpanded) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - mapOffset.x, y: e.clientY - mapOffset.y };
    velocity.current = { x: 0, y: 0 };
    cancelAnimationFrame(animationFrameRef.current);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;

    velocity.current = { x: newX - mapOffset.x, y: newY - mapOffset.y };

    // 🌟 **スクロール範囲を正しく制限**
    const maxOffsetX = (mapWidth - frameSize) / 2;
    const maxOffsetY = (mapHeight - frameSize) / 2;

    setMapOffset({
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, newX)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, newY)),
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    applyDamping();
  };

  const applyDamping = () => {
    animationFrameRef.current = requestAnimationFrame(() => {
      velocity.current.x *= 0.9;
      velocity.current.y *= 0.9;

      if (Math.abs(velocity.current.x) < 0.1) velocity.current.x = 0;
      if (Math.abs(velocity.current.y) < 0.1) velocity.current.y = 0;

      const maxOffsetX = (mapWidth - frameSize) / 2;
      const maxOffsetY = (mapHeight - frameSize) / 2;

      setMapOffset((prev) => ({
        x: Math.max(-maxOffsetX, Math.min(maxOffsetX, prev.x + velocity.current.x)),
        y: Math.max(-maxOffsetY, Math.min(maxOffsetY, prev.y + velocity.current.y)),
      }));

      if (velocity.current.x !== 0 || velocity.current.y !== 0) {
        applyDamping();
      }
    });
  };

  return (
    <>
  <div className="minimap-wrapper">
    <div
      className="minimap-container"
      style={{
        backgroundImage: `url(${mapImage})`,
        backgroundSize: `${mapWidth}px ${mapHeight}px`,
        transform: `translate(${mapOffset.x}px, ${mapOffset.y}px)`,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* 🔹 ここにポイントを配置 */}
      {teleportPoints.map((point) => (
        <div
          key={point.id}
          className="teleport-point"
          style={{
            left: `${point.x * 100}%`,
            top: `${point.y * 100}%`
          }}
          onClick={() => handleTeleport(point)}
        />
      ))}
    </div>
    <button className="minimap-close" onClick={toggleMap}>X</button>
  </div>

    </>
  );
};

export default MiniMap;
