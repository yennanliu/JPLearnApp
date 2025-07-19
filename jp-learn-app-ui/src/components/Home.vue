<template>
  <div class="home">
    <h1>歡迎來到日語學習 App</h1>
    <div class="features">
      <div class="feature-card">
        <h2>🎯 學習目標</h2>
        <ul>
          <li>掌握日常會話常用句型</li>
          <li>提升日語發音準確度</li>
          <li>增進中日文對照理解</li>
        </ul>
      </div>
      
      <div class="feature-card">
        <h2>📚 學習內容</h2>
        <ul>
          <li>30+ 常用日語句子</li>
          <li>14 個實用分類</li>
          <li>中文對照翻譯</li>
        </ul>
      </div>

      <div class="feature-card">
        <h2>🔊 互動功能</h2>
        <ul>
          <li>日語發音播放</li>
          <li>語音識別練習</li>
          <li>即時發音回饋</li>
        </ul>
      </div>
    </div>

    <div class="start-learning">
      <router-link to="/practice" class="start-button">
        開始學習
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2.5em;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.feature-card h2 {
  color: #4CAF50;
  margin-bottom: 15px;
  font-size: 1.5em;
}

.feature-card ul {
  list-style: none;
  padding: 0;
}

.feature-card li {
  margin: 10px 0;
  padding-left: 20px;
  position: relative;
}

.feature-card li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

.start-learning {
  margin-top: 40px;
}

.start-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 15px 40px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s;
}

.start-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}
</style> 