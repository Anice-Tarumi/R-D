import React, { useEffect } from "react"
import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

const City = (position) => {
  const gltf = useLoader(GLTFLoader, "./map/city/scenev3.gltf", (loader) => {
    // Optional: DRACO圧縮されたモデルを読み込む場合の設定
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/") // デコーダーへのパス
    loader.setDRACOLoader(dracoLoader)
  })

  useEffect(() => {
    // 読み込みが完了した後の処理
    // console.log("Model loaded:", gltf)
  }, [gltf])

  return <primitive object={gltf.scene} position={[0,-1,0]}/>
}

export default City
