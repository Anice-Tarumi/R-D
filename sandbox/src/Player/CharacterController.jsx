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
import * as THREE from 'three'
import usePlayerStore from "../manager/usePlayerStore.jsx"
import Player from "./Player.jsx"

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
const currentTarget = useInteractionStore((state) => state.currentTarget)
const phase = useGame((state) => state.phase)
const rb = useRef()
const container = useRef()
const character = useRef()
const [animation, setAnimation] = useState("Idle")
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
const prevAnimation = useRef("Idle")
let prevCameraPos = new Vector3();
const setPlayerRef = usePlayerStore((state) => state.setPlayerRef);
const prevCameraPosition = useRef(new THREE.Vector3(0, 1, -5));

useImperativeHandle(ref, () => ({
  getWorldPosition: (vector) => {
    if (rb.current) {
      const translation = rb.current.translation()
      vector.set(translation.x, translation.y, translation.z)
    }
  },
  object: rb.current,
}))

useEffect(() => {
  const onMouseDown = (e) => {
    if(phase !== "title" && phase !== "transition"){
      if (canvasRef.current && canvasRef.current.contains(e.target)) {
        isClicking.current = true
      }
    }
    
  }
  const onMouseUp = (e) => {
    if(phase !== "title" && phase !== "transition"){
      if (canvasRef.current && canvasRef.current.contains(e.target)) {
        isClicking.current = false
      }
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
}, [phase])

useEffect(() => {
  if (rb.current) {
    console.log("rb.current",rb.current)
    setPlayerRef(rb)
  }
}, [rb, setPlayerRef])

  useEffect(() => {
    // console.count("useFrame Function Call");
    if (phase === "playing") {
      if (character.current) {
        character.current.quaternion.copy(initialRotation.current) // 初期回転に戻す
      }
    }
  }, [phase])

  useEffect(() => {
    if (phase === "title" || phase === "transition") {
      return;
    }
  }, [phase]);
  
  
  useFrame(({ camera,mouse,gl }) => {
  
    /** ========== 3. 会話フェーズ ("talking") のカメラ制御 ========== */
    if (phase === "talking" && currentTarget) {
      const npcRef = npcRefs.current[currentTarget.id]
      if(npcRef){

        const npcPosition = new Vector3()
        npcRef.current.getWorldPosition(npcPosition)

        const npcDirection = new Vector3(0, 0, 1.5)
        npcDirection.applyQuaternion(npcRef.current.quaternion)
        npcDirection.applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2)

        const cameraTargetPosition = npcPosition
          .clone()
          .add(npcDirection.multiplyScalar(-4))
          .add(new Vector3(0, 2, 0))

          if (!camera.position.equals(cameraTargetPosition)) {
            camera.position.lerp(cameraTargetPosition, 0.1);

            camera.lookAt(npcPosition.clone().add(new Vector3(0, 3, 0)));
          }
          prevCameraPos.copy(camera.position);
      }
    }
  
    /** ========== 4. 着替えフェーズ ("changing") のカメラ制御 ========== */
    if (phase === "changing") {
      const playerPosition = new Vector3();
      if (rb.current) {
        const translation = rb.current.translation();
        playerPosition.set(translation.x, translation.y, translation.z);
      }
      character.current.lookAt(camera.position.x, playerPosition.y, camera.position.z); // キャラをカメラに向かせる
      camera.fov = MathUtils.lerp(camera.fov, 20, 0.1); // ズーム
      camera.updateProjectionMatrix();
      return;
    }
  
    /** ========== 5. ゲームプレイ中 ("playing") のキャラクター移動処理 ========== */
    if (phase === "playing") {
      camera.fov = MathUtils.lerp(camera.fov, 45, 0.1);
      camera.updateProjectionMatrix();
  
      if (rb.current) {
        const vel = rb.current.linvel();
        const movement = { x: 0, z: 0 };
  
        if (get().forward) movement.z = 1;
        if (get().backward) movement.z = -1;
        if (get().left) movement.x = 1;
        if (get().right) movement.x = -1;
  
        let speed = get().run ? RUN_SPEED : WALK_SPEED;
  
        if (isClicking.current) {
          if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
          movement.z = mouse.y + 0.4;
          if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) speed = RUN_SPEED;
        }
  
        if (movement.x !== 0) rotationTarget.current += ROTATION_SPEED * movement.x;
  
        if (movement.x !== 0 || movement.z !== 0) {
          characterRotationTarget.current = Math.atan2(movement.x, movement.z);
          vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
          vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;
          
          const nextAnimation = speed === RUN_SPEED ? "Run" : "Walk";
          if (prevAnimation.current !== nextAnimation) {
            setAnimation(nextAnimation);
            prevAnimation.current = nextAnimation;
          }
        } else {
          // 🎯 移動入力がない場合、完全に停止
          vel.x = 0;
          vel.z = 0;
          rb.current.setLinvel(new Vector3(0, vel.y, 0), true); // 瞬時に停止
          
          if (prevAnimation.current !== "Idle") {
            setAnimation("Idle");
            prevAnimation.current = "Idle";
          }
        }
  
        character.current.rotation.y = lerpAngle(
          character.current.rotation.y,
          characterRotationTarget.current,
          0.1
        );
  
        rb.current.setLinvel(vel, true);
      }
  
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
  
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
  
      if (cameraTarget.current) {
        cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
        cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.2);
        camera.lookAt(cameraLookAt.current);
      }
    }
  });
  

  return (
    <RigidBody 
      colliders={false} 
      lockRotations 
      ref={rb} 
      friction={1} 
      linearDamping={ 1 }
      angularDamping={ 1 }
      userData={{ type: "Player" }}
    >
      <group ref={container} visible={phase !== "talking"}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={2} position-z={-10} />
        <group ref={character}>
          {/* <Chara 
            scale={0.5} 
            position-y={-1.2} 
            rotation-y={-Math.PI / 2} 
            animation={animation}
          /> */}
          <Player
            scale={1.2} 
            position-y={-1.2} 
            rotation-y={0} 
            animation={animation}
          />
        </group>
      </group>
      <CapsuleCollider args={[0.5, 0.5]} friction={1} />
      <Leva hidden />
    </RigidBody>
  )
})

export default CharacterController
