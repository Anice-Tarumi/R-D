import { shaderMaterial,Sparkles,useGLTF,OrbitControls, Gltf, useTexture, Center } from '@react-three/drei'
import { useFrame,extend } from '@react-three/fiber'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import portalVertexShader from './portal/vertex.glsl'
import portalFragmentShader from './portal/fragment.glsl'
import { BallCollider } from '@react-three/rapier'
import useInteractionStore from './useInteractionStore'

const PortalMaterial = shaderMaterial({
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000')
},
    portalVertexShader,
    portalFragmentShader
)

extend({PortalMaterial})

export default function Portal({position,id,playerRef})
{
    const portalRef = useRef(); // ポータルの参照
    const setCurrentTarget = useInteractionStore((state) => state.setCurrentTarget);
    const removeTarget = useInteractionStore((state) => state.removeTarget);
    const currentTarget = useInteractionStore((state) => state.currentTarget);
    const [isTargetSet, setIsTargetSet] = useState(false);
    const {nodes} = useGLTF('./model/portal.glb')

    const bakedTexture = useTexture('./model/baked.jpg')
    bakedTexture.flipY = false

    const portalMaterial = useRef()

    useFrame((delta) => {
        // console.log(portalRef.current,playerRef.current)
        if (!portalRef.current || !playerRef?.current) return;
    
        const portalPosition = new THREE.Vector3();
        const playerPosition = new THREE.Vector3();
        portalRef.current.getWorldPosition(portalPosition);
        playerRef.current.getWorldPosition(playerPosition);
    
        const distance = portalPosition.distanceTo(playerPosition); // 距離計算
    
        if (distance < 5) {
          if (!isTargetSet) {
            setCurrentTarget('PORTAL', id); // ポータルをターゲットに設定
            setIsTargetSet(true)
            console.log('ポータルに近づきました:', id);
          }
        } else {
          if (isTargetSet) {
            removeTarget(); // 離れた場合ターゲットを解除
            setIsTargetSet(false)
            console.log('ポータルから離れました:', id);
          }
        }
    
        // ポータルシェーダーの時間更新
        if (portalMaterial.current) {
          portalMaterial.current.uTime += delta; // ポータルシェーダーのアニメーション速度
        }
      });
    

    return <>
    <group position={position} scale={3} userData={{type: "PORTAL", id}} ref={portalRef}>
           
                <mesh geometry={nodes.baked.geometry} >
                    <meshBasicMaterial map={bakedTexture}/>
                </mesh>
            
            
            <mesh geometry={nodes.poleLightA.geometry} position={nodes.poleLightA.position}>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh geometry={nodes.poleLightB.geometry} position={nodes.poleLightB.position}>
                <meshBasicMaterial color="#ffffe5" />
            </mesh>

            <mesh 
                geometry={nodes.portalLight.geometry} 
                position={nodes.portalLight.position}
                rotation={nodes.portalLight.rotation}
            >
                <portalMaterial ref={portalMaterial}/>
            </mesh>
            <Sparkles 
                scale={[4,2,4]} 
                count={40} 
                size={6} 
                position-y={1}
                speed={0.2} 
                color={'black'}
            />
            {/* <BallCollider
                args={[0.5]} // コライダーの半径
                position={[0,0.84,4.1]}
                sensor={true}
                onIntersectionEnter={(event) => {
                    const { type, id } = event.other.rigidBodyObject.userData || {};
                    if (type === 'Player') {
                    setInteractionTarget({ type: 'Portal', id: 'portal1', ref: portalRef });
                    }
                }}
                onIntersectionExit={(event) => {
                    const { type, id } = event.other.rigidBodyObject.userData || {};
                    if (type === 'Player') {
                    removeInteractionTarget();
                    }
                }}
            /> */}
            </group>
            
    </>
}