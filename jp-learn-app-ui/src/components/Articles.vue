<template>
  <div class="container">
    <h1>日語短文練習</h1>

    <div class="layout">
      <div class="sidebar">
        <div class="category-filter">
          <label>主題：</label>
          <select v-model="selectedTheme" @change="generateArticle">
            <option value="daily">日常對話</option>
            <option value="greetings">問候與社交</option>
            <option value="dining">用餐場合</option>
            <option value="work">工作場合</option>
          </select>
        </div>

        <div class="articles-list">
          <h3>已生成短文</h3>
          <div class="list-container">
            <div 
              v-for="(article, index) in generatedArticles" 
              :key="index"
              :class="['article-item', { active: currentArticle === article }]"
              @click="selectArticle(article)"
            >
              <div class="article-preview">
                <div class="theme-tag">{{ getThemeLabel(article.theme) }}</div>
                <div class="preview-text">{{ article.japanese.slice(0, 50) }}...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="article-card" v-if="currentArticle">
          <div class="card-header">
            <div class="theme-tag large">{{ getThemeLabel(currentArticle.theme) }}</div>
            <button 
              class="like-btn"
              :class="{ liked: isLiked(currentArticle) }"
              @click="toggleLike(currentArticle)"
            >
              {{ isLiked(currentArticle) ? '❤️ 已收藏' : '🤍 收藏' }}
            </button>
          </div>

          <div class="article-content">
            <div class="japanese-section">
              <h3>日文</h3>
              <div 
                class="japanese" 
                :class="{ 'speaking': isPlaying }"
                v-html="formatArticleText(currentArticle.japanese, 'japanese')"
              ></div>
            </div>

            <div class="chinese-section">
              <h3>中文</h3>
              <div 
                class="chinese"
                v-html="formatArticleText(currentArticle.chinese, 'chinese')"
              ></div>
            </div>
          </div>

          <div class="controls">
            <button @click="playAudio" :disabled="isPlaying">
              <span v-if="!isPlaying">🔊 播放全文</span>
              <span v-else>播放中...</span>
            </button>
            
            <button @click="startListening" :disabled="isListening">
              <span v-if="!isListening">🎤 朗讀練習</span>
              <span v-else>聆聽中...</span>
            </button>
            
            <button @click="generateArticle">↻ 重新生成</button>
          </div>

          <div class="feedback" :class="feedbackType" v-if="feedback">
            {{ feedback }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sentencesData from '../assets/sentences.json'

export default {
  name: 'ArticlesView',
  data() {
    return {
      sentences: sentencesData.sentences,
      categories: sentencesData.categories,
      selectedTheme: 'daily',
      currentArticle: null,
      generatedArticles: [],
      isPlaying: false,
      isListening: false,
      feedback: '',
      feedbackType: '',
      recognition: null,
      synthesis: window.speechSynthesis
    }
  },
  methods: {
    getThemeLabel(theme) {
      const labels = {
        daily: '日常對話',
        greetings: '問候與社交',
        dining: '用餐場合',
        work: '工作場合'
      }
      return labels[theme] || theme
    },
    generateArticle() {
      // Get sentences related to the theme
      let relevantSentences = this.sentences.filter(s => {
        switch (this.selectedTheme) {
          case 'daily':
            return ['daily', 'greetings'].includes(s.category)
          case 'greetings':
            return ['greetings', 'formal'].includes(s.category)
          case 'dining':
            return ['dining'].includes(s.category)
          case 'work':
            return ['work', 'formal'].includes(s.category)
          default:
            return true
        }
      })

      // Randomly select 3-5 sentences
      const count = Math.floor(Math.random() * 3) + 3
      const selectedSentences = []
      while (selectedSentences.length < count && relevantSentences.length > 0) {
        const index = Math.floor(Math.random() * relevantSentences.length)
        selectedSentences.push(relevantSentences[index])
        relevantSentences.splice(index, 1)
      }

      // Create article
      const article = {
        theme: this.selectedTheme,
        japanese: selectedSentences.map(s => s.japanese).join('。\n'),
        chinese: selectedSentences.map(s => s.chinese).join('。\n'),
        timestamp: Date.now()
      }

      // Add to generated articles
      this.generatedArticles.unshift(article)
      // Keep only last 10 articles
      if (this.generatedArticles.length > 10) {
        this.generatedArticles.pop()
      }

      this.currentArticle = article
      this.feedback = ''
    },
    formatArticleText(text, type) {
      return text.split('\n').map(line => {
        const className = type === 'japanese' ? 'japanese-line' : 'chinese-line'
        return `<div class="${className}">${line}。</div>`
      }).join('')
    },
    selectArticle(article) {
      this.currentArticle = article
      this.feedback = ''
    },
    isLiked(article) {
      const likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]')
      return likedArticles.some(a => a.timestamp === article.timestamp)
    },
    toggleLike(article) {
      let likedArticles = JSON.parse(localStorage.getItem('likedArticles') || '[]')
      if (this.isLiked(article)) {
        likedArticles = likedArticles.filter(a => a.timestamp !== article.timestamp)
      } else {
        likedArticles.push(article)
      }
      localStorage.setItem('likedArticles', JSON.stringify(likedArticles))
      this.$forceUpdate()
    },
    playAudio() {
      if (this.synthesis.speaking) {
        this.synthesis.cancel()
      }

      this.isPlaying = true
      const utterance = new SpeechSynthesisUtterance(this.currentArticle.japanese)
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
      // Simplified comparison - can be enhanced with more sophisticated matching
      const normalizedSpoken = spokenText.toLowerCase().replace(/[。、]/g, '')
      const normalizedExpected = this.currentArticle.japanese.toLowerCase().replace(/[。、]/g, '')
      
      if (normalizedSpoken === normalizedExpected) {
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

    // Generate initial article
    this.generateArticle()
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

/* Responsive layout */
@media (max-width: 1024px) {
  .layout {
    grid-template-columns: 250px 1fr;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: 2;
  }

  .main-content {
    order: 1;
  }

  .container {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }

  .japanese-line {
    font-size: 1.3em;
  }

  .chinese-line {
    font-size: 1.1em;
  }

  .controls {
    flex-wrap: wrap;
  }

  button {
    width: 100%;
    margin-bottom: 10px;
  }
}

.sidebar {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

.articles-list {
  margin-top: 20px;
}

.articles-list h3 {
  margin-bottom: 15px;
  color: #2c3e50;
}

.list-container {
  max-height: 600px;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .list-container {
    max-height: 300px;
  }
}

.article-item {
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.article-item:hover {
  background-color: #f5f5f5;
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .article-item:hover {
    transform: none;
  }
}

.article-item.active {
  background-color: #e8f5e9;
  border-color: #4CAF50;
}

.theme-tag {
  display: inline-block;
  padding: 4px 8px;
  background-color: #e8f5e9;
  color: #4CAF50;
  border-radius: 4px;
  font-size: 0.9em;
  margin-bottom: 8px;
}

.theme-tag.large {
  font-size: 1em;
  padding: 6px 12px;
}

.preview-text {
  color: #666;
  font-size: 0.9em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: stretch;
  }

  .like-btn {
    width: 100%;
    text-align: center;
  }
}

.article-content {
  margin-bottom: 20px;
}

.japanese-section, .chinese-section {
  margin-bottom: 20px;
}

.japanese-section h3, .chinese-section h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.japanese-line {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 10px;
  line-height: 1.5;
}

.chinese-line {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 10px;
  line-height: 1.5;
}

.japanese.speaking .japanese-line {
  color: #4CAF50;
  text-shadow: 0 0 5px rgba(76, 175, 80, 0.2);
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
  transition: all 0.3s ease;
  white-space: nowrap;
}

button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}

.like-btn {
  background: none;
  border: 1px solid #4CAF50;
  color: #4CAF50;
  padding: 8px 16px;
  border-radius: 20px;
}

.like-btn:hover {
  background-color: rgba(76, 175, 80, 0.1);
}

.like-btn.liked {
  background-color: #4CAF50;
  color: white;
}

.feedback {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
}

.success {
  background-color: #dff0d8;
  color: #3c763d;
}

.error {
  background-color: #f2dede;
  color: #a94442;
}

.category-filter {
  margin-bottom: 20px;
}

.category-filter select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 1em;
  margin-top: 5px;
}

/* Touch device optimizations */
@media (hover: none) {
  .article-item:hover {
    transform: none;
  }

  button:hover {
    transform: none;
  }

  .article-item {
    padding: 20px 15px;
  }

  button {
    padding: 15px 20px;
  }
}

/* Scrollbar styling */
.list-container::-webkit-scrollbar {
  width: 8px;
}

.list-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.list-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.list-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style> 