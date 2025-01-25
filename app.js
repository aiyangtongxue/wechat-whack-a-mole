App({
  bgm: null,

  onLaunch() {
    // 初始化背景音乐
    this.bgm = wx.createInnerAudioContext();
    this.bgm.src = '/audio/bgm.mp3';
    this.bgm.loop = true;
  },

  playBackgroundMusic() {
    if (this.bgm) {
      this.bgm.play();
    }
  },

  pauseBackgroundMusic() {
    if (this.bgm) {
      this.bgm.pause();
    }
  }
}) 