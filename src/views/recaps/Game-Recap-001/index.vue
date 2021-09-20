<template>
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
</template>

<script>
import sidebar from '@/components/game/Game-Recap-001/sidebar-controls.vue';
import GameRecap001 from '@/components/game/Game-Recap-001/game-recap.vue';

import domtoimage from 'dom-to-image';

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

<style lang="scss" scoped>
// @import "@/assets/scss/main.scss";
</style>
