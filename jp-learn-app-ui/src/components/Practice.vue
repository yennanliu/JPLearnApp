<template>
  <div class="container">
    <h1>日語練習</h1>
    
    <div class="category-filter">
      <label>分類：</label>
      <select v-model="selectedCategory">
        <option value="">所有分類</option>
        <option v-for="(name, key) in categories" :key="key" :value="key">
          {{ name }}
        </option>
      </select>
    </div>

    <div class="sentence-card">
      <div class="japanese" :class="{ 'speaking': isPlaying }">
        {{ currentSentence.japanese }}
        <span class="speaking-indicator" v-if="isPlaying">🔊</span>
      </div>
      <div class="chinese">{{ currentSentence.chinese }}</div>
      <div class="category-tag">{{ categories[currentSentence.category] }}</div>
      
      <div class="controls">
        <button @click="playAudio" :disabled="isPlaying">
          <span v-if="!isPlaying">🔊 播放</span>
          <span v-else>播放中...</span>
        </button>
        
        <button @click="startListening" :disabled="isListening">
          <span v-if="!isListening">🎤 說說看</span>
          <span v-else>聆聽中...</span>
        </button>
        
        <button @click="getNewSentence">↻ 下一句</button>
      </div>
      
      <div class="feedback" :class="feedbackType" v-if="feedback">
        {{ feedback }}
      </div>
    </div>
  </div>
</template>

<script>
import sentencesData from '../assets/sentences.json'

export default {
  name: 'PracticeView',
  data() {
    return {
      sentences: sentencesData.sentences,
      categories: sentencesData.categories,
      currentSentence: null,
      selectedCategory: '',
      isPlaying: false,
      isListening: false,
      feedback: '',
      feedbackType: '',
      recognition: null,
      synthesis: window.speechSynthesis
    }
  },
  computed: {
    filteredSentences() {
      if (!this.selectedCategory) return this.sentences
      return this.sentences.filter(s => s.category === this.selectedCategory)
    }
  },
  methods: {
    getNewSentence() {
      const sentences = this.filteredSentences
      const randomIndex = Math.floor(Math.random() * sentences.length)
      this.currentSentence = sentences[randomIndex]
      this.feedback = ''
    },
    playAudio() {
      if (this.synthesis.speaking) {
        this.synthesis.cancel()
      }

      this.isPlaying = true
      const utterance = new SpeechSynthesisUtterance(this.currentSentence.japanese)
      utterance.lang = 'ja-JP'
      
      utterance.onend = () => {
        this.isPlaying = false
      }

      this.synthesis.speak(utterance)
    },
    startListening() {
      if (!this.recognition) {
        this.feedback = '您的瀏覽器不支援語音識別功能'
        this.feedbackType = 'error'
        return
      }

      this.feedback = ''
      this.isListening = true
      this.recognition.start()
    },
    checkPronunciation(spokenText) {
      if (spokenText.toLowerCase() === this.currentSentence.japanese.toLowerCase()) {
        this.feedback = '素晴らしい！太棒了！發音正確！'
        this.feedbackType = 'success'
      } else {
        this.feedback = '再試一次！繼續練習！'
        this.feedbackType = 'error'
      }
    }
  },
  created() {
    // Initialize speech recognition if supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition()
      this.recognition.lang = 'ja-JP'
      this.recognition.continuous = false
      this.recognition.interimResults = false

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript
        this.checkPronunciation(result)
      }

      this.recognition.onend = () => {
        this.isListening = false
      }
    }

    // Get initial sentence
    this.getNewSentence()
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
}

.category-filter {
  margin-bottom: 20px;
  text-align: center;
}

.category-filter select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  margin-left: 10px;
}

.sentence-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.japanese {
  font-size: 2em;
  margin-bottom: 10px;
  color: #2c3e50;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.japanese.speaking {
  color: #4CAF50;
  text-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
}

.speaking-indicator {
  animation: pulse 1s infinite;
  font-size: 0.8em;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

.chinese {
  font-size: 1.5em;
  color: #666;
  margin-bottom: 10px;
}

.category-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #e8f5e9;
  color: #4CAF50;
  border-radius: 4px;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.feedback {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}
</style> 