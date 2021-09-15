<template>
  <div id="app" style="font-size: 24px;">
    <div class="section">
      <PotwRecap :image="customImage"></PotwRecap>
    </div>
    <button @click="downloadImage">Download</button>
  </div>
</template>

<script>
import axios from 'axios';
import domtoimage from 'dom-to-image';

import PotwRecap from './components/player/PotwRecap.vue';

export default {
  components: {
    PotwRecap
  },
  data() { 
    return { 
      customImage: null
    } 
  },
  methods: {
    downloadImage() {
      domtoimage.toJpeg(document.getElementById('recap-container'), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
      });
    },
    selectImage() {
      const image = prompt("Put in your URL:")
      this.customImage = image;
    }
  }
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.section {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3rem;
  margin-bottom: 3rem;
}
</style>
