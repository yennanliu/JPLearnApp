<template>
  <div id="app">
    <nav class="nav-bar">
      <div class="nav-container">
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span class="menu-icon"></span>
        </button>
        
        <div class="nav-links" :class="{ 'open': isMenuOpen }">
          <router-link to="/" class="nav-link" @click="isMenuOpen = false">首頁</router-link>
          <router-link to="/practice" class="nav-link" @click="isMenuOpen = false">練習</router-link>
          <router-link to="/articles" class="nav-link" @click="isMenuOpen = false">短文練習</router-link>
          <router-link to="/liked" class="nav-link" @click="isMenuOpen = false">收藏句子</router-link>
        </div>
      </div>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isMenuOpen: false
    }
  }
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
}

/* Navigation styles */
.nav-bar {
  background-color: #4CAF50;
  padding: 0;
  margin-bottom: 30px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
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

.menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 15px;
  position: absolute;
  right: 20px;
  top: 10px;
}

.menu-icon {
  display: block;
  width: 25px;
  height: 2px;
  background-color: white;
  position: relative;
  transition: background-color 0.3s;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: white;
  transition: transform 0.3s;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  bottom: -8px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    padding: 0;
    overflow: hidden;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-link {
    width: 100%;
    margin: 0;
    padding: 15px 20px;
    text-align: center;
    border-radius: 0;
  }

  .menu-toggle[aria-expanded="true"] .menu-icon {
    background-color: transparent;
  }

  .menu-toggle[aria-expanded="true"] .menu-icon::before {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-toggle[aria-expanded="true"] .menu-icon::after {
    transform: translateY(-8px) rotate(-45deg);
  }
}

/* Responsive container for all pages */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Responsive grid system */
.grid {
  display: grid;
  gap: 20px;
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
}

/* Responsive spacing */
@media (max-width: 768px) {
  .container {
    padding: 15px;
  }
  .grid {
    gap: 15px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 10px;
  }
  .grid {
    gap: 10px;
  }
}
</style>
