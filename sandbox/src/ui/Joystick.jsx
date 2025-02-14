import { useRef } from "react"
import useJoystickStore from "../manager/useJoystickStore"
import { Html } from "@react-three/drei"

const Joystick = () => {
  const { setStartPosition, setPosition, resetJoystick, position, startPosition, isActive } = useJoystickStore()
  const joystickRef = useRef(null)

  const handleStart = (e) => {
    const touch = e.touches ? e.touches[0] : e
    console.log("start",touch.clientX, touch.clientY)
    setStartPosition(touch.clientX, touch.clientY)
    setPosition(touch.clientX, touch.clientY)
  }

  const handleMove = (e) => {
    if (!isActive) return
    const touch = e.touches ? e.touches[0] : e
    console.log("move",touch.clientX, touch.clientY)
    setPosition(touch.clientX, touch.clientY)
  }

  const handleEnd = () => {
    console.log("end")
    resetJoystick()
  }

  return (
    <Html position={[0,0,0]} center style={{transform: "none"}}>
    <div
      className="joystick-container"
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      style={{  left: startPosition.x, top: startPosition.y }}
    >
       <div className="joystick" 
            style={{ 
            transform: `translate(${position.x - startPosition.x}px, ${position.y - startPosition.y}px)` }} />
    </div>
    </Html>
  )
}

export default Joystick
