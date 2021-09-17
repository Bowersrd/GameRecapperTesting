<template>
    <div id="recap-wrapper" :style="{ backgroundImage: 'url(' + backgroundImage + ')' }">
        <span id="bg-gradient" :style="{ backgroundImage: getGradient() }"></span>
        <div id="recap-container">
            <div id="recap-top">
                <span id="recap-top__title">{{ title }}</span>
                <span id="recap-top__highlight">Final</span>
            </div>
            <div class="team-container">
                <div class="team-container__logo" :style="{ backgroundColor: awayColor !== 'neutral' ? away[awayColor] : '#222' }">
                    <img :src="require(`@/assets/images/logos/${(away.abbrev).toLowerCase()}.png`)" :alt="`${away.mascot} logo`">
                </div>
                <div class="team-container__name" :style="{ backgroundColor: awayColor !== 'neutral' ? away[awayColor] : '#222' }">
                    <div class="team-info">
                        <span class="team-info__loc">{{ away.city }}</span>
                        <div class="team-info__name">
                            <span class="team-info__name--mascot">{{ away.mascot }}</span>
                            <span class="team-info__name--record">({{ awayRecord.wins }}-{{ awayRecord.losses }}-{{ awayRecord.ties }})</span>
                        </div>
                    </div>
                </div>
                <div class="team-container__score" :style="{ backgroundColor: awayColor !== 'neutral' ? away[awayColor] : '#222' }">
                    <span>{{ awayScore }}</span>
                </div>
            </div>
            <div class="team-container">
                <div class="team-container__logo" :style="{ backgroundColor: homeColor !== 'neutral' ? home[homeColor] : '#222' }">
                    <img :src="require(`@/assets/images/logos/${(home.abbrev).toLowerCase()}.png`)" :alt="`${home.mascot} logo`">
                </div>
                <div class="team-container__name" :style="{ backgroundColor: homeColor !== 'neutral' ? home[homeColor] : '#222' }">
                    <div class="team-info">
                        <span class="team-info__loc">{{ home.city }}</span>
                        <div class="team-info__name">
                            <span class="team-info__name--mascot">{{ home.mascot }}</span>
                            <span class="team-info__name--record">({{ homeRecord.wins }}-{{ homeRecord.losses }}-{{ homeRecord.ties }})</span>
                        </div>
                    </div>
                </div>
                <div class="team-container__score" :style="{ backgroundColor: homeColor !== 'neutral' ? home[homeColor] : '#222' }">
                    <span>{{ homeScore }}</span>
                </div>
            </div>
            <div id="stats-container">
                <div class="team-stats">
                    <div class="team-stats__bar" :style="{ backgroundColor: awayColor !== 'neutral' ? away[awayColor] : '#222' }">
                        <span>{{ away.mascot }}</span>
                    </div>
                    <div class="stats">
                        <div class="stats__container">
                            <span class="stats__player">{{ awayStats[0].name }}</span>
                            <span class="stats__stat">{{ awayStats[0].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ awayStats[1].name }}</span>
                            <span class="stats__stat">{{ awayStats[1].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ awayStats[2].name }}</span>
                            <span class="stats__stat">{{ awayStats[2].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ awayStats[3].name }}</span>
                            <span class="stats__stat">{{ awayStats[3].stat }}</span>
                        </div>
                    </div>
                </div>
                <div class="team-stats">
                    <div class="stats">
                        <div class="stats__container">
                            <span class="stats__player">{{ homeStats[0].name }}</span>
                            <span class="stats__stat">{{ homeStats[0].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ homeStats[1].name }}</span>
                            <span class="stats__stat">{{ homeStats[1].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ homeStats[2].name }}</span>
                            <span class="stats__stat">{{ homeStats[2].stat }}</span>
                        </div>
                        <div class="stats__container">
                            <span class="stats__player">{{ homeStats[3].name }}</span>
                            <span class="stats__stat">{{ homeStats[3].stat }}</span>
                        </div>
                    </div>
                    <div class="team-stats__bar" :style="{ backgroundColor: homeColor !== 'neutral' ? home[homeColor] : '#222' }">
                        <span id="team-stats__bar--reverse">{{ home.mascot }}</span>
                    </div> 
                </div>
            </div>
            <div id="recap-footer"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        backgroundImage: String,
        title: String,
        awayTeam: Number,
        homeTeam: Number,
        awayRecord: Object,
        homeRecord: Object,
        awayScore: Number,
        homeScore: Number,
        awayStats: Array,
        homeStats: Array,
        awayColor: String,
        homeColor: String
    },
    data() {
        return {
            angle: 90,
            color: '#111'
        }
    },
    methods: {
        getGradient() {
            return `linear-gradient(${this.angle}deg, ${this.color} 0%, rgba(0,0,0,0) 50%, ${this.color} 100%)`;
        }
    },
    computed: {
        nflTeams() {
            return this.$store.state.teams.nflTeams;
        },
        away() {
            return this.nflTeams.find(team => team.id === this.awayTeam);
        },
        home() {
            return this.nflTeams.find(team => team.id === this.homeTeam);
        }
    }
}
</script>

<style lang="scss" scoped>
$primary-color: #25394d;
$secondary-color: #0e0f17;
$white: #eee;
$gray: #c9cccc;
$highlight: #feb91f;

#recap-wrapper {
    position: relative;
    width: 128rem;
    height: 72rem;
    display: flex;
    justify-content: center;
    padding-top: 4rem;
    align-self: center;
}

#bg-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.7;
}

#recap-container {
    width: 96rem;
    height: 54rem;
    position: relative;
    z-index: 999;
    border: 2px solid $gray;
}

#recap-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 8rem;
    background-image: linear-gradient($primary-color, $secondary-color);
    border-bottom: 1px solid $gray;
    box-shadow: inset 4px 6px 6px -6px;
    &__title {
        width: 80%;
        color: $white;
        font-size: 3rem;
        text-transform: uppercase;
        text-align: left;
        font-weight: bold;
        padding-left: 2rem;
    }
    &__highlight {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: $highlight;
        color: $primary-color;
        text-transform: uppercase;
        font-size: 2.2rem;
        font-weight: bold;
        height: 100%;
        width: 20%;
        box-shadow: inset 0px 0px 6px -2px;
    }
}

.team-container {
    display: flex;
    width: 100%;
    height: 9.5rem;
    border-bottom: 1px solid $gray;
    &__logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20%;
        overflow: hidden;
        box-shadow: inset 0px 0px 6px -2px;
        & img {
            height: 125%;
            filter: drop-shadow(1px 1px 2px #000)
        }
    }
    &__name {
        position: relative;
        width: 60%;
        box-shadow: inset 0px 0px 6px -2px;
        display: flex;
        align-items: center;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.15);
        }
    }
    &__score {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20%;
        box-shadow: inset 0px 0px 6px -2px;
        & span {
            color: $white;
            font-size: 6.4rem;
            font-weight: bold;
        }
    }
}

.team-info {
    color: $white;
    position: relative;
    z-index: 999;
    text-align: left;
    padding-left: 2rem;
    text-transform: uppercase;
    line-height: 3rem;
    &__loc {
        font-size: 1.6rem;
        letter-spacing: .2rem;        
    }
    &__name {
        display: flex;
        &--mascot {
            font-size: 4.8rem;
            font-weight: bold;
        }
        &--record {
            margin: 0.5rem 0 0 0.75rem;
            font-size: 1.6rem;
        }
    }
}

#stats-container {
    position: relative;
    width: 100%;
    height: 22.6rem;
    background-color: $gray;
    box-shadow: inset 0px 0px 6px -2px;
    display: flex;
}

#recap-footer {
    width: 100%;
    height: 4rem;
    background-image: linear-gradient($primary-color, $secondary-color);
    border-top: 1px solid $gray;
    box-shadow: inset 0px 0px 6px -2px;
}

.team-stats {
    width: 50%;
    height: 100%;
    display: flex;
    &__bar {
        width: 7.5%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 0px 0px 6px -2px;
        & span {
            display: block;
            color: $white;
            text-transform: uppercase;
            font-size: 1.8rem;
            transform: rotate(-90deg);
        }
        &:last-child span {
            transform: rotate(90deg);
        }
    }
}

.stats {
    width: 92.5%;
    height: 100%;
    padding: 0.5rem 0;
    &:first-of-type {
        border-left: 1px solid #bababa;
    }
    &__container {
        text-align: left;
        width: 100%;
        height: calc(100% / 4);
        padding-left: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-transform: uppercase;
        color: $primary-color;
    }
    &__player {
        display: block;
        font-weight: 500;
        font-size: 2rem;
    }
    &__stat {
        font-size: 1.7rem;
    }
}
</style>