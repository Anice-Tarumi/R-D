// サウンドオブジェクトの管理
const sounds = {
    click1: new Audio('./audio/click.mp3'),
    click2: new Audio('./audio/click2.mp3'),
    // click3: new Audio('./sounds/click3.mp3'),
    // hover1: new Audio('./sounds/hover1.mp3'),
    // success: new Audio('./sounds/success.mp3'),
    // error: new Audio('./sounds/error.mp3'),
  };
  
  // サウンドの初期設定（デフォルト音量、ループ設定など）
  Object.values(sounds).forEach((sound) => {
    sound.volume = 0.5; // デフォルト音量（0〜1）
    sound.loop = false; // ループはデフォルトでOFF
  });
  
  // サウンド再生関数
  export const playSound = (soundName) => {
    console.log("tatta")
    const sound = sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // 再生位置をリセット
      sound.play().catch((err) => console.error(`Failed to play sound "${soundName}":`, err));
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  };
  
  // サウンドを停止する関数
  export const stopSound = (soundName) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.pause();
      sound.currentTime = 0; // 停止後、再生位置をリセット
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  };
  
  // サウンドの一時停止関数
  export const pauseSound = (soundName) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.pause();
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  };
  
  // 全サウンドを停止する関数
  export const stopAllSounds = () => {
    Object.values(sounds).forEach((sound) => {
      sound.pause();
      sound.currentTime = 0;
    });
  };
  
  // サウンドの音量を個別に設定する関数
  export const setSoundVolume = (soundName, volume) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.volume = Math.max(0, Math.min(volume, 1)); // ボリュームを0〜1の範囲に制限
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  };
  
  // 全サウンドの音量を一括設定する関数
  export const setGlobalVolume = (volume) => {
    Object.values(sounds).forEach((sound) => {
      sound.volume = Math.max(0, Math.min(volume, 1));
    });
  };
  
  // サウンドをループ再生にするかどうかを設定
  export const setLoop = (soundName, shouldLoop) => {
    const sound = sounds[soundName];
    if (sound) {
      sound.loop = shouldLoop;
    } else {
      console.warn(`Sound "${soundName}" not found.`);
    }
  };
  
  // サウンドを追加する関数（動的追加が必要な場合）
  export const addSound = (soundName, soundPath) => {
    if (!sounds[soundName]) {
      sounds[soundName] = new Audio(soundPath);
      sounds[soundName].volume = 0.5; // デフォルト音量
      console.log(`Sound "${soundName}" added.`);
    } else {
      console.warn(`Sound "${soundName}" already exists.`);
    }
  };
  
  export default {
    playSound,
    stopSound,
    pauseSound,
    stopAllSounds,
    setSoundVolume,
    setGlobalVolume,
    setLoop,
    addSound,
  };
  