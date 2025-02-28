import React, { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Water } from "three/examples/jsm/objects/Water.js"

export default function Ocean({ sunDirection }) {
  const waterRef = useRef()
  const { scene } = useThree()
  const guiRef = useRef(null) // GUI のリファレンス

  // 波の設定（初期値）
  const [distortionScale, setDistortionScale] = useState(3.7)
  const [size, setSize] = useState(1.0)

  useEffect(() => {
    // 海のジオメトリ
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000)

    // Water マテリアル
    const water = new Water(waterGeometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load("textures/waternormals.jpg", (texture) => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      }),
      sunDirection: sunDirection || new THREE.Vector3(0, 1, 0),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: distortionScale,
      fog: scene.fog !== undefined,
    })

    water.rotation.x = -Math.PI / 2
    water.position.y = -1.1
    waterRef.current = water
    scene.add(water)

    // GUI 設定
    // if (!guiRef.current) {
    //   const gui = new GUI()
    //   guiRef.current = gui
    //   //guiの位置を左上に移動
    //     gui.domElement.style.position = "absolute"
    //     gui.domElement.style.top = "0px"
    //     gui.domElement.style.left = "0px"

    //   const folderWater = gui.addFolder("Water")
    //   folderWater.add(water.material.uniforms.distortionScale, "value", 0, 8, 0.1).name("distortionScale")
    //   folderWater.add(water.material.uniforms.size, "value", 0.1, 10, 0.1).name("size")
    //   folderWater.open()
    // }

    return () => {
      scene.remove(water)
      guiRef.current?.destroy()
      guiRef.current = null
    }
  }, [scene, sunDirection, distortionScale])

  // 波のアニメーション
  useFrame((delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms["time"].value += delta
    }
  })

  return null
}
