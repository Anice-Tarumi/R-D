import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import Chara from "./Chara.jsx";
import { useFrame } from "@react-three/fiber";
import { Vector3, MathUtils } from "three";
import { Leva, useControls } from "leva";
import { useKeyboardControls } from "@react-three/drei";
import { degToRad } from "three/src/math/MathUtils.js";
import useGame from "./useGame.jsx";
import useInteractionStore from "./useInteractionStore.jsx";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) {
      start += 2 * Math.PI;
    } else {
      end += 2 * Math.PI;
    }
  }
  return MathUtils.lerp(start, end, t);
};

const CharacterController = forwardRef(({ canvasRef,npcRefs }, ref) => {
  const { WALK_SPEED, RUN_SPEED, ROTATION_SPEED } = useControls("Character Control", {
    WALK_SPEED: { value: 3.0, min: 0.1, max: 4, step: 0.1 },
    RUN_SPEED: { value: 6.5, min: 0.2, max: 12, step: 0.1 },
    ROTATION_SPEED: {
      value: degToRad(0.5),
      min: degToRad(0.1),
      max: degToRad(5),
      step: degToRad(0.1),
    },
  });
  const initialCameraPosition = useRef(new Vector3()); // カメラの初期位置を保存
  const isTalking = useRef(false); // 会話中フラグ

  const phase = useGame((state) => state.phase);
  const currentNPC = useInteractionStore((state) => state.currentNPC); // 現在会話中のNPC ID
  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("idle");

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);
  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());
  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);

  // ref を外部から利用できるようにする
  useImperativeHandle(ref, () => ({
    getWorldPosition: (vector) => {
      if (rb.current) {
        const translation = rb.current.translation(); // RigidBody の位置を取得
        vector.set(translation.x, translation.y, translation.z);
      }
    },
  }));

  useEffect(() => {
    const onMouseDown = (e) => {
      if (canvasRef.current && canvasRef.current.contains(e.target)) {
        isClicking.current = true;
      }
    };
    const onMouseUp = (e) => {
      if (canvasRef.current && canvasRef.current.contains(e.target)) {
        isClicking.current = false;
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchstart", onMouseDown);
    document.addEventListener("touchend", onMouseUp);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchstart", onMouseDown);
      document.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  useFrame(({ camera, mouse }) => {
// console.log(npcRef)
    if (phase === "talking" && currentNPC) {
      const npcRef = npcRefs.current[currentNPC]; // 現在のNPCの参照を取得
      // console.log(npcRef.current.getWorldPosition)
      if(npcRef){
        const npcPosition = new Vector3();
        // console.log(npcRef.getWorldPosition())
        npcRef.current.getWorldPosition(npcPosition);

        // NPCの正面方向を計算
        const npcDirection = new Vector3(0, 0, 1.5); // Z軸正方向をNPCの「前方」と仮定
        npcDirection.applyQuaternion(npcRef.current.quaternion); // NPCの回転を考慮
        npcDirection.applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2); // 90度のY軸オフセット

        // カメラの目標位置を計算 (NPCの前方少し離れた位置)
        const cameraTargetPosition = npcPosition
          .clone()
          .add(npcDirection.multiplyScalar(-4)) // NPCの前方に3単位分離れた位置
          .add(new Vector3(0, 2, 0)); // 少し上の位置

        // カメラを滑らかに移動
        camera.position.lerp(cameraTargetPosition, 0.1);

        // カメラの向きをNPCの顔の少し上側に向ける
        // const lookAtPosition = npcPosition.clone().add(new Vector3(0, 3, 0)); // 顔の高さに調整
        camera.lookAt(npcPosition.clone().add(new Vector3(0, 3, 0)));
      }
    } else if (phase === "playing") {
      // 会話が終了したらカメラを元の位置に戻す
      if (isTalking.current) {
        camera.position.lerp(initialCameraPosition.current, 0.1);
        isTalking.current = false;
      }
    }

    if (phase !== "playing") return; // playing状態以外は操作不可
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement = {
        x: 0,
        z: 0,
      };

      if (get().forward) {
        movement.z = 1;
      }
      if (get().backward) {
        movement.z = -1;
      }
      let speed = get().run ? RUN_SPEED : WALK_SPEED;
      if (isClicking.current) {
        if (Math.abs(mouse.x) > 0.1) {
          movement.x = -mouse.x;
        }

        movement.z = mouse.y + 0.4;
        if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
          speed = RUN_SPEED;
        }
      }

      if (get().left) {
        movement.x = 1;
      }

      if (get().right) {
        movement.x = -1;
      }

      if (movement.x !== 0) {
        rotationTarget.current += ROTATION_SPEED * movement.x;
      }

      if (movement.x !== 0 || movement.z !== 0) {
        characterRotationTarget.current = Math.atan2(movement.x, movement.z);
        vel.x = Math.sin(rotationTarget.current + characterRotationTarget.current) * speed;
        vel.z = Math.cos(rotationTarget.current + characterRotationTarget.current) * speed;
        setAnimation(speed === RUN_SPEED ? "run" : "walk");
      } else {
        setAnimation("idle");
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
  });

  return (
    <RigidBody colliders={false} lockRotations ref={rb} friction={1}>
      <group ref={container} visible={phase !== "talking"}>
        <group ref={cameraTarget} position-z={1.5} />
        <group ref={cameraPosition} position-y={2} position-z={-10} />
        <group ref={character}>
          <Chara scale={0.5} position-y={-1} rotation-y={-Math.PI / 2} animation={animation} />
        </group>
      </group>
      <CapsuleCollider args={[0.5, 0.5]} friction={2} />
      <Leva hidden />
    </RigidBody>
  );
});

export default CharacterController;
