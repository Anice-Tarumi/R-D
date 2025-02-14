import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { GPUComputationRenderer } from "three/examples/jsm/misc/GPUComputationRenderer.js";

const WIDTH = 32;
const BOUNDS = 800;

export default function FlockingBirds() {
  const { gl } = useThree();
  const gpuCompute = useRef();
  const positionVariable = useRef();
  const velocityVariable = useRef();
  const birdRef = useRef();

  useEffect(() => {
    if (!gl) return;

    gpuCompute.current = new GPUComputationRenderer(WIDTH, WIDTH, gl);

    const dtPosition = gpuCompute.current.createTexture();
    const dtVelocity = gpuCompute.current.createTexture();

    function fillTexture(texture) {
      const theArray = texture.image.data;
      for (let k = 0, kl = theArray.length; k < kl; k += 4) {
        theArray[k + 0] = Math.random() * BOUNDS - BOUNDS / 2;
        theArray[k + 1] = Math.random() * BOUNDS - BOUNDS / 2;
        theArray[k + 2] = Math.random() * BOUNDS - BOUNDS / 2;
        theArray[k + 3] = 1;
      }
    }

    fillTexture(dtPosition);
    fillTexture(dtVelocity);

    // 🚀 修正後の `fragmentShaderPosition`
    const fragmentShaderPosition = `
      precision highp float;
      void main() {
        vec4 pos = texture2D(textureVelocity, gl_FragCoord.xy / vec2(32.0, 32.0));
        gl_FragColor = vec4(pos.xyz + vec3(0.01, 0.01, 0.01), 1.0);
      }
    `;

    const fragmentShaderVelocity = `
      precision highp float;
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `;

    positionVariable.current = gpuCompute.current.addVariable("texturePosition", fragmentShaderPosition, dtPosition);
    velocityVariable.current = gpuCompute.current.addVariable("textureVelocity", fragmentShaderVelocity, dtVelocity);

    gpuCompute.current.setVariableDependencies(velocityVariable.current, [positionVariable.current, velocityVariable.current]);
    gpuCompute.current.setVariableDependencies(positionVariable.current, [positionVariable.current, velocityVariable.current]);

    const error = gpuCompute.current.init();
    console.log("GPU Compute Renderer Init Status:", error);
    
    // 🚀 WebGL シェーダーエラーを詳細に表示
    const glContext = gl.getContext();
    const shaderLog = glContext.getShaderInfoLog(glContext.createShader(glContext.FRAGMENT_SHADER));
    console.log("Shader Compile Log:", shaderLog);

  }, [gl]);

  useFrame(() => {
    if (!gpuCompute.current) return;

    gpuCompute.current.compute();

    // 🚀 `compute()` の結果を確認
    const posTex = gpuCompute.current.getCurrentRenderTarget(positionVariable.current)?.texture;
    console.log("Position Texture Data:", posTex?.image?.data?.slice(0, 20));

    if (birdRef.current && posTex) {
      birdRef.current.material.uniforms.texturePosition.value = posTex;
    }
  });

  return (
    <mesh ref={birdRef}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={{ texturePosition: { value: null } }}
        vertexShader={birdVertexShader}
        fragmentShader={birdFragmentShader}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// 🦜 鳥のシェーダー
const birdVertexShader = `
  precision highp float;
  uniform sampler2D texturePosition;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec4 pos = texture2D(texturePosition, uv);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.xyz, 1.0);
  }
`;

const birdFragmentShader = `
  precision highp float;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(vUv, 0.5, 1.0, 1.0);
  }
`;
