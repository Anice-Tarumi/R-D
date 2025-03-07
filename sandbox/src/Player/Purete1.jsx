/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Purete1(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/walk.glb')
  const { actions } = useAnimations(animations, group)
  // console.log(actions.animation_0)
    actions.animation_0.play()
  
  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Puretekun_Mesh">
          <group name="Body">
            <skinnedMesh
              name="Body_1"
              geometry={nodes.Body_1.geometry}
              material={materials.Body}
              skeleton={nodes.Body_1.skeleton}
            />
          </group>
          <group name="Eye_L" position={[0.182, 1.244, 0.301]} rotation={[Math.PI / 2, 0, 0]}>
            <skinnedMesh
              name="Eye_L_1"
              geometry={nodes.Eye_L_1.geometry}
              material={materials.Eye}
              skeleton={nodes.Eye_L_1.skeleton}
            />
          </group>
          <group
            name="UpperEyelid_L"
            position={[0.184, 1.289, 0.3]}
            rotation={[-0.1, -0.003, -0.03]}>
            <skinnedMesh
              name="UpperEyelid_L_1"
              geometry={nodes.UpperEyelid_L_1.geometry}
              material={materials.Eyelid}
              skeleton={nodes.UpperEyelid_L_1.skeleton}
            />
          </group>
          <group name="LowerEyelid_L" position={[0.183, 1.239, 0.28]} rotation={[0.019, -0.207, 0]}>
            <skinnedMesh
              name="LowerEyelid_L_1"
              geometry={nodes.LowerEyelid_L_1.geometry}
              material={materials.Eyelid}
              skeleton={nodes.LowerEyelid_L_1.skeleton}
            />
          </group>
          <group name="Eye_R" position={[-0.182, 1.244, 0.301]} rotation={[Math.PI / 2, 0, 0]}>
            <skinnedMesh
              name="Eye_R_1"
              geometry={nodes.Eye_R_1.geometry}
              material={materials.Eye}
              skeleton={nodes.Eye_R_1.skeleton}
            />
          </group>
          <group
            name="UpperEyelid_R"
            position={[-0.184, 1.289, 0.3]}
            rotation={[-0.1, -0.003, -0.03]}>
            <skinnedMesh
              name="UpperEyelid_R_1"
              geometry={nodes.UpperEyelid_R_1.geometry}
              material={materials.Eyelid}
              skeleton={nodes.UpperEyelid_R_1.skeleton}
            />
          </group>
          <group
            name="LowerEyelid_R"
            position={[-0.183, 1.239, 0.28]}
            rotation={[0.019, -0.207, 0]}>
            <skinnedMesh
              name="LowerEyelid_R_1"
              geometry={nodes.LowerEyelid_R_1.geometry}
              material={materials.Eyelid}
              skeleton={nodes.LowerEyelid_R_1.skeleton}
            />
          </group>
          <group name="Nose">
            <skinnedMesh
              name="Nose_1"
              geometry={nodes.Nose_1.geometry}
              material={materials.Nose}
              skeleton={nodes.Nose_1.skeleton}
            />
          </group>
        </group>
        <group name="Puretekun_Rig">
          <group name="Advanced_Biped_rig">
            <group name="Root_null">
              <group name="Bind_null">
                <primitive object={nodes.BD_Spine_01_jnt} />
              </group>
              <group name="Spine_null" position={[0, 0.737, -0.003]}>
                <group name="IK_Spine_null" position={[0, 0.005, 0.003]}>
                  <group
                    name="IK_Pelvis_algn"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, 0, 0]}>
                    <group name="IK_Pelvis_01_jnt" rotation={[-3.135, 0, 0]}>
                      <group
                        name="IK_Pelvis_02_jnt"
                        position={[0, 0, -0.112]}
                        rotation={[1.564, 0, 0]}
                      />
                    </group>
                  </group>
                  <group
                    name="IK_Spine_01_jnt"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, -0.04, 0]}>
                    <group
                      name="IK_Spine_02_jnt"
                      position={[0, 0, -0.108]}
                      rotation={[0, -0.052, 0]}>
                      <group name="IK_Spine_03_jnt" position={[0, 0, -0.107]}>
                        <group
                          name="IK_Spine_04_jnt"
                          position={[0, 0, -0.107]}
                          rotation={[0, 0.052, 0]}>
                          <group
                            name="IK_Spine_05_jnt"
                            position={[0, 0, -0.108]}
                            rotation={[0, 0.04, 0]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group name="FK_Spine_null" position={[0, 0.005, 0.003]}>
                  <group
                    name="FK_Pelvis_algn"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, 0, 0]}>
                    <group name="FK_Pelvis_01_jnt" rotation={[-3.135, 0, 0]}>
                      <group
                        name="FKPelvis_02_jnt"
                        position={[0, 0, -0.112]}
                        rotation={[1.564, 0, 0]}
                      />
                    </group>
                  </group>
                  <group
                    name="FK_Spine_01_jnt"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, 0, 0]}>
                    <group name="FK_Spine_02_jnt" position={[0, 0, -0.112]}>
                      <group name="FK_Spine_03_jnt" position={[0, 0, -0.112]}>
                        <group name="FK_Spine_04_jnt" position={[0, 0, -0.112]}>
                          <group name="FK_Spine_05_jnt" position={[0, 0, -0.112]} />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group name="Blend_Spine_null" position={[0, 0.005, 0.003]}>
                  <group
                    name="Blend_Pelvis_algn"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, 0, 0]}>
                    <group name="BLND_Pelvis_Base_jnt" rotation={[-3.135, 0, 0]}>
                      <group
                        name="BLND_Pelvis_End_jnt"
                        position={[0, 0, -0.112]}
                        rotation={[1.564, 0, 0]}
                      />
                      <group
                        name="L_NB_Leg_no_bendy_null"
                        position={[0.076, 0.003, 0.309]}
                        rotation={[1.564, 0, 0]}>
                        <group
                          name="L_NB_IK_Leg_algn"
                          position={[0.136, -0.43, 0]}
                          rotation={[-1.789, 0, -Math.PI]}>
                          <group name="L_NB_IK_Hip_jnt" rotation={[-0.025, -0.199, 0.037]}>
                            <group
                              name="L_NB_IK_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.507, 0.002, 0.001]}>
                              <group name="L_NB_IK_Ankle_Tip_jnt" position={[0, 0, -0.087]} />
                            </group>
                          </group>
                          <group
                            name="L_NB_IK_Foot_algn"
                            position={[0.04, -0.047, -0.192]}
                            rotation={[-1.967, -0.001, -3.139]}>
                            <group name="L_NB_IK_Ankle_jnt" rotation={[-2.816, 0.001, -3.14]}>
                              <group
                                name="L_NB_IK_Ball_jnt"
                                position={[0, 0, -0.116]}
                                rotation={[0.413, 0, 0]}>
                                <group
                                  name="L_NB_IK_Toes_jnt"
                                  position={[0, 0, -0.04]}
                                  rotation={[-3.106, 0, Math.PI]}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="L_NB_FK_algn" position={[0, -0.284, -0.002]}>
                          <group
                            name="L_NB_FK_Hip_jnt"
                            position={[0.136, -0.146, 0.002]}
                            rotation={[-1.816, 0.003, 3.137]}>
                            <group
                              name="L_NB_FK_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.646, 0.003, 0.002]}>
                              <group name="L_NB_FK_Ankle_Tip_jnt" position={[0, 0, -0.087]} />
                            </group>
                          </group>
                          <group
                            name="L_NB_FK_Foot_algn"
                            position={[0.136, -0.343, -0.002]}
                            rotation={[0.178, 0.001, 0.002]}>
                            <group name="L_NB_FK_Ankle_jnt" rotation={[-2.816, 0.001, -3.14]}>
                              <group
                                name="L_NB_FK_Ball_jnt"
                                position={[0, 0, -0.116]}
                                rotation={[0.414, 0, 0]}>
                                <group
                                  name="L_NB_FK_Toes_jnt"
                                  position={[0, 0, -0.04]}
                                  rotation={[-3.106, 0, Math.PI]}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="L_NB_BD_Leg_null" position={[0, -0.284, -0.002]}>
                          <group
                            name="L_NB_Hip_jnt"
                            position={[0.136, -0.146, 0.002]}
                            rotation={[-1.764, 0.199, -3.104]}>
                            <group
                              name="L_NB_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.507, 0.002, 0.001]}>
                              <group
                                name="L_NB_BD_Ankle_jnt"
                                position={[0, 0, -0.087]}
                                rotation={[1.393, 0.096, -0.175]}>
                                <group
                                  name="L_NB_BD_Ball_jnt"
                                  position={[0, 0, -0.116]}
                                  rotation={[0.413, 0, 0]}>
                                  <group
                                    name="L_NB_BD_Toes_jnt"
                                    position={[0, 0, -0.04]}
                                    rotation={[-3.106, 0, -Math.PI]}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                      <group
                        name="R_NB_Leg_no_bendy_null"
                        position={[-0.076, 0.003, 0.309]}
                        rotation={[1.564, 0, 0]}>
                        <group
                          name="R_NB_IK_Leg_algn"
                          position={[-0.136, -0.43, 0]}
                          rotation={[-1.789, 0, -Math.PI]}>
                          <group name="R_NB_IK_Hip_jnt" rotation={[-0.024, -0.193, 0.048]}>
                            <group
                              name="R_NB_IK_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.51, -0.002, -0.001]}>
                              <group name="R_NB_IK_Ankle_Tip_jnt" position={[0, 0, -0.087]} />
                            </group>
                          </group>
                          <group
                            name="R_NB_IK_Foot_algn"
                            position={[0.04, -0.047, -0.192]}
                            rotation={[-1.967, 0.001, 3.139]}>
                            <group name="R_NB_IK_Ankle_jnt" rotation={[-2.816, -0.001, 3.14]}>
                              <group
                                name="R_NB_IK_Ball_jnt"
                                position={[0, 0, -0.116]}
                                rotation={[0.413, 0, 0]}>
                                <group
                                  name="R_NB_IK_Toes_jnt"
                                  position={[0, 0, -0.04]}
                                  rotation={[-3.106, 0, Math.PI]}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="R_NB_FK_algn" position={[0, -0.284, -0.002]}>
                          <group
                            name="R_NB_FK_Hip_jnt"
                            position={[-0.136, -0.146, 0.002]}
                            rotation={[-1.816, -0.003, -3.137]}>
                            <group
                              name="R_NB_FK_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.646, -0.003, -0.002]}>
                              <group name="R_NB_FK_Ankle_Tip_jnt" position={[0, 0, -0.087]} />
                            </group>
                          </group>
                          <group
                            name="R_NB_FK_Foot_algn"
                            position={[-0.136, -0.343, -0.002]}
                            rotation={[0.178, -0.001, -0.002]}>
                            <group name="R_NB_FK_Ankle_jnt" rotation={[-2.816, -0.001, 3.14]}>
                              <group
                                name="R_NB_FK_Ball_jnt"
                                position={[0, 0, -0.116]}
                                rotation={[0.414, 0, 0]}>
                                <group
                                  name="R_NB_FK_Toes_jnt"
                                  position={[0, 0, -0.04]}
                                  rotation={[-3.106, 0, Math.PI]}
                                />
                              </group>
                            </group>
                          </group>
                        </group>
                        <group name="R_NB_BD_Leg_null" position={[0, -0.284, -0.002]}>
                          <group
                            name="R_NB_Hip_jnt"
                            position={[-0.136, -0.146, 0.002]}
                            rotation={[-1.765, 0.193, -3.094]}>
                            <group
                              name="R_NB_Knee_jnt"
                              position={[0, 0, -0.121]}
                              rotation={[-0.51, -0.002, -0.001]}>
                              <group
                                name="R_NB_BD_Ankle_jnt"
                                position={[0, 0, -0.087]}
                                rotation={[1.396, 0.088, -0.181]}>
                                <group
                                  name="R_NB_BD_Ball_jnt"
                                  position={[0, 0, -0.116]}
                                  rotation={[0.413, 0, 0]}>
                                  <group
                                    name="R_NB_BD_Toes_jnt"
                                    position={[0, 0, -0.04]}
                                    rotation={[-3.106, 0, Math.PI]}
                                  />
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="BLND_Spine_01_jnt"
                    position={[0.04, -0.358, 0]}
                    rotation={[Math.PI / 2, -0.04, 0]}>
                    <group
                      name="BLND_Spine_02_jnt"
                      position={[0, 0, -0.108]}
                      rotation={[0, -0.052, 0]}>
                      <group name="BLND_Spine_03_jnt" position={[0, 0, -0.107]}>
                        <group
                          name="BLND_Spine_04_jnt"
                          position={[0, 0, -0.107]}
                          rotation={[0, 0.052, 0]}>
                          <group
                            name="BLND_Spine_05_jnt"
                            position={[0, 0, -0.108]}
                            rotation={[0, 0.04, 0]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
                <group
                  name="Chest_algn"
                  position={[0.068, 0.077, 0.003]}
                  rotation={[Math.PI / 2, 0, 0]}>
                  <group name="BLND_Chest_jnt" rotation={[0.006, 0, -Math.PI]}>
                    <group
                      name="R_Collar_root_Follow_chest_algn"
                      position={[0.036, -0.039, -0.124]}
                      rotation={[1.577, 0, -Math.PI]}>
                      <group
                        name="R_Collar_root_algn"
                        position={[-0.322, -0.03, 0]}
                        rotation={[0, 0, -Math.PI / 6]}>
                        <group name="R_BLND_Collar_jnt" rotation={[-0.782, 0.954, 0.764]}>
                          <group
                            name="R_BLND_Collar_Tip_jnt"
                            position={[0, 0, -0.125]}
                            rotation={[0.528, 0.312, -0.12]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="L_Collar_root_Follow_chest_algn"
                      position={[-0.036, -0.039, -0.124]}
                      rotation={[1.577, 0, -Math.PI]}>
                      <group
                        name="L_Collar_root_algn"
                        position={[0.322, -0.03, 0]}
                        rotation={[0, 0, Math.PI / 6]}>
                        <group name="L_BLND_Collar_jnt" rotation={[-0.782, -0.954, -0.764]}>
                          <group
                            name="L_BLND_Collar_Tip_jnt"
                            position={[0, 0, -0.125]}
                            rotation={[0.528, -0.312, 0.12]}
                          />
                        </group>
                      </group>
                    </group>
                    <group
                      name="BLND_Neck_jnt"
                      position={[0, 0, -0.224]}
                      rotation={[-0.348, 0, -Math.PI]}>
                      <group
                        name="BLND_Head_jnt"
                        position={[0, 0, -0.139]}
                        rotation={[-0.214, 0, 0]}>
                        <group
                          name="Jaw_Comp"
                          position={[0, 0.321, 0.088]}
                          rotation={[1.253, 0, Math.PI]}>
                          <group name="Jaw_jnt" position={[0, -0.009, -0.031]}>
                            <group
                              name="Jaw_Tip_jnt"
                              position={[0, 0, -0.075]}
                              rotation={[-2.848, 0, Math.PI]}
                            />
                          </group>
                        </group>
                        <group
                          name="R_Eye"
                          position={[-0.047, 0.025, -0.137]}
                          rotation={[Math.PI / 2, 0, -Math.PI]}>
                          <group name="R_Eye_jnt" position={[0.135, -0.087, -0.246]}>
                            <group name="R_Eye_tip_jnt" position={[0, 0, -0.019]} />
                          </group>
                        </group>
                        <group
                          name="L_Eye"
                          position={[0.047, 0.025, -0.137]}
                          rotation={[Math.PI / 2, 0, -Math.PI]}>
                          <group name="L_Eye_jnt" position={[-0.135, -0.087, -0.246]}>
                            <group name="L_Eye_tip_jnt" position={[0, 0, -0.019]} />
                          </group>
                        </group>
                        <group name="BLND_Head_Tip_jnt" position={[0, 0, -0.316]} />
                      </group>
                    </group>
                    <group
                      name="L_NB_Arm_no_bendy_null"
                      position={[-0.036, -0.039, -0.124]}
                      rotation={[1.577, 0, -Math.PI]}>
                      <group name="L_NB_IK_Arm_algn" position={[0.435, -0.023, -0.051]}>
                        <group name="L_NB_IK_Shoulder_jnt" rotation={[-0.301, -1.04, 1.415]}>
                          <group
                            name="L_NB_IK_Elbow_jnt"
                            position={[0, 0, -0.293]}
                            rotation={[-1.105, 0, 0]}>
                            <group
                              name="L_NB_IK_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.576, -0.083, -1.742]}
                            />
                          </group>
                        </group>
                      </group>
                      <group name="L_NB_FK_null" position={[0.152, 0.012, -0.028]}>
                        <group
                          name="L_NB_FK_Shoulder_jnt"
                          position={[0.283, -0.035, -0.024]}
                          rotation={[1.523, -0.671, 3.097]}>
                          <group
                            name="L_NB_FK_Elbow_jnt"
                            position={[0, 0, -0.293]}
                            rotation={[-0.051, 0, 0]}>
                            <group
                              name="L_NB_FK_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.008, -0.005, -1.575]}
                            />
                          </group>
                        </group>
                      </group>
                      <group name="L_NB_BD_Arm_null" position={[0.152, 0.012, -0.028]}>
                        <group name="L_Forearm_Twist_null">
                          <group
                            name="L_NB_BLND_Forearm_Twist_01_jnt"
                            position={[0.465, 0.194, -0.035]}
                            rotation={[1.589, -0.672, 1.568]}>
                            <group
                              name="L_NB_BLND_Forearm_Twist_02_jnt"
                              position={[0, 0, -0.12]}
                              rotation={[0, 0, -0.002]}>
                              <group
                                name="L_NB_BLND_Forearm_Twist_05_tip_jnt"
                                position={[0, 0, -0.12]}
                                rotation={[0, 0, -0.002]}
                              />
                            </group>
                          </group>
                        </group>
                        <group
                          name="L_NB_BLND_Shoulder_jnt"
                          position={[0.283, -0.035, -0.024]}
                          rotation={[1.523, -0.671, 3.097]}>
                          <group
                            name="L_NB_BLND_Elbow_jnt"
                            position={[0, 0, -0.293]}
                            rotation={[-0.051, 0, 0]}>
                            <group
                              name="L_NB_BLND_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.008, -0.005, -1.575]}>
                              <group name="L_Hand_null" rotation={[-0.005, -0.023, 0.005]}>
                                <group name="L_Palm_algn" rotation={[0.005, 0.023, -0.005]}>
                                  <group name="L_NB_Wrist_01_jnt">
                                    <group
                                      name="L_FK_Finger_null"
                                      position={[0.03, 0.006, -0.059]}
                                      rotation={[-0.032, 1.4, 0.028]}>
                                      <group name="L_FK_Finger_null_1" position={[0, -0.002, 0]}>
                                        <group
                                          name="L_NB_FK_Finger_Palm_Base_jnt"
                                          rotation={[0, -1.571, 0]}>
                                          <group
                                            name="L_NB_FK_Finger_Base_jnt"
                                            position={[0, 0, -0.057]}
                                            rotation={[-0.011, 0, 0]}>
                                            <group
                                              name="L_NB_FK_Finger_Mid_jnt"
                                              position={[0, 0, -0.045]}>
                                              <group
                                                name="L_NB_FK_Finger_Top_jnt"
                                                position={[0, 0, -0.035]}>
                                                <group
                                                  name="L_NB_FK_Finger_End_jnt"
                                                  position={[0, 0, -0.032]}
                                                  rotation={[0.011, Math.PI / 2, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="L_FK_Thumb_null"
                                      position={[0.024, 0.006, -0.024]}
                                      rotation={[0.293, 0.509, -0.144]}>
                                      <group name="L_Thumb_null" position={[0, -0.002, 0]}>
                                        <group
                                          name="L_NB_FK_Thumb_Root_jnt"
                                          rotation={[0, -1.571, 0]}>
                                          <group
                                            name="L_NB_FK_Thumb_Base_jnt"
                                            position={[0, 0, -0.057]}
                                            rotation={[-0.048, 0, 0]}>
                                            <group
                                              name="L_NB_FK_Thumb_Mid_jnt"
                                              position={[0, 0, -0.045]}
                                              rotation={[-0.032, 0, 0]}>
                                              <group
                                                name="L_NB_FK_Thumb_End_jnt"
                                                position={[0, 0, -0.035]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="L_NB_Wrist_02_jnt"
                                      position={[0, 0, -0.061]}
                                      rotation={[-Math.PI, 1.544, Math.PI]}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                    <group
                      name="R_NB_Arm_no_bendy_null"
                      position={[0.036, -0.039, -0.124]}
                      rotation={[1.577, 0, -Math.PI]}>
                      <group name="R_NB_IK_Arm_algn" position={[-0.435, -0.023, -0.051]}>
                        <group name="R_NB_IK_Shoulder_jnt" rotation={[-1.339, 1.505, 2.25]}>
                          <group name="R_NB_IK_Elbow_jnt" position={[0, 0, -0.293]}>
                            <group
                              name="R_NB_IK_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.057, -0.043, -0.905]}
                            />
                          </group>
                        </group>
                      </group>
                      <group name="R_NB_FK_null" position={[-0.152, 0.012, -0.028]}>
                        <group
                          name="R_NB_FK_Shoulder_jnt"
                          position={[-0.283, -0.035, -0.024]}
                          rotation={[1.524, 0.667, -3.098]}>
                          <group
                            name="R_NB_FK_Elbow_jnt"
                            position={[0, 0, -0.293]}
                            rotation={[-0.051, 0, 0]}>
                            <group
                              name="R_NB_FK_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.008, 0.005, 1.575]}
                            />
                          </group>
                        </group>
                      </group>
                      <group name="R_NB_BD_Arm_null" position={[-0.152, 0.012, -0.028]}>
                        <group name="R_Forearm_Twist_null">
                          <group
                            name="R_NB_BLND_Forearm_Twist_01_jnt"
                            position={[-0.465, 0.195, -0.035]}
                            rotation={[1.589, 0.668, -1.567]}>
                            <group
                              name="R_NB_BLND_Forearm_Twist_02_jnt"
                              position={[0, 0, -0.12]}
                              rotation={[0, 0, 0.002]}>
                              <group
                                name="R_NB_BLND_Forearm_Twist_05_tip_jnt"
                                position={[0, 0, -0.12]}
                                rotation={[0, 0, 0.002]}
                              />
                            </group>
                          </group>
                        </group>
                        <group
                          name="R_NB_BLND_Shoulder_jnt"
                          position={[-0.283, -0.035, -0.024]}
                          rotation={[1.524, 0.667, -3.098]}>
                          <group
                            name="R_NB_BLND_Elbow_jnt"
                            position={[0, 0, -0.293]}
                            rotation={[-0.051, 0, 0]}>
                            <group
                              name="R_NB_BLND_Wrist_Tip_jnt"
                              position={[0, 0, -0.241]}
                              rotation={[0.008, 0.005, 1.575]}>
                              <group name="R_Hand_null" rotation={[-0.005, 0.023, -0.005]}>
                                <group name="R_Palm_algn" rotation={[0.005, -0.023, 0.005]}>
                                  <group name="R_NB_Wrist_01_jnt">
                                    <group
                                      name="R_FK_Thumb_null"
                                      position={[-0.024, 0.006, -0.024]}
                                      rotation={[0.293, -0.509, 0.144]}>
                                      <group name="R_Thumb_null" position={[0, -0.002, 0]}>
                                        <group
                                          name="R_NB_FK_Thumb_Root_jnt"
                                          rotation={[0, 1.571, 0]}>
                                          <group
                                            name="R_NB_FK_Thumb_Base_jnt"
                                            position={[0, 0, -0.057]}
                                            rotation={[-0.048, 0, 0]}>
                                            <group
                                              name="R_NB_FK_Thumb_Mid_jnt"
                                              position={[0, 0, -0.045]}
                                              rotation={[-0.032, 0, 0]}>
                                              <group
                                                name="R_NB_FK_Thumb_End_jnt"
                                                position={[0, 0, -0.035]}
                                              />
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="R_FK_Finger_null"
                                      position={[-0.03, 0.006, -0.059]}
                                      rotation={[-0.032, -1.4, -0.028]}>
                                      <group name="R_FK_Finger_null_1" position={[0, -0.002, 0]}>
                                        <group
                                          name="R_NB_FK_Finger_Palm_Base_jnt"
                                          rotation={[0, 1.571, 0]}>
                                          <group
                                            name="R_NB_FK_Finger_Base_jnt"
                                            position={[0, 0, -0.057]}
                                            rotation={[-0.011, 0, 0]}>
                                            <group
                                              name="R_NB_FK_Finger_Mid_jnt"
                                              position={[0, 0, -0.045]}>
                                              <group
                                                name="R_NB_FK_Finger_Top_jnt"
                                                position={[0, 0, -0.035]}>
                                                <group
                                                  name="R_NB_FK_Finger_End_jnt"
                                                  position={[0, 0, -0.032]}
                                                  rotation={[0.011, -Math.PI / 2, 0]}
                                                />
                                              </group>
                                            </group>
                                          </group>
                                        </group>
                                      </group>
                                    </group>
                                    <group
                                      name="R_NB_Wrist_02_jnt"
                                      position={[0, 0, -0.061]}
                                      rotation={[-Math.PI, -1.544, -Math.PI]}
                                    />
                                  </group>
                                </group>
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
                  </group>
                </group>
              </group>
            </group>
            <primitive object={nodes.L_BD_Eye_jnt} />
            <primitive object={nodes.R_BD_Eye_jnt} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/walk.glb')
