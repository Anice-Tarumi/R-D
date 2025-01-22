import { useEffect, useRef, useState } from 'react';
import { OrbitControls, Line } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { Vector3 } from 'three';
import Lights from './Lights.jsx';
import { useFrame } from '@react-three/fiber';

export default function Experience() {
  const groupRef = useRef();
  const samplerRef = useRef(null); // sampler を useRef で管理
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      './idle.glb', // 自作モデルのパス
      (gltf) => {
        console.log(gltf.scene); // モデル全体の構造を確認
        const mesh = findMesh(gltf.scene); // メッシュを検索

        if (!mesh) {
          console.error("No valid mesh found in the loaded GLTF model.");
          return;
        }
        
        // gltf.scene.scale.set([10,10,10])

        samplerRef.current = new MeshSurfaceSampler(mesh).build(); // sampler を作成
        const tempPaths = [];
        console.log(groupRef.current.rotation)

        for (let i = 0; i < 4; i++) {
          tempPaths.push(createPath(i));
        }
        setPaths(tempPaths);
      },
      undefined,
      (err) => console.error(err)
    );
  }, []);

  // 再帰的にメッシュを検索
  function findMesh(node) {
    if (node.isMesh) return node; // メッシュを発見したら返す
    if (node.children && node.children.length > 0) {
      for (let child of node.children) {
        const found = findMesh(child); // 子要素を再帰的に検索
        if (found) return found;
      }
    }
    return null; // メッシュが見つからない場合
  }

  function createPath(index) {
    const vertices = [];
    const tempPosition = new Vector3();
    let previousPoint = new Vector3();

    samplerRef.current.sample(tempPosition);
    previousPoint.copy(tempPosition);

    return {
      vertices,
      tempPosition,
      previousPoint,
      color: [`#FAAD80`, `#FF6767`, `#FF3D68`, `#A73489`][index % 4],
    };
  }

  useFrame((_,delta) => {
    if (!samplerRef.current) return; // sampler がまだロードされていない場合はスキップ
    groupRef.current.rotation.y += delta / 2
    setPaths((prevPaths) =>
      prevPaths.map((path) => {
        if (path.vertices.length >= 8000) return path; // 頂点数が制限を超えたら更新しない

        const { tempPosition, previousPoint, vertices } = path;
        let pointFound = false;

        while (!pointFound) {
          samplerRef.current.sample(tempPosition);
          if (tempPosition.distanceTo(previousPoint) < 0.1) {
            vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
            previousPoint.copy(tempPosition);
            pointFound = true;
          }
        }

        return { ...path, vertices: [...vertices] };
      })
    );
  });

  return (
    <>
      <OrbitControls makeDefault />
      <Lights />
      <group ref={groupRef}>
        {paths.map((path, index) => (
          <Line
            key={index}
            scale={100}
            position={[0,-100,0]}
            points={path.vertices.reduce((arr, v, i) => {
              if (i % 3 === 0) arr.push(new Vector3(path.vertices[i], path.vertices[i + 1], path.vertices[i + 2]));
              return arr;
            }, [])}
            color={path.color}
            transparent
            opacity={0.5}
          />
        ))}
      </group>
    </>
  );
}
