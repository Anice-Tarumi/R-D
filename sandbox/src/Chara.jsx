import React, { useRef,useEffect, useMemo } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import useClothStore from './useClothStore.jsx'

export default function Chara({animation, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./chara.glb')
  const { actions } = useAnimations(animations, group)
  const selectedHat = useClothStore((state) => state.selectedHat);
  const selectedBag = useClothStore((state) => state.selectedBag);
  const selectedShoes = useClothStore((state) => state.selectedShoes);
  // console.log(nodes)
  const hatModels = {
    "Santa Hat": {
      model: useGLTF("./items/Santa Hat.glb"),
      position: [0.2, 1, 0.1], // 高さ調整
      rotation: [0, Math.PI / 2, 0], // 回転調整
      scale: [10, 10, 10], // スケール調整
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
      position: [0,0.5, -0.8],
      rotation: [0, Math.PI, 0],
      scale: [1.5, 1.5, 1.5],
    },
  };
  
  const shoesModels = {
    "Slippers": {
      left: useGLTF('./items/Slippers.glb'),
      right: useGLTF('./items/Slippers.glb'),
      leftPosition: [0, 0, -0.1],
      rightPosition: [0, 0,-0.1],
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
      return () => {
        headBone.remove(hatObject);
      };
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
      return () => {
        spineBone.remove(bagObject);
      };
    }
  }, [selectedBag, nodes]);

  useEffect(() => {
    if (selectedShoes && shoesModels[selectedShoes]) {
      console.log(shoesModels[selectedShoes]);
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
  }, [animation])

  return (
    <group ref={group} {...props} dispose={null} >
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
    </group>
  )
}
useGLTF.preload('./items/Santa Hat.glb');
useGLTF.preload('./items/Headphones.glb');
useGLTF.preload('./items/Open Backpack.glb');
useGLTF.preload('./items/Backpack.glb');
useGLTF.preload('./items/Slippers.glb');
useGLTF.preload('./items/BootsL.glb');
useGLTF.preload('./items/BootsR.glb');
// useGLTF.preload('/chara.glb')