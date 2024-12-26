import React, { useEffect, useState } from "react";
import { useProgress, Html } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import useGame from "./useGame";

const AddLoadingScreen = ({ resourceUrl, onComplete }) => {
  const { progress } = useProgress()
//   const resource = useLoader(GLTFLoader,resourceUrl)
  const [resource, setResource] = useState(null);
  const [spinnerSize, setSpinnerSize] = useState(50); // スピナーの初期サイズ
  const [barColor, setBarColor] = useState("#ff9900"); // ローディングバーの初期色
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true)
  const [animationClass, setAnimationClass] = useState("add-loading-fade-in")
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      resourceUrl,
      (gltf) => {
        setResource(gltf); // ロード完了時にリソースを保存
      },
      undefined,
      (error) => console.error("Error loading resource:", error)
    );
  }, [resourceUrl]);

  useEffect(() => {
    if (progress === 100 && resource && !isComplete) {
      const elapsedTime = Date.now() - startTime; // 経過時間を計算
      const delay = Math.max(3000 - elapsedTime, 0); // 最低3秒の遅延を計算

      setTimeout(() => {
        setAnimationClass("add-loading-fade-out");
        setTimeout(() => {
          setIsVisible(false);
          if (typeof onComplete === "function") {
            onComplete(resource);
          }
        }, 500); // フェードアウト時間に合わせる
      }, delay);

      setIsComplete(true);
    }
  }, [progress, resource, onComplete, isComplete, startTime]);

  const changeSpinnerSize = () => {
    const newSize = Math.random() * 50 + 50; // ランダムな大きさ (50px～100px)
    setSpinnerSize(newSize);
  };

  const changeBarColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16); // ランダムな色
    setBarColor(randomColor);
  };
  if(!isVisible) return null

  return (
    <div className={`add-loading-screen ${animationClass}`}>
      <h1>Loading...</h1>
      <div
        className="add-loading-animation"
        onClick={changeSpinnerSize}
        style={{
          width: spinnerSize + "px",
          height: spinnerSize + "px",
          borderTopColor: barColor,
        }}
      >
      </div>
      <div className="add-progress-bar" onClick={changeBarColor}>
        <div
          className="add-progress"
          style={{ background: barColor, width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default AddLoadingScreen;
