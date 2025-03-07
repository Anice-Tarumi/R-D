import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber';
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js';

extend({ GPUComputationRenderer });

const WIDTH = 32;
const BIRDS = WIDTH * WIDTH;
const BOUNDS = 800;
const BOUNDS_HALF = BOUNDS / 2;

export default function BirdSimulation() {
    const meshRef = useRef();
    const { gl } = useThree();
    const gpuComputeRef = useRef();
    const fragmentShaderPosition = `
    uniform float time;
			uniform float delta;

			void main()	{

				vec2 uv = gl_FragCoord.xy / resolution.xy;
				vec4 tmpPos = texture2D( texturePosition, uv );
				vec3 position = tmpPos.xyz;
				vec3 velocity = texture2D( textureVelocity, uv ).xyz;

				float phase = tmpPos.w;

				phase = mod( ( phase + delta +
					length( velocity.xz ) * delta * 3. +
					max( velocity.y, 0.0 ) * delta * 6. ), 62.83 );

				gl_FragColor = vec4( position + velocity * delta * 15. , phase );

			}
`;

const fragmentShaderVelocity = `
    uniform float time;
			uniform float testing;
			uniform float delta; // about 0.016
			uniform float separationDistance; // 20
			uniform float alignmentDistance; // 40
			uniform float cohesionDistance; //
			uniform float freedomFactor;
			uniform vec3 predator;

			const float width = resolution.x;
			const float height = resolution.y;

			const float PI = 3.141592653589793;
			const float PI_2 = PI * 2.0;
			// const float VISION = PI * 0.55;

			float zoneRadius = 40.0;
			float zoneRadiusSquared = 1600.0;

			float separationThresh = 0.45;
			float alignmentThresh = 0.65;

			const float UPPER_BOUNDS = BOUNDS;
			const float LOWER_BOUNDS = -UPPER_BOUNDS;

			const float SPEED_LIMIT = 9.0;

			float rand( vec2 co ){
				return fract( sin( dot( co.xy, vec2(12.9898,78.233) ) ) * 43758.5453 );
			}

			void main() {

				zoneRadius = separationDistance + alignmentDistance + cohesionDistance;
				separationThresh = separationDistance / zoneRadius;
				alignmentThresh = ( separationDistance + alignmentDistance ) / zoneRadius;
				zoneRadiusSquared = zoneRadius * zoneRadius;


				vec2 uv = gl_FragCoord.xy / resolution.xy;
				vec3 birdPosition, birdVelocity;

				vec3 selfPosition = texture2D( texturePosition, uv ).xyz;
				vec3 selfVelocity = texture2D( textureVelocity, uv ).xyz;

				float dist;
				vec3 dir; // direction
				float distSquared;

				float separationSquared = separationDistance * separationDistance;
				float cohesionSquared = cohesionDistance * cohesionDistance;

				float f;
				float percent;

				vec3 velocity = selfVelocity;

				float limit = SPEED_LIMIT;

				dir = predator * UPPER_BOUNDS - selfPosition;
				dir.z = 0.;
				// dir.z *= 0.6;
				dist = length( dir );
				distSquared = dist * dist;

				float preyRadius = 150.0;
				float preyRadiusSq = preyRadius * preyRadius;


				// move birds away from predator
				if ( dist < preyRadius ) {

					f = ( distSquared / preyRadiusSq - 1.0 ) * delta * 100.;
					velocity += normalize( dir ) * f;
					limit += 5.0;
				}


				// if (testing == 0.0) {}
				// if ( rand( uv + time ) < freedomFactor ) {}


				// Attract flocks to the center
				vec3 central = vec3( 0., 0., 0. );
				dir = selfPosition - central;
				dist = length( dir );

				dir.y *= 2.5;
				velocity -= normalize( dir ) * delta * 5.;

				for ( float y = 0.0; y < height; y++ ) {
					for ( float x = 0.0; x < width; x++ ) {

						vec2 ref = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
						birdPosition = texture2D( texturePosition, ref ).xyz;

						dir = birdPosition - selfPosition;
						dist = length( dir );

						if ( dist < 0.0001 ) continue;

						distSquared = dist * dist;

						if ( distSquared > zoneRadiusSquared ) continue;

						percent = distSquared / zoneRadiusSquared;

						if ( percent < separationThresh ) { // low

							// Separation - Move apart for comfort
							f = ( separationThresh / percent - 1.0 ) * delta;
							velocity -= normalize( dir ) * f;

						} else if ( percent < alignmentThresh ) { // high

							// Alignment - fly the same direction
							float threshDelta = alignmentThresh - separationThresh;
							float adjustedPercent = ( percent - separationThresh ) / threshDelta;

							birdVelocity = texture2D( textureVelocity, ref ).xyz;

							f = ( 0.5 - cos( adjustedPercent * PI_2 ) * 0.5 + 0.5 ) * delta;
							velocity += normalize( birdVelocity ) * f;

						} else {

							// Attraction / Cohesion - move closer
							float threshDelta = 1.0 - alignmentThresh;
							float adjustedPercent;
							if( threshDelta == 0. ) adjustedPercent = 1.;
							else adjustedPercent = ( percent - alignmentThresh ) / threshDelta;

							f = ( 0.5 - ( cos( adjustedPercent * PI_2 ) * -0.5 + 0.5 ) ) * delta;

							velocity += normalize( dir ) * f;

						}

					}

				}



				// this make tends to fly around than down or up
				// if (velocity.y > 0.) velocity.y *= (1. - 0.2 * delta);

				// Speed Limits
				if ( length( velocity ) > limit ) {
					velocity = normalize( velocity ) * limit;
				}

				gl_FragColor = vec4( velocity, 1.0 );

			}
`;

const birdVertexShader = `
   attribute vec2 reference;
			attribute float birdVertex;

			attribute vec3 birdColor;

			uniform sampler2D texturePosition;
			uniform sampler2D textureVelocity;

			varying vec4 vColor;
			varying float z;

			uniform float time;

			void main() {

				vec4 tmpPos = texture2D( texturePosition, reference );
				vec3 pos = tmpPos.xyz;
				vec3 velocity = normalize(texture2D( textureVelocity, reference ).xyz);

				vec3 newPosition = position;

				if ( birdVertex == 4.0 || birdVertex == 7.0 ) {
					// flap wings
					newPosition.y = sin( tmpPos.w ) * 5.;
				}

				newPosition = mat3( modelMatrix ) * newPosition;


				velocity.z *= -1.;
				float xz = length( velocity.xz );
				float xyz = 1.;
				float x = sqrt( 1. - velocity.y * velocity.y );

				float cosry = velocity.x / xz;
				float sinry = velocity.z / xz;

				float cosrz = x / xyz;
				float sinrz = velocity.y / xyz;

				mat3 maty =  mat3(
					cosry, 0, -sinry,
					0    , 1, 0     ,
					sinry, 0, cosry

				);

				mat3 matz =  mat3(
					cosrz , sinrz, 0,
					-sinrz, cosrz, 0,
					0     , 0    , 1
				);

				newPosition =  maty * matz * newPosition;
				newPosition += pos;

				z = newPosition.z;

				vColor = vec4( birdColor, 1.0 );
				gl_Position = projectionMatrix *  viewMatrix  * vec4( newPosition, 1.0 );
			}
`;

const birdFragmentShader = `
    varying vec4 vColor;
			varying float z;

			uniform vec3 color;

			void main() {
				// Fake colors for now
				float z2 = 0.2 + ( 1000. - z ) / 1000. * vColor.x;
				gl_FragColor = vec4( z2, z2, z2, 1. );

`;


    useEffect(() => {
        const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl);
        gpuComputeRef.current = gpuCompute;

        const dtPosition = gpuCompute.createTexture();
        const dtVelocity = gpuCompute.createTexture();
        fillTexture(dtPosition);
        fillTexture(dtVelocity);

        const velocityVariable = gpuCompute.addVariable(
            'textureVelocity',
            fragmentShaderVelocity,
            dtVelocity
        );
        const positionVariable = gpuCompute.addVariable(
            'texturePosition',
            fragmentShaderPosition,
            dtPosition
        );

        gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
        gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

        velocityVariable.material.uniforms = {
          time: { value: 0.0 },
          delta: { value: 0.0 },
          resolution: { value: new THREE.Vector2(WIDTH, WIDTH) }, // 修正
          BOUNDS: { value: BOUNDS }, // 修正
      };

      positionVariable.material.uniforms = {
          time: { value: 0.0 },
          delta: { value: 0.0 },
          resolution: { value: new THREE.Vector2(WIDTH, WIDTH) }, // 修正
      };

        gpuCompute.init();
    }, [gl]);

    useFrame(({ clock }) => {
      const gpuCompute = gpuComputeRef.current;
      if (!gpuCompute || !meshRef.current) return;

      gpuCompute.compute();

      meshRef.current.material.uniforms.texturePosition.value =
          gpuCompute.getCurrentRenderTarget(gpuCompute.variables[1]).texture;
      meshRef.current.material.uniforms.textureVelocity.value =
          gpuCompute.getCurrentRenderTarget(gpuCompute.variables[0]).texture;

      meshRef.current.material.uniforms.time.value = clock.getElapsedTime();
  });

    return (
      <mesh ref={meshRef} geometry={new BirdGeometry()}>
      <shaderMaterial
          uniforms={{
              color: { value: new THREE.Color(0xff2200) },
              texturePosition: { value: null },
              textureVelocity: { value: null },
              time: { value: 1.0 }
          }}
          vertexShader={birdVertexShader}
          fragmentShader={birdFragmentShader}
          side={THREE.DoubleSide}
      />
  </mesh>
    );
}

// **鳥のジオメトリ**
class BirdGeometry extends THREE.BufferGeometry {
    constructor() {
        super();

        const trianglesPerBird = 3;
        const triangles = BIRDS * trianglesPerBird;
        const points = triangles * 3;

        const vertices = new Float32Array(points * 3);
        const birdColors = new Float32Array(points * 3);
        const references = new Float32Array(points * 2);
        const birdVertex = new Float32Array(points);

        this.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        this.setAttribute('birdColor', new THREE.BufferAttribute(birdColors, 3));
        this.setAttribute('reference', new THREE.BufferAttribute(references, 2));
        this.setAttribute('birdVertex', new THREE.BufferAttribute(birdVertex, 1));

        let v = 0;

        function verts_push() {
            for (let i = 0; i < arguments.length; i++) {
                vertices[v++] = arguments[i];
            }
        }

        const wingsSpan = 20;

        for (let f = 0; f < BIRDS; f++) {
            verts_push(0, 0, -20, 0, 4, -20, 0, 0, 30);
            verts_push(0, 0, -15, -wingsSpan, 0, 0, 0, 0, 15);
            verts_push(0, 0, 15, wingsSpan, 0, 0, 0, 0, -15);
        }

        for (let v = 0; v < triangles * 3; v++) {
            const birdIndex = Math.floor(v / 9);
            const x = (birdIndex % WIDTH) / WIDTH;
            const y = Math.floor(birdIndex / WIDTH) / WIDTH;

            references[v * 2] = x;
            references[v * 2 + 1] = y;
            birdVertex[v] = v % 9;

            const c = new THREE.Color(0x666666 + Math.floor(v / 9) / BIRDS * 0x666666);
            birdColors[v * 3] = c.r;
            birdColors[v * 3 + 1] = c.g;
            birdColors[v * 3 + 2] = c.b;
        }

        this.scale(0.2, 0.2, 0.2);
    }
}

// **シェーダー**
// function birdVertexShader() {
//     return `
//         attribute vec3 birdColor;
//         varying vec4 vColor;
//         void main() {
//             vColor = vec4(birdColor, 1.0);
//             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//     `;
// }

// function birdFragmentShader() {
//     return `
//         varying vec4 vColor;
//         void main() {
//             gl_FragColor = vColor;
//         }
//     `;
// }

// function fragmentShaderPosition() {
//     return `
//         uniform float time;
//         void main() {
//             vec2 uv = gl_FragCoord.xy / resolution.xy;
//             gl_FragColor = vec4(uv, 0.0, 1.0);
//         }
//     `;
// }

// function fragmentShaderVelocity() {
//     return `
//         uniform float time;
//         void main() {
//             vec2 uv = gl_FragCoord.xy / resolution.xy;
//             gl_FragColor = vec4(uv, 0.0, 1.0);
//         }
//     `;
// }

// **初期値設定**
function fillTexture(texture) {
    const data = texture.image.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.random() * BOUNDS - BOUNDS_HALF;
        data[i + 1] = Math.random() * BOUNDS - BOUNDS_HALF;
        data[i + 2] = Math.random() * BOUNDS - BOUNDS_HALF;
        data[i + 3] = 1;
    }
}
