import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { CameraControls, KeyboardControls, OrbitControls } from '@react-three/drei'
import GameStateManager from './manager/GameStateManager.jsx'
import { useRef, useState } from 'react'
import React from 'react'
import InteractionUI from './ui/InteractionUI.jsx'
import MenuScreen from './ui/MenuScreen.jsx'
import useGame from './manager/useGame.jsx'
import MiniMap from './ui/MiniMap.jsx'
import { Leva } from 'leva'
// import StartEarth from './StartEarth.jsx'
// import { Joystick } from 'react-joystick-component'
import useDeviceStore from './manager/useDeviceStore.jsx'
import useJoystickStore from './manager/useJoystickStore.jsx'
// import { Perf } from 'r3f-perf'
import useAudioStore from './manager/useAudioStore.jsx'
import TitleScreen from './ui/TitleScreen.jsx'
import Loader from './ui/Loader.jsx'


const App = () => {
  const canvasRef = useRef()
  const phase = useGame((state) => state.phase);
  const {isMobile} = useDeviceStore();
  const { isActive, setIsActive, startPosition, setPosition, setStartPosition, resetJoystick } = useJoystickStore();
  const isfirstTouch = useRef(false);
  const playBGM = useAudioStore((state) => state.playBGM);
  const handleTouchStart = (e) => {
    if(!isfirstTouch.current) {
      playBGM();
      isfirstTouch.current = true;
    }
    if (!isMobile) return;
    const touch = e.touches[0];
  
    setStartPosition(touch.clientX, touch.clientY);
    setIsActive(true); 
  };
  
  const handleTouchEnd = () => {
    resetJoystick(); 
  };

  const handleMove = (event) => {
    setPosition(event.x, event.y);
  };
  return (
    <>
    
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
          far: 2000,
          position: [0, 3, -10],
          rotation: [0,Math.PI,0]
        }}
        onTouchStart={handleTouchStart} 
        onClick={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        gl={{stencil: true}}
      >
        {(phase === "title" || phase === "loading") && <TitleScreen />}
        {/* <OrbitControls /> */}
      <Experience canvasRef={canvasRef}/>
      {/* {(phase === "loading" || phase === "title" || phase === "transition") && <StartEarth/> } */}
      {/* <Perf position={"top-left"}/> */}
      {/* {phase === "playing" && <FlockingBird />} */}
      </Canvas>
      </KeyboardControls>
      <InteractionUI />
      <MenuScreen />
      <Leva hidden/>
      <MiniMap mapImage="./images/map.jpg"/>
      {/* {isMobile && isActive && phase === "playing" && (
      <div 
        className={`joystick-container ${isActive ? "active" : ""}`}  
        style={{ top: `${startPosition.y}px`, left: `${startPosition.x}px`,backdropFilter: "blur(10px)", borderRadius: "100px" }}
      >
        <Joystick 
          size={84} 
          stickSize={50}
          baseColor={"rgba(255, 255, 255, 0.4)"}
          stickColor={"#FFFBF6"}
          followCursor={true} 
          minDistance={20}
          move={handleMove}
        />
      </div>
    )} */}
{/* <Leva/> */}
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(<App />)
