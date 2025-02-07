import { useState, useEffect } from "react";
import useGame from "./useGame"; // 🔥 Zustand で状態管理

const usePlayerPosition = () => {
  const [playerX, setPlayerX] = useState(50);
  const [playerY, setPlayerY] = useState(50);
  const [playerRotation, setPlayerRotation] = useState(0);
  const playerRef = useGame((state) => state.playerRef);

  useEffect(() => {
    if (!playerRef?.current) return;

    const updatePosition = () => {
      const { x, z } = playerRef.current.position;
      setPlayerX((x / 100) * 100);
      setPlayerY((z / 100) * 100);
      setPlayerRotation(playerRef.current.rotation.y * (180 / Math.PI));
    };

    const interval = setInterval(updatePosition, 100); // 0.1秒ごとに更新
    return () => clearInterval(interval);
  }, [playerRef]);

  return { playerX, playerY, playerRotation };
};

export default usePlayerPosition;
