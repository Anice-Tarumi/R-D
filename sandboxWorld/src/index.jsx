import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx'; // ゲームの3Dシーン
import { KeyboardControls } from '@react-three/drei';
import GameStateManager from './GameStateManager'; // 状態管理コンポーネント
import { useRef, useState } from 'react';
import DialogButton from './DialogButton.jsx';
import DialogueUI from './DialogueUI.jsx';
import ChestOpenButton from './ChestOpenButton.jsx';
import React from 'react';


const App = () => {
  const canvasRef = useRef()
  const chestRefs = useRef({
    chest1: React.createRef(),
    chest2: React.createRef(),
    chest3: React.createRef(),
  });

  return (
    <>
      {/* ゲーム状態管理 */}
      <GameStateManager/>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "run", keys: ["Shift"]}
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
            position: [0, 0, 0],
          }}
        >
          <Experience canvasRef={canvasRef} />
        </Canvas>
      </KeyboardControls>
      <DialogButton  />
      <ChestOpenButton chestRefs={chestRefs} chestId="chest1" />
      <ChestOpenButton chestRefs={chestRefs} chestId="chest2" />
      <ChestOpenButton chestRefs={chestRefs} chestId="chest3" />
      <DialogueUI />
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
