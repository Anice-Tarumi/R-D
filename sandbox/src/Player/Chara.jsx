import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import useClothStore from '../manager/useClothStore.jsx'

export default function Chara({ animation, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./chara.glb')
  const { actions } = useAnimations(animations, group)
  
  // 選択されている衣装
  const selectedHat = useClothStore((state) => state.selectedHat);
  const selectedBag = useClothStore((state) => state.selectedBag);
  const selectedShoes = useClothStore((state) => state.selectedShoes);

  // スケールアニメーション
  const [spring, api] = useSpring(() => ({
    scale: 0.5, // 初期スケール
    config: {
      tension: 500, // バネの強さ
      friction: 12,  // 摩擦の強さ（小さいほどボヨンボヨン）
    },
  }))

  // 衣装変更時にスケールアニメーションをトリガー
  useEffect(() => {
    if (selectedHat || selectedBag || selectedShoes) {
      api.start({ scale: 0.45 }) // 一瞬小さく
      setTimeout(() => {
        api.start({ scale: 0.5 }) // 少し大きくして戻る
      }, 100)
    }
  }, [selectedHat, selectedBag, selectedShoes, api])

  // 衣装ごとの設定
  const hatModels = {
    "Santa Hat": {
      model: useGLTF("./items/Santa Hat.glb"),
      position: [0.2, 1, 0.1],
      rotation: [0, Math.PI / 2, 0],
      scale: [10, 10, 10],
    },
    "Headphones": {
      model: useGLTF("./items/Headphones.glb"),
      position: [0, 0, 0],
      rotation: [0, Math.PI / 2, 0],
      scale: [1.5, 1.5, 2],
    },
  };

  const bagModels = {
    "Open Backpack": {
      model: useGLTF("./items/Open Backpack.glb"),
      position: [0, 1.2, -0.5],
      rotation: [0, -Math.PI / 2, 0],
      scale: [2, 2, 2],
    },
    "Backpack": {
      model: useGLTF("./items/Backpack.glb"),
      position: [0, 0.5, -0.8],
      rotation: [0, Math.PI, 0],
      scale: [1.5, 1.5, 1.5],
    },
  };

  const shoesModels = {
    "Slippers": {
      left: useGLTF('./items/Slippers.glb'),
      right: useGLTF('./items/Slippers.glb'),
      leftPosition: [0, 0, -0.1],
      rightPosition: [0, 0, -0.1],
      rotation: [Math.PI / 2, Math.PI, 0],
      scale: [1, 1, 1],
    },
    "Boots": {
      left: useGLTF("./items/BootsL.glb"),
      right: useGLTF("./items/BootsR.glb"),
      leftPosition: [0, -0.1, -0.1],
      rightPosition: [0, -0.1, -0.1],
      rotation: [Math.PI / 2, Math.PI, 0],
      scale: [1, 1, 1],
    },
  };

  useEffect(() => {
    if (selectedHat && hatModels[selectedHat]) {
      const headBone = nodes["mixamorigHead"];
      const hatObject = hatModels[selectedHat].model.scene.clone();
      const { position, rotation, scale } = hatModels[selectedHat];
      hatObject.position.set(...position);
      hatObject.rotation.set(...rotation);
      hatObject.scale.set(...scale);
      headBone.add(hatObject);
      return () => headBone.remove(hatObject);
    }
  }, [selectedHat, nodes]);

  useEffect(() => {
    if (selectedBag && bagModels[selectedBag]) {
      const spineBone = nodes["mixamorigSpine"];
      const bagObject = bagModels[selectedBag].model.scene.clone();
      const { position, rotation, scale } = bagModels[selectedBag];
      bagObject.position.set(...position);
      bagObject.rotation.set(...rotation);
      bagObject.scale.set(...scale);
      spineBone.add(bagObject);
      return () => spineBone.remove(bagObject);
    }
  }, [selectedBag, nodes]);

  useEffect(() => {
    if (selectedShoes && shoesModels[selectedShoes]) {
      const leftFootBone = nodes["mixamorigLeftToeBase"];
      const rightFootBone = nodes["mixamorigRightToeBase"];
      const leftShoe = shoesModels[selectedShoes].left.scene.clone();
      const rightShoe = shoesModels[selectedShoes].right.scene.clone();
      const { leftPosition, rightPosition, rotation, scale } = shoesModels[selectedShoes];
      leftShoe.position.set(...leftPosition);
      rightShoe.position.set(...rightPosition);
      leftShoe.rotation.set(...rotation);
      rightShoe.rotation.set(...rotation);
      leftShoe.scale.set(...scale);
      rightShoe.scale.set(...scale);
      leftFootBone.add(leftShoe);
      rightFootBone.add(rightShoe);
      return () => {
        leftFootBone.remove(leftShoe);
        rightFootBone.remove(rightShoe);
      };
    }
  }, [selectedShoes, nodes]);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.24).play()
    return () => actions?.[animation]?.fadeOut(0.24)
  }, [animation]);

  return (
    <a.group ref={group} {...props} dispose={null} scale={spring.scale}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="mesh_char_137"
            geometry={nodes.mesh_char_137.geometry}
            material={materials._034_Ghost}
            skeleton={nodes.mesh_char_137.skeleton}
            morphTargetDictionary={nodes.mesh_char_137.morphTargetDictionary}
            morphTargetInfluences={nodes.mesh_char_137.morphTargetInfluences}
            castShadow
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </a.group>
  );
}
