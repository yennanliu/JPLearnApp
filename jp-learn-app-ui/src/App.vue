<template>
  <div id="app">
    <!-- Desktop Navigation -->
    <nav class="nav-bar desktop-nav">
      <div class="nav-container">
        <router-link to="/" class="nav-link">首頁</router-link>
        <router-link to="/practice" class="nav-link">練習</router-link>
        <router-link to="/articles" class="nav-link">短文練習</router-link>
        <router-link to="/liked" class="nav-link">收藏句子</router-link>
      </div>
    </nav>
    
    <!-- Mobile Bottom Navigation -->
    <nav class="mobile-nav">
      <router-link to="/" class="mobile-nav-item">
        <span class="nav-icon">🏠</span>
        <span class="nav-text">首頁</span>
      </router-link>
      <router-link to="/practice" class="mobile-nav-item">
        <span class="nav-icon">✏️</span>
        <span class="nav-text">練習</span>
      </router-link>
      <router-link to="/articles" class="mobile-nav-item">
        <span class="nav-icon">📝</span>
        <span class="nav-text">短文</span>
      </router-link>
      <router-link to="/liked" class="mobile-nav-item">
        <span class="nav-icon">❤️</span>
        <span class="nav-text">收藏</span>
      </router-link>
    </nav>
    
    <div class="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Content wrapper */
.content-wrapper {
  flex: 1;
  padding-bottom: 70px; /* Space for mobile navigation */
}

/* Desktop Navigation */
.nav-bar {
  background-color: #4CAF50;
  padding: 0;
  margin-bottom: 30px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.router-link-active {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 10px 0 env(safe-area-inset-bottom, 0);
  z-index: 1000;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  padding: 8px 0;
  width: 25%;
  transition: color 0.3s;
}

.mobile-nav-item.router-link-active {
  color: #4CAF50;
  background: none;
}

.nav-icon {
  font-size: 1.5em;
  margin-bottom: 4px;
}

.nav-text {
  font-size: 0.8em;
}

/* Responsive styles */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: flex;
    justify-content: space-around;
  }

  .content-wrapper {
    padding-bottom: calc(70px + env(safe-area-inset-bottom, 0));
  }
}

/* Container for all pages */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Responsive typography */
@media (max-width: 768px) {
  h1 {
    font-size: 1.8em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.2em;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5em;
  }
  h2 {
    font-size: 1.3em;
  }
  h3 {
    font-size: 1.1em;
  }
  
  .container {
    padding: 15px;
  }
}

/* Safe area support for iOS devices */
@supports (padding: max(0px)) {
  .mobile-nav {
    padding-bottom: max(env(safe-area-inset-bottom, 0), 10px);
  }
  
  .content-wrapper {
    padding-bottom: max(calc(70px + env(safe-area-inset-bottom, 0)), 70px);
  }
}
</style>
