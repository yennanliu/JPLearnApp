<template>
  <div class="container">
    <div class="header">
      <h1>收藏句子</h1>
      <router-link to="/practice" class="practice-link">
        返回練習 →
      </router-link>
    </div>

    <div class="stats">
      已收藏 {{ likedSentences.length }} 個句子
    </div>

    <div class="liked-sentences" v-if="likedSentences.length > 0">
      <div v-for="(sentence, index) in likedSentences" 
           :key="index" 
           class="sentence-card">
        <div class="sentence-content">
          <div class="japanese">{{ sentence.japanese }}</div>
          <div class="chinese">{{ sentence.chinese }}</div>
          <div class="category">{{ categories[sentence.category] }}</div>
        </div>
        
        <div class="actions">
          <button class="action-btn play" @click="playAudio(sentence)" :disabled="isPlaying === sentence.japanese">
            {{ isPlaying === sentence.japanese ? '播放中...' : '🔊 播放' }}
          </button>
          <button class="action-btn unlike" @click="unlikeSentence(sentence)">
            ❌ 取消收藏
          </button>
          <button class="action-btn practice" @click="goToPractice(sentence)">
            ✏️ 練習
          </button>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <div class="empty-message">
        還沒有收藏的句子
      </div>
      <router-link to="/practice" class="start-practice-btn">
        開始收藏句子
      </router-link>
    </div>
  </div>
</template>

<script>
import sentencesData from '../assets/sentences.json'

export default {
  name: 'LikedSentencesView',
  data() {
    return {
      sentences: sentencesData.sentences,
      categories: sentencesData.categories,
      isPlaying: null,
      synthesis: window.speechSynthesis
    }
  },
  computed: {
    likedSentences() {
      const likedSet = new Set(JSON.parse(localStorage.getItem('likedSentences') || '[]'))
      return this.sentences.filter(s => likedSet.has(s.japanese))
    }
  },
  methods: {
    playAudio(sentence) {
      if (this.synthesis.speaking) {
        this.synthesis.cancel()
      }

      this.isPlaying = sentence.japanese
      const utterance = new SpeechSynthesisUtterance(sentence.japanese)
      utterance.lang = 'ja-JP'
      
      utterance.onend = () => {
        this.isPlaying = null
      }

      this.synthesis.speak(utterance)
    },
    unlikeSentence(sentence) {
      const likedSet = new Set(JSON.parse(localStorage.getItem('likedSentences') || '[]'))
      likedSet.delete(sentence.japanese)
      localStorage.setItem('likedSentences', JSON.stringify([...likedSet]))
      // Force update
      this.$forceUpdate()
    },
    goToPractice(sentence) {
      this.$router.push({
        path: '/practice',
        query: { sentence: sentence.japanese }
      })
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.practice-link {
  color: #4CAF50;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 20px;
  border: 1px solid #4CAF50;
  transition: all 0.3s ease;
}

.practice-link:hover {
  background-color: #4CAF50;
  color: white;
}

.stats {
  background-color: #e8f5e9;
  color: #2c3e50;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 1.1em;
}

.liked-sentences {
  display: grid;
  gap: 20px;
}

.sentence-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.sentence-content {
  margin-bottom: 15px;
}

.japanese {
  font-size: 1.5em;
  color: #2c3e50;
  margin-bottom: 8px;
}

.chinese {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 8px;
}

.category {
  display: inline-block;
  padding: 4px 8px;
  background-color: #e8f5e9;
  color: #4CAF50;
  border-radius: 4px;
  font-size: 0.9em;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9em;
  transition: all 0.3s ease;
  border: none;
}

.action-btn.play {
  background-color: #4CAF50;
  color: white;
}

.action-btn.play:hover {
  background-color: #45a049;
}

.action-btn.play:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.action-btn.unlike {
  background-color: #ff5252;
  color: white;
}

.action-btn.unlike:hover {
  background-color: #ff1744;
}

.action-btn.practice {
  background-color: #2196F3;
  color: white;
}

.action-btn.practice:hover {
  background-color: #1976D2;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.empty-message {
  font-size: 1.2em;
  color: #666;
  margin-bottom: 20px;
}

.start-practice-btn {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.1em;
  transition: all 0.3s ease;
}

.start-practice-btn:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style> 