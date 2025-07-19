<template>
  <div id="app">
    <nav class="nav-bar">
      <router-link to="/" class="nav-link">首頁</router-link>
      <router-link to="/practice" class="nav-link">練習</router-link>
      <router-link to="/liked" class="nav-link">收藏句子</router-link>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.nav-bar {
  background-color: #4CAF50;
  padding: 15px;
  margin-bottom: 30px;
  text-align: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}
</style>
