import React, { useImperativeHandle,forwardRef,useEffect, useRef, useMemo } from 'react'
import { useGLTF, useAnimations, Html } from '@react-three/drei'
import { clone as cloneSkeleton } from 'three/examples/jsm/utils/SkeletonUtils';

export const ChestTest = forwardRef((props, ref) => {

  const group = ref || useRef();
  const { scene,nodes,materials, animations } = useGLTF(props.modelPath);

  // 安全にクローンを作成
  const clonedScene = useMemo(() => {
    if (scene && scene.isObject3D) {
      return cloneSkeleton(scene);
    } else {
      console.error('Invalid scene object:', scene);
      return null;
    }
  }, [scene]);

  const { actions } = useAnimations(animations, group);

useEffect(() => {
  }, [group, props.modelPath]);

useImperativeHandle(ref, () => ({
  openChest: () => {
    console.log("Opening Chest:", props.id);
    if (actions["Chest_Open"]) {
      actions['Chest_Open'].setLoop(THREE.LoopOnce); // 一度だけ再生
      actions['Chest_Open'].clampWhenFinished = true; // 再生終了後に停止
      actions['Chest_Open'].reset().play();
    }
  },
}));
      // useEffect(() => {
      //   if (actions['Chest_Open']) {
      //     console.log(`Chest_Open Action for ${props.id}:`, actions['Chest_Open']);
      //     actions['Chest_Open'].setLoop(THREE.LoopOnce); // 一度だけ再生
      //     actions['Chest_Open'].clampWhenFinished = true; // 再生終了後に停止
      //   } else {
      //     console.warn(`Chest_Open action not found for ${props.id}!`);
      //   }
      // }, [actions, props.id]);

      // const triggerOpenAnimation = () => {
      //   if (actions['Chest_Open']) {
      //     actions['Chest_Open'].reset().play();
      //   }
      // };

  return (
    <group ref={ref}  {...props} dispose={null}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group name="Chest_Armature" rotation={[0, 0, 0]} scale={1}>
            {/* <primitive object={nodes.Root_Scene} /> */}
            {clonedScene && <primitive object={clonedScene} />}
          </group>
          {/* <group name="Chest_Bottom_1" rotation={[-Math.PI / 2, 0, 0]} scale={1}>
            <skinnedMesh
              name="Chest_Bottom_2"
              geometry={nodes.Chest_Bottom_2.geometry}
              material={materials.DarkMetal}
              skeleton={nodes.Chest_Bottom_2.skeleton}
            />
            <skinnedMesh
              name="Chest_Bottom_3"
              geometry={nodes.Chest_Bottom_3.geometry}
              material={materials.Wood}
              skeleton={nodes.Chest_Bottom_3.skeleton}
            />
            <skinnedMesh
              name="Chest_Bottom_4"
              geometry={nodes.Chest_Bottom_4.geometry}
              material={materials.Metal}
              skeleton={nodes.Chest_Bottom_4.skeleton}
            />
            <skinnedMesh
              name="Chest_Bottom_5"
              geometry={nodes.Chest_Bottom_5.geometry}
              material={materials.Gold}
              skeleton={nodes.Chest_Bottom_5.skeleton}
            />
            <skinnedMesh
              name="Chest_Bottom_6"
              geometry={nodes.Chest_Bottom_6.geometry}
              material={materials.Gold_Dark}
              skeleton={nodes.Chest_Bottom_6.skeleton}
            />
          </group>
         <group name="Chest_Top_1" rotation={[-Math.PI / 2, 0, 0]} scale={1}>
            <skinnedMesh
              name="Chest_Top_2"
              geometry={nodes.Chest_Top_2.geometry}
              material={materials.DarkMetal}
              skeleton={nodes.Chest_Top_2.skeleton}
            />
            <skinnedMesh
              name="Chest_Top_3"
              geometry={nodes.Chest_Top_3.geometry}
              material={materials.Wood}
              skeleton={nodes.Chest_Top_3.skeleton}
            />
            <skinnedMesh
              name="Chest_Top_4"
              geometry={nodes.Chest_Top_4.geometry}
              material= {materials.Metal}
              skeleton={nodes.Chest_Top_4.skeleton}
            />
          </group> */}
        </group>
      </group>
    </group>
  )
})

useGLTF.preload('./chests/Chest.glb')
