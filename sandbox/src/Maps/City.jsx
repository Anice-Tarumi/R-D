import React, { useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
import { useGLTF } from "@react-three/drei"

const City = (position) => {
  const gltf = useLoader(GLTFLoader, "./map/city/scenev3.gltf", (loader) => {
    // Optional: DRACO圧縮されたモデルを読み込む場合の設定
    // const dracoLoader = new DRACOLoader()
    // dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/") // デコーダーへのパス
    // loader.setDRACOLoader(dracoLoader)
    
  })

  useEffect(() => {
    // すべてのメッシュに対して receiveShadow を適用
    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true;
        child.castShadow = true
      }
    });
  }, [gltf]);

  useEffect(() => {
    return () => {
      if (gltf) {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (child.material.isMaterial) {
              Object.keys(child.material).forEach((key) => {
                const value = child.material[key];
                if (value && typeof value.dispose === "function") {
                  value.dispose();
                }
              });
            }
          }
        });
      }
    };
  }, []);

  return <primitive object={gltf.scene} position={[0,-1,0]}/>
}
// useGLTF.preload("./map/city/scenev3.gltf");

export default City
