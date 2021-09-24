<template>
    <div class="content-wrapper">
        <div class="form-wrapper">
            <sidebar-controls
                @updateLeftImage="updateLeftImage($event)"
                @updateRightImage="updateRightImage($event)"
                @updateLeftTeam="updateLeftTeam($event)"
                @updateRightTeam="updateRightTeam($event)"
                @updateLeftPlayers="updateLeftPlayers($event)"
                @updateRightPlayers="updateRightPlayers($event)"
                @updateTextures="updateTextures($event)"
                @updateLeftColor="updateLeftColor($event)"
                @updateRightColor="updateRightColor($event)"
            ></sidebar-controls>
        </div>
        <div class="content">
            <div id="graphic">
                <div id="graphic__texture" :style="{ backgroundImage: 'url(' + require(`@/assets/images/graphics/trade-001/${textures.image}.jpg`) + ')', opacity: textures.strength }"></div>
                <font-awesome-icon class="icons" :icon="['fas', 'chevron-right']" style="top: 6rem; left: 62rem;" :style="{ color: lTeam.color === 'primaryColor' ? leftTeam.secondaryColor : leftTeam.primaryColor }" />
                <font-awesome-icon class="icons" :icon="['fas', 'chevron-right']" style="top: 6rem; left: 58.5rem;" />
                <font-awesome-icon class="icons" :icon="['fas', 'chevron-left']" style="bottom: 6rem; right: 58.5rem;" />
                <font-awesome-icon class="icons" :icon="['fas', 'chevron-left']" style="bottom: 6rem; right: 62rem;" :style="{ color: lTeam.color === 'primaryColor' ? leftTeam.secondaryColor : leftTeam.primaryColor }" />
                <div class="trade-container" :style="{ backgroundColor: lTeam.color === 'neutral' ? '#222' : getColor(leftTeam[lTeam.color]) }">
                    <img class="trade-container__image" :src="lTeam.backgroundImage" alt="" :style="{ left: `${lTeam.backgroundPos.x}px`, top: `${lTeam.backgroundPos.y}px`}"  v-if="lTeam.backgroundImage">
                    <div class="team-info">
                        <div class="team-info__team">{{ leftTeam.mascot }} Recieve:</div>
                        <div class="team-info__players">
                            <span class="team-info__player" v-for="(player, index) in lTeam.players" :key="player.id">{{ lTeam.players[index].player }}</span>
                        </div>
                        <div class="team-info__logo">
                            <img :src="require(`@/assets/images/logos/${leftTeam.abbrev.toLowerCase()}.png`)" alt="Team logo">
                        </div>
                    </div>
                </div>
                <div class="trade-container" :style="{ backgroundColor: rTeam.color === 'neutral' ? '#222' : getColor(rightTeam[rTeam.color]) }">
                    <img class="trade-container__image" :src="rTeam.backgroundImage" alt="" :style="{ left: `${rTeam.backgroundPos.x}px`, top: `${rTeam.backgroundPos.y}px`}" v-if="rTeam.backgroundImage">
                    <div class="team-info">
                        <div class="team-info__team">{{ rightTeam.mascot }} Recieve:</div>
                        <div class="team-info__players">
                            <span class="team-info__player" v-for="(player, index) in rTeam.players" :key="player.id">{{ rTeam.players[index].player }}</span>
                        </div>
                        <div class="team-info__logo">
                            <img :src="require(`@/assets/images/logos/${rightTeam.abbrev.toLowerCase()}.png`)" alt="Team logo">
                        </div>
                    </div>
                </div>
                <div id="image-control" class="image-control image-control__left">
                    <font-awesome-icon class="image-control--up" :icon="['fas', 'arrow-up']" @click="lTeam.backgroundPos.y -= 10" />
                    <font-awesome-icon class="image-control--right" :icon="['fas', 'arrow-right']" @click="lTeam.backgroundPos.x += 10" />
                    <font-awesome-icon class="image-control--left" :icon="['fas', 'arrow-left']" @click="lTeam.backgroundPos.x -= 10" />
                    <font-awesome-icon class="image-control--down" :icon="['fas', 'arrow-down']" @click="lTeam.backgroundPos.y += 10" />
                </div>
                <div id="image-control-right" class="image-control image-control__right">
                    <font-awesome-icon class="image-control--up" :icon="['fas', 'arrow-up']" @click="rTeam.backgroundPos.y -= 10" />
                    <font-awesome-icon class="image-control--right" :icon="['fas', 'arrow-right']" @click="rTeam.backgroundPos.x += 10" />
                    <font-awesome-icon class="image-control--left" :icon="['fas', 'arrow-left']" @click="rTeam.backgroundPos.x -= 10" />
                    <font-awesome-icon class="image-control--down" :icon="['fas', 'arrow-down']" @click="rTeam.backgroundPos.y += 10" />
                </div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import sidebarControls from './sidebar-controls.vue';

export default {
    components: {
        'sidebar-controls': sidebarControls
    },
    data() {
        return {
            lTeam: {
                id: 0,
                color: 'primaryColor',
                backgroundImage: null,
                backgroundPos: {
                    x: 0,
                    y: 0
                },
                players: []
            },
            rTeam: {
                id: 10,
                color: 'primaryColor',
                backgroundImage: null,
                backgroundPos: {
                    x: 0,
                    y: 0
                },
                players: []
            },
            lCustom: {
                use: false,
                logo: null,
                color: 'primaryColor',
                primaryColor: '#aaa',
                secondaryColor: '#000',
                backgroundImage: null,
                backgroundPos: {
                    x: 0,
                    y: 0
                },
                players: []
            },
            rCustom: {
                use: false,
                logo: null,
                color: 'primaryColor',
                primaryColor: '#aaa',
                secondaryColor: '#000',
                backgroundImage: null,
                backgroundPos: {
                    x: 0,
                    y: 0
                },
                players: []
            },
            textures: {
                strength: .4,
                image: 0
            }
        }
    },
    methods: {
        getColor(color) {
            var hex2rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            const result = {r: parseInt(hex2rgb[1], 16), g: parseInt(hex2rgb[2], 16), b: parseInt(hex2rgb[3], 16)};
            return `rgba(${result.r},${result.g},${result.b},1)`
        },
        updateLeftImage(image) {
            this.lTeam.backgroundImage = image;
        },
        updateRightImage(image) {
            this.rTeam.backgroundImage = image;
        },
        updateLeftTeam(team) {
            this.lTeam.id = team;
        },
        updateRightTeam(team) {
            this.rTeam.id = team;
        },
        updateLeftPlayers(players) {
            this.lTeam.players = players;
        },
        updateRightPlayers(players) {
            this.rTeam.players = players;
        },
        updateTextures(textures) {
            this.textures.strength = textures.strength * 0.01;
            this.textures.image = textures.image;
        },
        updateLeftColor(color) {
            this.lTeam.color = color;
        },
        updateRightColor(color) {
            this.rTeam.color = color;
        },
    },
    computed: {
        nflTeams() {
            return this.$store.state.teams.nflTeams;
        },
        leftTeam() {
            const team = this.nflTeams.find(tm => tm.id === this.lTeam.id);
            return team;
        },
        rightTeam() {
            const team = this.nflTeams.find(tm => tm.id === this.rTeam.id);
            return team;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";
@import "@/assets/fonts/Zuume/_Zuume.scss";

#graphic {
    position: relative;
    width: 128rem;
    height: 72rem;
    background: #eee;
    display: flex;
    padding: 1.5rem;
    &__texture {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 999;
        mix-blend-mode: screen;
        opacity: 0.4;
        background-size: cover;
    }
}

.trade-container {
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.35));
    &__image {
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        filter: grayscale(100%);
        mix-blend-mode: soft-light;
        opacity: 0.25;
    }
}

.icons {
    position: absolute;
    color: #eee;
    font-size: 10rem;
    z-index: 998;
    filter: drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.35));
}

.team-info {
    padding-top: 25rem;
    height: 100%;
    position: relative;
    z-index: 998;
    color: #eee;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    &__team {
        width: 45rem;
        height: 6rem;
        border: 4px solid #eee;
        @include flex-center;
        text-transform: uppercase;
        font-family: 'Zuume', sans-serif;
        font-size: 3.4rem;
        letter-spacing: 2px;
        filter: drop-shadow(-5px 5px 5px rgba(0, 0, 0, .2));
    }
    &__players {
        display: flex;
        width: 100%;
        text-align: center;
        flex-direction: column;
        gap: .5rem;
    }
    &__player {
        font-family: 'Roboto', sans-serif;
        font-size: 2.2rem;
        text-transform: uppercase;
    }
    &__logo {
        position: absolute;
        bottom: 0;
        & img {
            height: 25rem;
            filter: drop-shadow(-5px 10px 5px rgba(0, 0, 0, .25));
        }
    }
}

.image-control {
    color: #fff;
    position: absolute;
    z-index: 9999;
    font-size: 2rem;
    height: 5rem;
    top: 2.5rem;
    cursor: pointer;
    &__left {
        left: 2.5rem;
    }
    &__right {
        right: 2.5rem;
    }
    &--up {
        position: relative;
        top: 0;
        right: -2.75rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .7));
        &:hover {
            color: $color-primary-0;
        }
    }
    &--left {
        position: relative;
        top: 1.5rem;
        right: 2.5rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .7));
        &:hover {
            color: $color-primary-0;
        }
    }
    &--right {
        position: relative;
        top: 1.5rem;
        right: -2.5rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .7));
        &:hover {
            color: $color-primary-0;
        }
    }
    &--down {
        position: relative;
        top: 3rem;
        right: 2.5rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .7));
        &:hover {
            color: $color-primary-0;
        }
    }
}
</style>