// import chestData from './chestData.jsx'; // 宝箱データをインポート
// import React, { forwardRef, useRef } from 'react';
// import Chest from './Chest.jsx';
// import { CuboidCollider, RigidBody } from '@react-three/rapier';

// const ChestGroup = forwardRef((props, ref) => {
//   const chestRefs = useRef({}); // 全ての宝箱の参照を管理する
//     // console.log("opensitekure:",chestRefs)
//   return (
//     <>
//       {chestData.map((chest) => {
//         // refを動的に作成
//         if (!chestRefs.current[chest.id]) {
//           chestRefs.current[chest.id] = React.createRef();
//         }

//         return (
//             <RigidBody
//                 key={chest.id}
//                 colliders={false}
//                 type="kinematicPosition"
//                 >
//                 <Chest
//                     id={chest.id}
//                     modelPath={chest.modelPath}
//                     position={chest.position}
//                     rotation={chest.rotation}
//                     ref={chestRefs}
//                 />
//                 <CuboidCollider
//                     args={chest.colliderArgs}
//                     position={ chest.colliderPosition}
//                 />
//             </RigidBody>
//         //   <Chest
//         //     key={chest.id}
//         //     ref={chestRefs.current[chest.id]} // 対応するrefを渡す
//         //     position={chest.position}
//         //     rotation={chest.rotation}
//         //   />
//         );
//       })}
//     </>
//   );
// });

// export default ChestGroup;
