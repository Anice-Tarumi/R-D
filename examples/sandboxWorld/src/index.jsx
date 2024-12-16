import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx'; // ゲームの3Dシーン
import { KeyboardControls } from '@react-three/drei';
import GameStateManager from './GameStateManager'; // 状態管理コンポーネント
import { useRef, useState } from 'react';

const App = () => {

  // ゲーム開始時の処理
  const handleStart = () => {
    console.log("Game Started");
  };
  const canvasRef = useRef()
  return (
    <>
      {/* ゲーム状態管理 */}
      <GameStateManager
        onStart={handleStart} // ゲーム開始時の処理
      />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <Canvas
        ref={canvasRef}
          shadows
          style={{
            touchAction: "none",
          }}
          camera={{
            fov: 45,
            near: 0.1,
            far: 200,
            position: [3, 3, 3],
          }}
        >
          <Experience canvasRef={canvasRef} />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
