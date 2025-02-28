import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Html } from '@react-three/drei';
import GameStateManager from '../manager/GameStateManager';
import useGame from '../manager/useGame';

const Indicator = ({ targetRef, text = '', color = 'white', textColor = 'black', baseScale = 0.2, activeScale = 1, isActive = false, heightOffset = 2, animationSpeed = 2 }) => {
  const indicatorRef = useRef();
  const textRef = useRef();
  const timelineRef = useRef(gsap.timeline({ paused: true }));
  const phase = useGame((state) => state.phase)

  useEffect(() => {
    if (!indicatorRef.current || !textRef.current) return;

    timelineRef.current.clear();

    timelineRef.current.to(indicatorRef.current, {
      scale: isActive ? activeScale : baseScale,
      duration: 0.4, // ゆっくり変化
      ease: 'power3.out', // なめらかに
    });

    timelineRef.current.to(indicatorRef.current, {
      scale: isActive ? activeScale * 1.1 : baseScale, // 近づいたら少し膨らむ
      duration: 0.2,
      ease: 'power3.out',
      yoyo: true, // 戻る
      repeat: 1, // 1回だけバウンス
    });

    timelineRef.current.to(textRef.current, {
      opacity: isActive ? 1 : 0,
      duration: 0.2, // ちょっと遅れてフェードイン
    }, '<'); // 同時に動作

    timelineRef.current.play();
  }, [isActive]);

  return (
    <Html position={[0, heightOffset, 0]} center>
      {phase === "playing" && <div
      ref={indicatorRef}
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          color: 'black',
          padding: '5px 10px',
          borderRadius: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          transform: `scale(${baseScale})`, // 初期状態は小さい
        }}
      >
        <span ref={textRef} style={{ opacity: 0 }}>{text}</span>
      </div>
    }
    </Html>
    // <group ref={indicatorRef} position={[0, heightOffset, 0]}>
    //   <mesh>
    //     <sphereGeometry args={[0.5, 32, 32]} />
    //     <meshStandardMaterial color={color} transparent opacity={0.9} />
    //   </mesh>
    //   {isActive && (
    //     <Text
    //       position={[0, 0, 0.51]}
    //       fontSize={0.5}
    //       color={textColor}
    //       anchorX="center"
    //       anchorY="middle"
    //     >
    //       {text}
    //     </Text>
    //   )}
    // </group>
  );
};

export default Indicator;
