<template>
  <div id="app">
    <!-- Desktop Navigation -->
    <nav class="nav-bar desktop-nav">
      <div class="nav-container">
        <div class="nav-left">
          <router-link to="/" class="logo">
            <img src="@/assets/logo.png" alt="Logo" class="logo-img">
            <span class="app-name">JP Learn</span>
          </router-link>
        </div>
        
        <div class="nav-links">
          <router-link to="/" class="nav-link">首頁</router-link>
          <router-link to="/practice" class="nav-link">練習</router-link>
          <router-link to="/articles" class="nav-link">短文練習</router-link>
          <router-link to="/liked" class="nav-link">收藏句子</router-link>
        </div>
      </div>
    </nav>
    
    <!-- Mobile Navigation -->
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
  background-color: #ffffff;
  min-height: 100vh;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Content wrapper */
.content-wrapper {
  flex: 1;
  padding-bottom: 70px;
  background-color: #f7f7f7;
}

/* Desktop Navigation */
.nav-bar {
  background-color: #ffffff;
  border-bottom: 1px solid #e8e8e8;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-left .logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  width: auto;
  margin-right: 10px;
}

.app-name {
  font-size: 20px;
  font-weight: 600;
  color: #FF9933;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #666666;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s;
}

.nav-link:hover {
  color: #FF9933;
  background-color: #fff1e6;
}

.nav-link.router-link-active {
  color: #FF9933;
  background-color: #fff1e6;
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
  padding: 10px 0;
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
  color: #FF9933;
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
  
  .nav-container {
    padding: 10px 15px;
  }
}

/* Container for all pages */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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
