import React, { Suspense, useRef } from "react"
import Loader from "../ui/Loader.jsx" // ローディング画面
import useGame from "./useGame.jsx"
import useDialogueStore from "./useDialogueStore.jsx"
import AddLoadingScreen from "../ui/AddLoadingScreen.jsx"
import ClothChangeButton from "../ui/ClothChangeButton.jsx"
import ClothChangeUI from "../ui/ClothChangeUI.jsx"
import useAudioStore from "./useAudioStore.jsx"
import AudioButton from "../sounds/AudioButton.jsx"
import { useCallback } from "react"

// メニューボタンのデザインとアニメーション
const MenuButton = () => {
  const menu = useGame((state) => state.menu)
  return (<>
  <div>
    <button className="menu-button" 
            onClick={() => {
              menu() // 状態をmenuに切り替え
            }}>
      <span className="line"></span>
      <span className="line middle"></span>
      <span className="line"></span>
    </button>
    </div>
    </>
  )
}
const GameStateManager = () => {
  const phase = useGame((state) => state.phase)
  const title = useGame((state) => state.title)
  const start = useGame((state) => state.start)
  const endTalking = useGame((state) => state.endTalking) // 会話終了処理
  const endDialogue = useDialogueStore((state) => state.endDialogue) // 会話をリセット
  const addLoadingComp = useGame((state) => state.addLoadingComp)
  const startChanging = useGame((state) => state.startChanging)
  const resume = useGame((state) => state.resume)
  const characterControllerRef = useRef()
  const playBGM = useAudioStore((state) => state.playBGM)

  const talkEnd = useCallback(() => {
    endTalking();
    endDialogue();
  }, [endTalking, endDialogue]);

  const renderState = () => {
    switch (phase) {
      case 'loading':
        return <Loader />
      case "title":
        // return <Loader />
      case "transition":
        return (<></>)
      case 'playing':
        return (
          <>
            <MenuButton />
            <ClothChangeButton />
            <AudioButton/>
            {/* <MinimapButton/> */}
          </>
        )
        case 'menu': // 追加
      return (
      <></>
      )
      case 'map': // 追加
      return (
      <>
      {/* <MiniMap mapImage="./images/map.png"/> */}
      </>
      )
      case 'talking':
        return (
          <>
          <div className="end-conversation-button">
            <button onClick={talkEnd}>中断</button>
          </div>
          </>
        )
      case 'addloading':
        return (
          <>
            <Suspense fallback={<div>Loading...</div>}>
        <AddLoadingScreen
          resourceUrl="map/Theatre.glb"
          onComplete={addLoadingComp}
        />
      </Suspense>
          </>
        )
        case "changing":
          return (
            <>
              <ClothChangeUI/>
            </>
          )
      default:
      return null
    }
  }

  return <>{renderState()}</>
}

export default GameStateManager
