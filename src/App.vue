<template>
  <div id="app" style="font-size: 24px;">
    <div class="section">
      <sidebar
        @changeImage="changeImage($event)"
        @changeAwayTeam="changeTeam($event, 'away')"
        @changeHomeTeam="changeTeam($event, 'home')"
        @changeTitle="changeTitle($event)"
        @changeAwayRecord="changeRecord($event, 'away')"
        @changeHomeRecord="changeRecord($event, 'home')"
        @changeAwayScore="changeScore($event, 'away')"
        @changeHomeScore="changeScore($event, 'home')"
        @changeAwayStats="changeStats($event, 'away')"
        @changeHomeStats="changeStats($event, 'home')"
        @changeAwayColor="changeColor($event, 'away')"
        @changeHomeColor="changeColor($event, 'home')"
      ></sidebar>
      <div class="content">
        <GameRecap001 
          :backgroundImage="backgroundImage"
          :title="title"
          :awayTeam="awayTeam"
          :homeTeam="homeTeam"
          :awayRecord="awayRecord"
          :homeRecord="homeRecord"
          :awayScore="awayScore"
          :homeScore="homeScore"
          :awayStats="awayStats"
          :homeStats="homeStats"
          :awayColor="awayColor"
          :homeColor="homeColor"
        ></GameRecap001>
        <button class="btn" @click="downloadImage">Download</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import domtoimage from 'dom-to-image';

import sidebar from './components/game/Game-Recap-001/sidebar-controls.vue';
import GameRecap001 from './components/game/Game-Recap-001/game-recap.vue';

export default {
  components: {
    sidebar,
    GameRecap001
  },
  data() { 
    return { 
      backgroundImage: null,
      title: '',
      awayTeam: 0,
      homeTeam: 14,
      awayRecord: {},
      homeRecord: {},
      awayScore: 0,
      homeScore: 0,
      awayStats: [
        {name: '', stat: ''},
        {name: '', stat: ''},
        {name: '', stat: ''},
        {name: '', stat: ''}
      ],
      homeStats: [
        {name: '', stat: ''},
        {name: '', stat: ''},
        {name: '', stat: ''},
        {name: '', stat: ''}
      ],
      awayColor: 'primaryColor',
      homeColor: 'primaryColor'
    } 
  },
  methods: {
    downloadImage() {
      domtoimage.toJpeg(document.getElementById(`${this.backgroundImage ? 'recap-wrapper' : 'recap-container'}`), { quality: 1 })
      .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'Game Recap.jpeg';
          link.href = dataUrl;
          link.click();
      });
    },
    changeImage(e) {
      this.backgroundImage = e;
    },
    changeTeam(id, side) {
      side === 'away' ? this.awayTeam = id : this.homeTeam = id;
    },
    changeTitle(e) {
      this.title = e;
    },
    changeRecord(e, side) {
      side === 'away' ? this.awayRecord = e : this.homeRecord = e;
    },
    changeScore(e, side) {
      side === 'away' ? this.awayScore = e : this.homeScore = e;
    },
    changeStats(e, side) {
      side === 'away' ? this.awayStats = e : this.homeStats = e;
    },
    changeColor(e, side) {
      side === 'away' ? this.awayColor = e : this.homeColor = e;
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/fonts/_Roboto.scss";

$primary-color: #25394d;
$secondary-color: #0e0f17;
$white: #eee;
$gray: #c9cccc;
$highlight: #feb91f;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
}

html {
  font-size: 62.5%;
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
  align-items: stretch;
  justify-content: stretch;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: space-around;
  align-items: center;
  background: $white;
}

.btn {
  width: 20rem;
  height: 5rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 500;
  background: transparent;
  color: $primary-color;
  border: 2px solid $primary-color;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    color: $white;
    background: $primary-color;
  }
}
</style>
