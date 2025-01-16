App({
  globalData: {
    backgroundAudio: null
  },

  onLaunch() {
    // 创建背景音乐实例
    this.globalData.backgroundAudio = wx.createInnerAudioContext();
    this.globalData.backgroundAudio.src = '/audio/background.mp3'; // 添加您的背景音乐文件
    this.globalData.backgroundAudio.loop = true; // 循环播放
  },

  // 播放背景音乐
  playBackgroundMusic() {
    if (this.globalData.backgroundAudio) {
      this.globalData.backgroundAudio.play();
    }
  },

  // 暂停背景音乐
  pauseBackgroundMusic() {
    if (this.globalData.backgroundAudio) {
      this.globalData.backgroundAudio.pause();
    }
  }
}) 