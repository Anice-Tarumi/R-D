import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { CapsuleCollider, RigidBody,BallCollider, useRapier } from "@react-three/rapier"
import Chara from "./Chara.jsx"
import { useFrame } from "@react-three/fiber"
import { Vector3, MathUtils, Quaternion } from "three"
import { Leva, useControls } from "leva"
import { useKeyboardControls } from "@react-three/drei"
import { degToRad } from "three/src/math/MathUtils.js"
import useGame from "../manager/useGame.jsx"
import useInteractionStore from "../manager/useInteractionStore.jsx"
import ClothChangeUI from "../ui/ClothChangeUI.jsx"
import { Purete1 } from "./Purete1.jsx"

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI
  while (angle < -Math.PI) angle += 2 * Math.PI
  return angle
}

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start)
  end = normalizeAngle(end)

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI
    } else {
      end += 2 * Math.PI
    }
  }
  return MathUtils.lerp(start, end, t)
}

const CharacterController = forwardRef(({ canvasRef,npcRefs,portalRefs }, ref) => {
const WALK_SPEED = 3.0
const RUN_SPEED = 6.5
const ROTATION_SPEED = degToRad(2)
const initialCameraPosition = useRef(new Vector3())
const isTalking = useRef(false) // 会話中フラグ
const currentTarget = useInteractionStore((state) => state.currentTarget)
const phase = useGame((state) => state.phase)
const rb = useRef()
const container = useRef()
const character = useRef()
const [animation, setAnimation] = useState("idle")
const characterRotationTarget = useRef(0)
const rotationTarget = useRef(0)
const cameraTarget = useRef()
const cameraPosition = useRef()
const cameraWorldPosition = useRef(new Vector3())
const cameraLookAtWorldPosition = useRef(new Vector3())
const cameraLookAt = useRef(new Vector3())
const [, get] = useKeyboardControls()
const isClicking = useRef(false)
const initialRotation = useRef(new Quaternion())

useImperativeHandle(ref, () => ({
  getWorldPosition: (vector) => {
    if (rb.current) {
      const translation = rb.current.translation() // RigidBody の位置を取得
      vector.set(translation.x, translation.y, translation.z)
    }
  },
}))

  // const jump = () =>
  // {
  //   console.log('jump')
  //   rb.current.applyImpulse({ x: 0, y: 1, z: 0 })
  // }

useEffect(() => {
  const onMouseDown = (e) => {
    if (canvasRef.current && canvasRef.current.contains(e.target)) {
      isClicking.current = true
    }
  }
  const onMouseUp = (e) => {
    if (canvasRef.current && canvasRef.current.contains(e.target)) {
      isClicking.current = false
    }
  }

  document.addEventListener("mousedown", onMouseDown)
  document.addEventListener("mouseup", onMouseUp)
  document.addEventListener("touchstart", onMouseDown)
  document.addEventListener("touchend", onMouseUp)

  return () => {
    document.removeEventListener("mousedown", onMouseDown)
    document.removeEventListener("mouseup", onMouseUp)
    document.removeEventListener("touchstart", onMouseDown)
    document.removeEventListener("touchend", onMouseUp)
  }
}, [])

  // useFrame(() => {
  //   console.log("初期回転角度:", character.current.rotation.y) // 初期のrotation.yを表示
  // }, [])

  useEffect(() => {
    // if (phase === "changing") {
    //   // 着替えフェーズに入る時の回転保存
    //   if (character.current) {
    //     initialRotation.current.copy(character.current.quaternion) // 現在の回転を保存
    //   }
    // }

    if (phase === "playing") {
      // 着替えフェーズ終了時に回転を元に戻す
      if (character.current) {
        // character.current.quaternion.slerp(initialRotation.current, 0.2)
        character.current.quaternion.copy(initialRotation.current) // 初期回転に戻す
      }
    }
  }, [phase])

  useFrame(({ camera, mouse }) => {
  if (phase === "changing") {
    const playerPosition = new Vector3()
    if (rb.current) {
      const translation = rb.current.translation()
      playerPosition.set(translation.x, translation.y, translation.z)
    }
    character.current.lookAt(camera.position.x, playerPosition.y, camera.position.z)
    camera.fov = MathUtils.lerp(camera.fov, 20, 0.1)
    camera.updateProjectionMatrix()
    }
    if (phase === "talking" && currentTarget) {
      const npcRef = npcRefs.current[currentTarget.id]
      if(npcRef && npcRefs.current){
        const npcPosition = new Vector3()
        npcRef.current.getWorldPosition(npcPosition)
        const npcDirection = new Vector3(0, 0, 1.5)
        npcDirection.applyQuaternion(npcRef.current.quaternion)
        npcDirection.applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2)
        const cameraTargetPosition = npcPosition
          .clone()
          .add(npcDirection.multiplyScalar(-4))
          .add(new Vector3(0, 2, 0))
        camera.position.lerp(cameraTargetPosition, 0.1)
        camera.lookAt(npcPosition.clone().add(new Vector3(0, 3, 0)))
      }
    } else if (phase === "playing") {
      if (isTalking.current) {
        camera.position.lerp(initialCameraPosition.current, 0.1)
        isTalking.current = false
      }
      camera.fov = MathUtils.lerp(camera.fov, 45, 0.1) // fovを狭めることでズーム
      camera.updateProjectionMatrix()
      
    }

    if (phase !== "playing") return
    if (rb.current) {
      const vel = rb.current.linvel()
      const movement = {
        x: 0,
        z: 0,
      }

      if (get().forward) {
        movement.z = 1
      }
      if (get().backward) {
        movement.z = -1
      }
      
      let speed = get().run ? RUN_SPEED : WALK_SPEED
      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x
        }

        movement.z = mouse.y + 0.4
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED
        }
      }

      if (get().left) {
        movement.x = 1
      }

      if (get().right) {
        movement.x = -1
      }

      // if (get().jump) {
      //   jump()
      // }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z)
        vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed
        vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed
        setAnimation(speed === RUN_SPEED ? "run" : "walk")
      } else {
        setAnimation("idle")
      }
      character.current.rotation.y = lerpAngle(
        character.current.rotation.y,
        characterRotationTarget.current,
        0.1
      )
      rb.current.setLinvel(vel, true)
    }

    container.current.rotation.y = MathUtils.lerp(
      container.current.rotation.y,
      rotationTarget.current,
      0.1
    )

    cameraPosition.current.getWorldPosition(cameraWorldPosition.current)
    camera.position.lerp(cameraWorldPosition.current, 0.1)

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current)
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.2)

      camera.lookAt(cameraLookAt.current)
    }
  })

  return (
    <RigidBody 
      colliders={false} 
      lockRotations 
      ref={rb} 
      friction={1} 
      linearDamping={ 0.5 }
      angularDamping={ 0.5 }
      userData={{ type: "Player" }}
    >
      <group ref={container} visible={phase !== "talking"}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={2} position-z={-10} />
        <group ref={character}>
          <Chara 
            scale={0.5} 
            position-y={-1} 
            rotation-y={-Math.PI / 2} 
            animation={animation}
          />
          {/* <Purete1/> */}
        </group>
      </group>
      <CapsuleCollider args={[0.5, 0.5]} friction={2} />
      <Leva hidden />
    </RigidBody>
  )
})

export default CharacterController
