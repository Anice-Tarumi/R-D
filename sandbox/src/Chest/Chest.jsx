// import React, { useRef, forwardRef, useImperativeHandle, useMemo, useEffect } from "react"
// import { useGLTF, useAnimations } from "@react-three/drei"
// import * as THREE from "three"
// import { useFrame } from "@react-three/fiber"
// import useChestStore from "./useChestStore.jsx"
// import useInteractionStore from "./useInteractionStore.jsx"

// const Chest = forwardRef(({id, modelPath,props,position,rotation,playerRef,onProximity},ref) => {   
//   const chestRef = useRef()
//   const group = useRef()
//   const { scene, nodes, materials, animations } = useGLTF("./chests/Chest.glb")
//   const { actions } = useAnimations(animations, scene)

//   const isChestOpen = useChestStore((state) => state.isChestOpen)
//   const openChest = useChestStore ((state) => state.openChest)

//   // useFrame(() => {
//   //   if (playerRef.current && chestRef.current) {
//   //     const playerPos = new THREE.Vector3()
//   //     const chestPos = new THREE.Vector3()
//   //     playerRef.current.getWorldPosition(playerPos)
//   //     chestRef.current.getWorldPosition(chestPos)

//   //     const distanceToChest = playerPos.distanceTo(chestPos)
//   //     if (!isChestOpen && distanceToChest < 3) {
//   //       onProximity(true) // ボタンを表示
//   //      } else {
//   //       onProximity(false) // ボタンを非表示
//   //     }
//   //   }
//   // })

 

//   // console.log("dou",ref)
//   // useImperativeHandle(ref, () => ({
//   //   openChest: () => {
//   //     const animationName = 'Chest_Open'
//   //     if (!isChestOpen && actions[animationName]) {
//   //       openChest()
//   //       actions[animationName].reset().play()
//   //       console.log("Animation exists for:", animationName)
//   //       actions[animationName].setLoop(THREE.LoopOnce)
//   //       actions[animationName].clampWhenFinished = true
//   //     }
//   //   },
//   // }))

//   useEffect(() => {
//     if (ref.current) {
//       console.log("Adding target to store:", { id, ref, type: "CHEST" })
//       useInteractionStore.getState().addTarget({
//         id,
//         ref,
//         type: "CHEST",
//       })
//     }
//   }, [ref, id])
//   console.log("Current target in store:", useInteractionStore.getState().currentTarget)


//   return (
//     <group ref={chestRef} {...props} position={position} dispose={null} userData={{ type: "CHEST", id, isOpen: isChestOpen, ref: ref}}>
//       <group name="Root_Scene">
//         <group name="RootNode">
//           <group name="Chest_Armature" rotation={[0, Math.PI, 0]} scale={1}>
//           <primitive object={nodes.Root_Scene} />
//             {/* {clonedScene && <primitive object={clonedScene} />} */}
//           </group>
//         </group>
//       </group>
//     </group>
//   )
// })

// useGLTF.preload("/Chest.glb")

// export default Chest
