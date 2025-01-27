import React, { useState } from "react"
import useGame from "../manager/useGame"
import useClothStore from "../manager/useClothStore"
import { useEffect } from "react"
import { playSound } from "../manager/audioManager"

const ClothChangeUI = ({ onApply, onCancel }) => {
  const { selectedHat, selectedBag, selectedShoes, setHat, setBag, setShoes } = useClothStore();
  const resume = useGame((state) => state.resume)

  const changeHat = useClothStore((state) => state.changeHat);
  const changeBag = useClothStore((state) => state.changeBag);
  const changeShoes = useClothStore((state) => state.changeShoes);
  const [initialHat, setInitialHat] = useState(null);
  const [initialBag, setInitialBag] = useState(null);
  const [initialShoes, setInitialShoes] = useState(null);

  useEffect(() => {
    setInitialHat(selectedHat);
    setInitialBag(selectedBag);
    setInitialShoes(selectedShoes);
  }, [])

  const handleCancel = () => {
    // 元の装備に戻す
    setHat(initialHat);
    setBag(initialBag);
    setShoes(initialShoes);
    resume()
  }

  const handleApply = () => {
    // 現在選択中のアイテムを確定
    resume()
    // onApply(selectedHat, selectedBag, selectedShoes);
    
  };
  return (
    <div className="cloth-change-ui">
      {/* 頭部の左右ボタン */}
      <div className="arrow-container head">
        <button 
          className="arrow-button arrow-left" 
          onClick={() => {
            changeHat(-1)
            playSound("click1")
            }}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => {
          changeHat(1)
          playSound("click1")
          }}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 体の左右ボタン */}
      <div className="arrow-container body">
        <button className="arrow-button arrow-left" onClick={() => {
          changeBag(-1)
          playSound("click1")
          }}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => {
          changeBag(1)
          playSound("click1")
          }}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 足の左右ボタン */}
      <div className="arrow-container legs">
        <button className="arrow-button arrow-left" onClick={() => {
          changeShoes(-1)
          playSound("click1")
          }}>
          <div className="arrow-icon">←</div>
        </button>
        <button className="arrow-button arrow-right" onClick={() => {
          changeShoes(1)
          playSound("click1")
          }}>
          <div className="arrow-icon">→</div>
        </button>
      </div>

      {/* 下部に配置される操作ボタン */}
      <div className="bottom-controls">
        <button className="cancel-button" onClick={() => {
          handleCancel()
          playSound("click2")
        }}>❌</button>
        <button className="confirm-button" onClick={() => {
          handleApply()
          playSound("click2")
          }}>✅</button>
      </div>
    </div>
  )
}

export default ClothChangeUI
