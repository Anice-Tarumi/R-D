import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Lights()
{
    // const light = useRef()
    
    // useFrame((state) =>
    // {
    //     light.current.position.z = state.camera.position.z + 1 - 4
    //     light.current.target.position.z = state.camera.position.z - 4
    //     light.current.target.updateMatrixWorld()
    // })

    return <>
        <directionalLight
            castShadow
            position={ [ 5, 5, 1 ] }
            intensity={ 4.5 }
            shadow-mapSize={ [ 2048, 2048 ] }
            shadow-camera-near={ 0.1 }
            shadow-camera-far={ 50 }
            shadow-camera-top={ 50 }
            shadow-camera-right={ 50 }
            shadow-camera-bottom={ - 50 }
            shadow-camera-left={ - 50 }
        />
        <ambientLight intensity={ 1.5 } />
    </>
}