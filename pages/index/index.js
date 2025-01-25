Component({
  data: {
    score: 0,
    currentMole: -1,
    isPlaying: false,
    highScore: 0,
    isMuted: false
  },

  methods: {
    startGame() {
      if (this.data.isPlaying) return;
      
      const app = getApp();
      app.playBackgroundMusic();
      
      if (!this.data.isMuted) {
        const audio = wx.createInnerAudioContext();
        audio.src = '/audio/start.mp3';
        audio.play();
      }
      
      this.setData({
        score: 0,
        isPlaying: true
      });

      this.showMoleRandomly();
    },

    showMoleRandomly() {
      if (!this.data.isPlaying) return;

      const randomIndex = Math.floor(Math.random() * 9);
      this.setData({
        currentMole: randomIndex
      });

      const randomDuration = 800 + Math.random() * 700;

      setTimeout(() => {
        if (this.data.isPlaying) {
          this.setData({
            currentMole: -1
          });
          setTimeout(() => {
            this.showMoleRandomly();
          }, 300 + Math.random() * 400);
        }
      }, randomDuration);
    },

    tapMole(event) {
      if (!this.data.isPlaying) return;
      
      const tappedIndex = event.currentTarget.dataset.index;
      if (tappedIndex === this.data.currentMole) {
        if (!this.data.isMuted) {
          const hitAudio = wx.createInnerAudioContext();
          hitAudio.src = '/audio/hit.mp3';
          hitAudio.play();
        }

        const newScore = this.data.score + 1;
        this.setData({
          score: newScore,
          currentMole: -1,
          highScore: Math.max(newScore, this.data.highScore)
        });
      }
    },

    toggleSound() {
      const app = getApp();
      this.setData({
        isMuted: !this.data.isMuted
      }, () => {
        if (this.data.isMuted) {
          app.pauseBackgroundMusic();
        } else if (this.data.isPlaying) {
          app.playBackgroundMusic();
        }
      });
    },

    checkAudioFiles() {
      const audioFiles = [
        '/audio/bgm.mp3',
        '/audio/start.mp3',
        '/audio/hit.mp3'
      ];
      
      audioFiles.forEach(path => {
        const audio = wx.createInnerAudioContext();
        audio.src = path;
        audio.onError((res) => {
          console.error(`音频文件 ${path} 加载失败:`, res);
          wx.showToast({
            title: '音频资源加载失败',
            icon: 'none'
          });
        });
      });
    }
  },

  lifetimes: {
    attached() {
      const highScore = wx.getStorageSync('highScore') || 0;
      this.setData({ highScore });
      
      // 检查音频文件
      this.checkAudioFiles();
    },
    
    detached() {
      const app = getApp();
      app.pauseBackgroundMusic();
      
      this.setData({
        isPlaying: false
      });
      wx.setStorageSync('highScore', this.data.highScore);
    }
  }
});