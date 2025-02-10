import React, { useRef, useEffect, useMemo } from 'react'
import { useGLTF, useAnimations, ContactShadows } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'
import useClothStore from '../manager/useClothStore.jsx'
import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function Player({animation, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./low_chara/m_1.glb')
  const { actions } = useAnimations(animations, group)
    const { scene } = useThree()

    // 選択されている衣装
    const selectedHat = useClothStore((state) => state.selectedHat);
    const selectedBag = useClothStore((state) => state.selectedBag);
    const selectedShoes = useClothStore((state) => state.selectedShoes);

    // スケールアニメーション
    const [spring, api] = useSpring(() => ({
    scale: 1.2, // 初期スケール
    config: {
        tension: 500, // バネの強さ
        friction: 20,  // 摩擦の強さ（小さいほどボヨンボヨン）
    },
    }))
    
    // 衣装変更時にスケールアニメーションをトリガー
    useEffect(() => {
        if (selectedHat || selectedBag || selectedShoes) {
            // console.log(selectedHat,selectedBag,selectedShoes)
        api.start({ scale: 1.12 }) // 一瞬小さく
        setTimeout(() => {
            api.start({ scale: 1.2 }) // 少し大きくして戻る
        }, 100)
        }
    }, [selectedHat, selectedBag, selectedShoes, api])

    // 衣装ごとの設定
      const hatModels = {
        "Santa Hat": {
          model: useGLTF("./items/Santa Hat.glb"),
          position: [0.05, 0.4, -0.05],
          rotation: [0, Math.PI / 2, 0],
          scale: [2, 2, 2],
        },
        "Headphones": {
          model: useGLTF("./items/Headphones.glb"),
          position: [0, 0.05, 0],
          rotation: [0, Math.PI / 2, 0],
          scale: [0.4, 0.4, 0.45],
        },
      };
    
      const bagModels = {
        "Open Backpack": {
          model: useGLTF("./items/Open Backpack.glb"),
          position: [0, 0.1, -0.12],
          rotation: [0, -Math.PI / 2, 0],
          scale: [0.8, 0.8, 0.8],
        },
        "Backpack": {
          model: useGLTF("./items/Backpack.glb"),
          position: [0, 0, -0.2],
          rotation: [0, Math.PI, 0],
          scale: [0.5, 0.5, 0.5],
        },
      };
    
      const shoesModels = {
        "Slippers": {
          left: useGLTF('./items/Slippers.glb'),
          right: useGLTF('./items/Slippers.glb'),
          leftPosition: [0, 0.1, 0.1],
          rightPosition: [0, 0, 0.1],
          rotation: [Math.PI / 2.5, Math.PI, Math.PI],
          scale: [1, 1, 1],
        },
        "Boots": {
          left: useGLTF("./items/BootsL.glb"),
          right: useGLTF("./items/BootsR.glb"),
          leftPosition: [0, 0.1, 0.1],
          rightPosition: [0, 0.1, 0.1],
          rotation: [Math.PI / 2.3, Math.PI, Math.PI],
          scale: [0.7, 0.7, 0.7],
        },
      };

      // 全ボーンをリストアップして確認
// useEffect(() => {
//     // console.log("📌 すべてのボーン:");
//     Object.keys(nodes).forEach((key) => {
//       if (nodes[key].isBone) {
//         // console.log(`Bone: ${key}`, nodes[key]);
//       }
//     });
//   }, []);

      useEffect(() => {
          if (selectedHat && hatModels[selectedHat]) {
            const headBone = nodes["DEF-spine006"];
            const hatObject = hatModels[selectedHat].model.scene.clone();
            const { position, rotation, scale } = hatModels[selectedHat];
            // console.log(position,rotation,scale)
            hatObject.position.set(...position);
            hatObject.rotation.set(...rotation);
            hatObject.scale.set(...scale);
            // console.log("Player",headBone)
            headBone.add(hatObject);
            return () => headBone.remove(hatObject);
          }
        }, [selectedHat, nodes]);
      
        useEffect(() => {
          if (selectedBag && bagModels[selectedBag]) {
            const spineBone = nodes["DEF-spine003"];
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
            const leftFootBone = nodes["DEF-footL"];
            const rightFootBone = nodes["DEF-footR"];
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
            if (actions[animation]) {
              // 現在アクティブなアニメーションを取得
              const activeAction = Object.values(actions).find(action => action.isRunning());
              
              if (activeAction && activeAction !== actions[animation]) {
                // 現在のアニメーションから新しいアニメーションへクロスフェード
                activeAction.crossFadeTo(actions[animation], 0.2, false);
              }
              
              actions[animation].reset().play();
            }
          
            return () => {
              if (actions[animation]) {
                actions[animation].fadeOut(0.2);
              }
            };
          }, [animation]);
          

  return (
    <a.group ref={group} {...props} dispose={null} scale={spring.scale}>
      <group name="Scene">
        <group name="metarig" position={[0, 0.018, 0]}>
          <group name="spine" position={[0, 0.775, -0.047]} rotation={[0.252, 0, 0]}>
            <group name="thighR" position={[-0.098, 0.029, -0.001]} rotation={[2.774, 0, -0.005]}>
              <group name="shinR" position={[0, 0.319, 0]} rotation={[0.213, 0.001, 0.012]}>
                <group name="footR" position={[0, 0.421, 0]} rotation={[-1.342, 0.007, -0.001]}>
                  <group name="toeR" position={[0, 0.161, 0]} rotation={[2.718, 0, Math.PI]} />
                  <group
                    name="heel02R"
                    position={[0.032, -0.06, 0.097]}
                    rotation={[2.815, 0, Math.PI / 2]}
                  />
                </group>
              </group>
            </group>
            <group name="spine001" position={[0, 0.13, 0]} rotation={[-0.181, 0, 0]}>
              <group name="spine002" position={[0, 0.201, 0]} rotation={[-0.103, 0, 0]}>
                <group name="spine003" position={[0, 0.147, 0]} rotation={[-0.004, 0, 0]}>
                  <group
                    name="shoulderL"
                    position={[0.016, 0.088, 0.066]}
                    rotation={[-1.536, -0.027, -0.968]}>
                    <group
                      name="upper_armL"
                      position={[0.016, 0.178, -0.017]}
                      rotation={[1.702, 1.009, -2.679]}>
                      <group
                        name="forearmL"
                        position={[0, 0.281, 0]}
                        rotation={[0.255, 0.071, -0.127]}>
                        <group
                          name="handL"
                          position={[0, 0.245, 0]}
                          rotation={[-0.034, -0.029, -0.038]}>
                          <group
                            name="palm03L"
                            position={[-0.003, 0.022, -0.016]}
                            rotation={[0.166, 1.152, -0.487]}>
                            <group
                              name="f_ring01L"
                              position={[0, 0.044, 0]}
                              rotation={[0.19, 0.004, 0.068]}>
                              <group
                                name="f_ring02L"
                                position={[0, 0.057, 0]}
                                rotation={[0.08, 0.004, 0.061]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm02L"
                            position={[-0.004, 0.027, 0.007]}
                            rotation={[0.552, 1.317, -0.657]}>
                            <group
                              name="f_middle01L"
                              position={[0, 0.047, 0]}
                              rotation={[0.127, -0.006, -0.038]}>
                              <group
                                name="f_middle02L"
                                position={[0, 0.056, 0]}
                                rotation={[0.141, 0.006, 0.014]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm04L"
                            position={[0.001, 0.019, -0.038]}
                            rotation={[0.241, 1.157, -0.676]}>
                            <group
                              name="f_pinky01L"
                              position={[0, 0.044, 0]}
                              rotation={[0.054, -0.005, 0.074]}>
                              <group
                                name="f_pinky02L"
                                position={[0, 0.04, 0]}
                                rotation={[0.195, 0.009, 0.114]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm01L"
                            position={[-0.004, 0.031, 0.03]}
                            rotation={[0.759, 1.247, -0.737]}>
                            <group
                              name="f_index01L"
                              position={[0, 0.047, 0]}
                              rotation={[0.014, 0.001, -0.03]}>
                              <group
                                name="f_index02L"
                                position={[0, 0.05, 0]}
                                rotation={[0.125, -0.007, -0.038]}
                              />
                            </group>
                            <group
                              name="thumb01L"
                              position={[-0.015, 0, 0.016]}
                              rotation={[-2.141, 0.976, 2.578]}>
                              <group
                                name="thumb02L"
                                position={[0, 0.053, 0]}
                                rotation={[0.152, -0.006, -0.037]}
                              />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="shoulderR"
                    position={[-0.016, 0.088, 0.066]}
                    rotation={[-1.536, 0.027, 0.968]}>
                    <group
                      name="upper_armR"
                      position={[-0.016, 0.178, -0.017]}
                      rotation={[1.702, -1.009, 2.679]}>
                      <group
                        name="forearmR"
                        position={[0, 0.281, 0]}
                        rotation={[0.255, -0.071, 0.127]}>
                        <group
                          name="handR"
                          position={[0, 0.245, 0]}
                          rotation={[-0.034, 0.029, 0.038]}>
                          <group
                            name="palm03R"
                            position={[0.003, 0.022, -0.016]}
                            rotation={[0.166, -1.152, 0.487]}>
                            <group
                              name="f_ring01R"
                              position={[0, 0.044, 0]}
                              rotation={[0.19, -0.004, -0.068]}>
                              <group
                                name="f_ring02R"
                                position={[0, 0.057, 0]}
                                rotation={[0.08, -0.004, -0.061]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm04R"
                            position={[-0.001, 0.019, -0.038]}
                            rotation={[0.241, -1.157, 0.676]}>
                            <group
                              name="f_pinky01R"
                              position={[0, 0.044, 0]}
                              rotation={[0.054, 0.005, -0.074]}>
                              <group
                                name="f_pinky02R"
                                position={[0, 0.04, 0]}
                                rotation={[0.195, -0.009, -0.114]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm01R"
                            position={[0.004, 0.031, 0.03]}
                            rotation={[0.759, -1.247, 0.737]}>
                            <group
                              name="f_index01R"
                              position={[0, 0.047, 0]}
                              rotation={[0.014, -0.001, 0.03]}>
                              <group
                                name="f_index02R"
                                position={[0, 0.05, 0]}
                                rotation={[0.125, 0.007, 0.038]}
                              />
                            </group>
                            <group
                              name="thumb01R"
                              position={[0.015, 0, 0.016]}
                              rotation={[-2.141, -0.976, -2.578]}>
                              <group
                                name="thumb02R"
                                position={[0, 0.053, 0]}
                                rotation={[0.152, 0.006, 0.037]}
                              />
                            </group>
                          </group>
                          <group
                            name="palm02R"
                            position={[0.004, 0.027, 0.007]}
                            rotation={[0.552, -1.317, 0.657]}>
                            <group
                              name="f_middle01R"
                              position={[0, 0.047, 0]}
                              rotation={[0.127, 0.006, 0.038]}>
                              <group
                                name="f_middle02R"
                                position={[0, 0.056, 0]}
                                rotation={[0.141, -0.006, -0.014]}
                              />
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group name="spine004" position={[0, 0.132, 0]} rotation={[0.277, 0, 0]}>
                    <group name="spine005" position={[0, 0.087, 0]} rotation={[-0.054, 0, 0]}>
                      <group name="spine006" position={[0, 0.053, 0]} rotation={[-0.188, 0, 0]} />
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <group name="pelvisL" rotation={[-2.035, -0.82, -2.237]} />
            <group name="pelvisR" rotation={[-2.035, 0.82, 2.237]} />
            <group name="thighL" position={[0.098, 0.029, -0.001]} rotation={[2.774, 0, 0.005]}>
              <group name="shinL" position={[0, 0.319, 0]} rotation={[0.213, -0.001, -0.012]}>
                <group name="footL" position={[0, 0.421, 0]} rotation={[-1.342, -0.007, 0.001]}>
                  <group name="toeL" position={[0, 0.161, 0]} rotation={[2.718, 0, -Math.PI]} />
                  <group
                    name="heel02L"
                    position={[-0.032, -0.06, 0.097]}
                    rotation={[2.815, 0, -Math.PI / 2]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="rig">
          <skinnedMesh
            name="m_1"
            geometry={nodes.m_1.geometry}
            material={materials.Material}
            skeleton={nodes.m_1.skeleton}
            castShadow
          />
          <primitive object={nodes['MCH-torsoparent']} />
          <primitive object={nodes.root} />
        </group>
      </group>
    </a.group>
  )
}

useGLTF.preload('./low_chara/m_1.glb')
