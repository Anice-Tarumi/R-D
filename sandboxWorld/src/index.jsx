import './style.css';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.jsx'; // ゲームの3Dシーン
import { KeyboardControls } from '@react-three/drei';
import GameStateManager from './GameStateManager'; // 状態管理コンポーネント
import { useRef, useState } from 'react';
import DialogButton from './DialogButton.jsx';
import DialogueUI from './DialogueUI.jsx';
// import ChestOpenButton from './ChestOpenButton.jsx';
import React from 'react';


const App = () => {
  const canvasRef = useRef()
  const [showChestButton, setShowChestButton] = useState(false);
  const [triggerOpenChest, setTriggerOpenChest] = useState(null);

  // 宝箱近接状態のハンドラー
  const handleChestProximity = (isNearby, openChestCallback) => {
    setShowChestButton(isNearby);
    setTriggerOpenChest(() => openChestCallback); // ボタンのクリック時に実行される関数を保存
  };

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
          <Experience canvasRef={canvasRef} onChestProximity={handleChestProximity}/>
        </Canvas>
      </KeyboardControls>
      <DialogButton  />
      {/* <ChestOpenButton chestRefs={chestRefs} chestId="chest1" />
      <ChestOpenButton chestRefs={chestRefs} chestId="chest2" />
      <ChestOpenButton chestRefs={chestRefs} chestId="chest3" /> */}
      <DialogueUI />
      {/* ボタンをCanvas外に配置 */}
      {showChestButton && (
        <button
          className="chest-open-button"
          onClick={() => triggerOpenChest && triggerOpenChest()}
        >
          Open Chest
        </button>
      )}
    </>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
