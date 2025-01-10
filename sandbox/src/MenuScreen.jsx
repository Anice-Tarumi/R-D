import React, { useEffect, useState } from "react"
import useGame from "./useGame"

const MenuScreen = () => {
  const resume = useGame((state) => state.resume)
  const phase = useGame((state) => state.phase)
  const [isVisible, setIsVisible] = useState(false) // 表示の切り替え
  const [isActive, setIsActive] = useState(false) // アニメーション制御

  useEffect(() => {
    if (phase === "menu") {
      setIsVisible(true) // メニューを表示
      setTimeout(() => setIsActive(true), 50) // アクティブクラスを遅延付与
    } else if (isVisible) { // 表示中であれば
      setIsActive(false) // アクティブクラスを削除
      setTimeout(() => setIsVisible(false), 700) // アニメーション終了後に非表示
    }
  }, [phase, isVisible])

  return (
    <div className={`menu-container ${isActive ? "active" : ""}`}
         style={{ display: isVisible ? "flex" : "none" }} // 完全非表示時にDOMを維持
    >
      <button className="close-button" onClick={resume}>
        ✖
      </button>
      <div className="menu-content">
        <h1 className="menu-title">メニュー画面</h1>
        <div className="menu-buttons">
          <button className="settings-button">設定</button>
        </div>
      </div>
    </div>
  )
}

export default MenuScreen
