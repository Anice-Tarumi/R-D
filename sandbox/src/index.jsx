import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx' // ゲームの3Dシーン
import { CameraControls, KeyboardControls, OrbitControls } from '@react-three/drei'
import GameStateManager from './manager/GameStateManager.jsx' // 状態管理コンポーネント
import { useRef, useState } from 'react'
import React from 'react'
import InteractionUI from './ui/InteractionUI.jsx'
import MenuScreen from './ui/MenuScreen.jsx'
import useGame from './manager/useGame.jsx'
import TitleScene from './TitleScene.jsx'
import MiniMap from './ui/MiniMap.jsx'

const App = () => {
  const canvasRef = useRef()
  const phase = useGame((state) => state.phase);
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
          { name: "run", keys: ["Shift"]},
          { name: "jump", keys: ["Space"]}
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
          far: 1000,
          position: [0, 0, -20],
          rotation: [0,Math.PI,0]
        }}
      >
      {phase === "title"  && <CameraControls makeDefault minAzimuthAngle={-Math.PI / 6 + Math.PI} maxAzimuthAngle={Math.PI / 6 + Math.PI} minPolarAngle={1} maxPolarAngle={Math.PI / 2} />}
      {(phase === "title" || phase === "transition") && <TitleScene />}
      {/* <CameraControls makeDefault minAzimuthAngle={-Math.PI / 6 + Math.PI} maxAzimuthAngle={Math.PI / 6 + Math.PI} minPolarAngle={1} maxPolarAngle={Math.PI / 2} /> */}
      <TitleScene/>
      {(phase !== "loading" && phase !== "title" && phase !=="transition")&& <Experience canvasRef={canvasRef}/>}
      {/* {phase === "playing" && <MiniMap />} */}
      </Canvas>
      </KeyboardControls>
      <InteractionUI />
      <MenuScreen />
      <MiniMap mapImage="./images/map.png"/>
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
