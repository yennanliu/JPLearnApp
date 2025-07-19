<template>
  <div class="container">
    <h1>Japanese Learning App</h1>
    
    <div class="sentence-card">
      <div class="japanese">{{ currentSentence.japanese }}</div>
      <div class="chinese">{{ currentSentence.chinese }}</div>
      
      <div class="controls">
        <button @click="playAudio" :disabled="isPlaying">
          <span v-if="!isPlaying">🔊 Play</span>
          <span v-else>Playing...</span>
        </button>
        
        <button @click="startListening" :disabled="isListening">
          <span v-if="!isListening">🎤 Speak</span>
          <span v-else>Listening...</span>
        </button>
        
        <button @click="getNewSentence">↻ Next Sentence</button>
      </div>
      
      <div class="feedback" :class="feedbackType" v-if="feedback">
        {{ feedback }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // Sample sentences data
      sentences: [
        { japanese: 'おはようございます', chinese: '早安' },
        { japanese: 'こんにちは', chinese: '你好' },
        { japanese: 'ありがとうございます', chinese: '謝謝' },
        { japanese: 'いただきます', chinese: '我開動了' },
        { japanese: 'お元気ですか', chinese: '你好嗎' },
        { japanese: 'さようなら', chinese: '再見' },
        { japanese: 'お疲れ様です', chinese: '辛苦了' },
        { japanese: 'すみません', chinese: '對不起' },
        { japanese: 'よろしくお願いします', chinese: '請多指教' },
        { japanese: 'おやすみなさい', chinese: '晚安' }
      ],
      currentSentence: null,
      isPlaying: false,
      isListening: false,
      feedback: '',
      feedbackType: '',
      recognition: null,
      synthesis: window.speechSynthesis
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
  },
  methods: {
    getNewSentence() {
      const randomIndex = Math.floor(Math.random() * this.sentences.length)
      this.currentSentence = this.sentences[randomIndex]
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
        this.feedback = 'Speech recognition is not supported in your browser'
        this.feedbackType = 'error'
        return
      }

      this.feedback = ''
      this.isListening = true
      this.recognition.start()
    },
    checkPronunciation(spokenText) {
      // Simple string comparison (can be enhanced with more sophisticated matching)
      if (spokenText.toLowerCase() === this.currentSentence.japanese.toLowerCase()) {
        this.feedback = '素晴らしい！ (Wonderful!) Correct pronunciation!'
        this.feedbackType = 'success'
      } else {
        this.feedback = 'Try again! Keep practicing!'
        this.feedbackType = 'error'
      }
    }
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
}

.chinese {
  font-size: 1.5em;
  color: #666;
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
