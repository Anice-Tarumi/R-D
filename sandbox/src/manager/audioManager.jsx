// サウンドオブジェクトの管理
const sounds = {
    click1: new Audio('./audio/click.mp3'),
    click2: new Audio('./audio/click2.mp3'),
    // click3: new Audio('./sounds/click3.mp3'),
    // hover1: new Audio('./sounds/hover1.mp3'),
    // success: new Audio('./sounds/success.mp3'),
    // error: new Audio('./sounds/error.mp3'),
  }
  
  // サウンドの初期設定（デフォルト音量、ループ設定など）
  Object.values(sounds).forEach((sound) => {
    sound.volume = 0.5 
    sound.loop = false 
  })
  
  // サウンド再生関数
  export const playSound = (soundName) => {
    // console.log("tatta")
    const sound = sounds[soundName]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch((err) => console.error(`Failed to play sound "${soundName}":`, err))
    } else {
      console.warn(`Sound "${soundName}" not found.`)
    }
  }
  
  // サウンドを停止する関数
  export const stopSound = (soundName) => {
    const sound = sounds[soundName]
    if (sound) {
      sound.pause()
      sound.currentTime = 0
    } else {
      console.warn(`Sound "${soundName}" not found.`)
    }
  }
  
  // サウンドの一時停止関数
  export const pauseSound = (soundName) => {
    const sound = sounds[soundName]
    if (sound) {
      sound.pause()
    } else {
      console.warn(`Sound "${soundName}" not found.`)
    }
  }
  
  export const stopAllSounds = () => {
    Object.values(sounds).forEach((sound) => {
      sound.pause()
      sound.currentTime = 0
    })
  }
  
  export const setSoundVolume = (soundName, volume) => {
    const sound = sounds[soundName]
    if (sound) {
      sound.volume = Math.max(0, Math.min(volume, 1)) 
    } else {
      console.warn(`Sound "${soundName}" not found.`)
    }
  }
  
  export const setGlobalVolume = (volume) => {
    Object.values(sounds).forEach((sound) => {
      sound.volume = Math.max(0, Math.min(volume, 1))
    })
  }
  
  // export const setLoop = (soundName, shouldLoop) => {
  //   const sound = sounds[soundName]
  //   if (sound) {
  //     sound.loop = shouldLoop
  //   } else {
  //     console.warn(`Sound "${soundName}" not found.`)
  //   }
  // }
  
  // export const addSound = (soundName, soundPath) => {
  //   if (!sounds[soundName]) {
  //     sounds[soundName] = new Audio(soundPath)
  //     sounds[soundName].volume = 0.5
  //     console.log(`Sound "${soundName}" added.`)
  //   } else {
  //     console.warn(`Sound "${soundName}" already exists.`)
  //   }
  // }
  
  export default {
    playSound,
    stopSound,
    pauseSound,
    stopAllSounds,
    setSoundVolume,
    setGlobalVolume,
    // setLoop,
    // addSound,
  }
  