<template>
<div class="content-wrapper">
    <div class="form-wrapper">
        <sidebar-controls
            @updateTeam="updateTeam($event)"
            @updateTitle="updateTitle($event)"
            @updatePlayer="updatePlayer($event)"
            @updateImage="updateImage($event)"
            @updateCustomTeam="updateCustomTeam($event)"
            @updateTextures="updateTextures($event)"
        ></sidebar-controls>
    </div>
    <div class="content">
        <div id="graphic">
            <div id="graphic__player-image" :style="{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition: `${backgroundPos.x}px ${backgroundPos.y}px` }" ref="drag"></div>
            <svg id="graphic__bg-cover" version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="952.000000pt" height="720.000000pt" viewBox="0 0 952.000000 720.000000"
            preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,720.000000) scale(0.100000,-0.100000)"
                :fill="custom.use ? custom.primaryColor : nflTeams.find(tm => tm.id === team).primaryColor" stroke="none">
                <path d="M0 3600 l0 -3600 4760 0 c2618 0 4760 3 4760 8 0 4 -7 20 -16 37 -9
                17 -37 70 -61 120 -25 50 -53 101 -63 115 -10 14 -30 61 -45 105 -16 44 -32
                84 -37 89 -4 6 -8 18 -8 28 0 10 -4 18 -10 18 -5 0 -10 5 -10 12 0 24 -103
                218 -137 257 -39 46 -72 53 -125 25 -52 -27 -127 -42 -161 -33 -18 4 -45 11
                -60 14 -43 9 -91 68 -116 144 -13 36 -27 75 -31 86 -5 11 -25 65 -45 120 -48
                135 -57 155 -129 270 -35 55 -71 116 -82 135 -10 19 -21 37 -24 40 -3 3 -22
                39 -43 80 -28 58 -56 95 -127 165 -106 104 -178 195 -191 239 -12 40 -37 203
                -59 381 -14 118 -27 195 -39 238 -6 20 -15 53 -20 72 -5 20 -17 48 -27 63 -24
                34 -40 61 -55 90 -7 12 -16 22 -21 22 -4 0 -8 6 -8 14 0 8 -23 40 -51 70 -50
                54 -53 56 -103 56 -62 0 -72 9 -111 95 -15 33 -40 88 -56 122 -29 60 -66 155
                -95 239 -12 37 -12 46 2 80 9 21 29 57 45 81 25 35 29 51 29 107 0 59 -2 66
                -20 66 -10 0 -29 4 -42 9 -13 5 -49 17 -80 27 -34 10 -58 22 -58 30 0 9 -12
                14 -33 14 -54 0 -91 42 -116 134 -12 43 -36 103 -53 133 -29 51 -30 57 -19 95
                7 22 30 139 51 260 28 165 42 223 54 230 9 5 16 17 16 26 0 16 -60 139 -139
                287 -18 32 -40 90 -51 127 -18 66 -47 130 -62 136 -5 2 -8 8 -8 14 0 5 -8 22
                -18 36 -10 15 -31 68 -46 117 -15 50 -32 98 -37 107 -5 10 -9 27 -9 37 0 11
                -4 30 -9 43 -5 13 -14 43 -21 68 -7 25 -16 59 -21 75 -5 17 -11 42 -13 56 -3
                14 -15 36 -27 50 -11 13 -39 54 -61 91 -44 75 -44 67 -17 311 13 122 24 91
                -93 256 l-58 80 0 241 0 240 -3220 0 -3220 0 0 -3600z"/>
                </g>
            </svg>
            <div id="graphic__accent" :style="{ opacity: textures.accent }"></div>
            <div id="graphic__texture" :style="{ opacity: textures.texture }"></div>
            <div class="player">
                <h1 class="player__title">{{ title }}</h1>
                <div class="name" :style="[player.lastName.length <= 10 ? {lineHeight: '7.75rem'} : {lineHeight: '7.25rem'}]">
                    <span class="name__first">{{ player.firstName }}</span>
                    <span class="name__bar" :style="{ backgroundColor: nflTeams.find(tm => tm.id === team).secondaryColor}" v-show="!custom.use"></span>
                    <span class="name__bar" :style="{ backgroundColor: custom.secondaryColor}" v-show="custom.use"></span>
                    <span class="name__last" :style="[player.lastName.length <= 10 ? {fontSize: '15rem'} : {fontSize: '12.5rem'}]">{{ player.lastName }}</span>
                    <span class="name__stat">{{ player.statLine }}</span>
                </div>
                <img :src="require(`@/assets/images/logos/${nflTeams.find(tm => tm.id === team).abbrev.toLowerCase()}.png`)" alt="Team Logo" class="player__logo" v-show="!custom.use">
                <img :src="custom.logo" alt="Team Logo" class="player__logo" v-if="custom.use && custom.logo">
            </div>
            <div id="image-control">
                <font-awesome-icon id="image-control--up" :icon="['fas', 'arrow-up']" @click="backgroundPos.y -= 10" />
                <font-awesome-icon id="image-control--right" :icon="['fas', 'arrow-right']" @click="backgroundPos.x += 10" />
                <font-awesome-icon id="image-control--left" :icon="['fas', 'arrow-left']" @click="backgroundPos.x -= 10" />
                <font-awesome-icon id="image-control--down" :icon="['fas', 'arrow-down']" @click="backgroundPos.y += 10" />
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
            backgroundImage: null,
            backgroundPos: {
                x: 0,
                y: 0
            },
            fillColor: '#E31837',
            team: 0,
            title: 'Player of the Game',
            player: {
                firstName: 'FirstName',
                lastName: 'LastName',
                statLine: 'Player Stat Line'
            },
            custom: {
                use: false,
                logo: null,
                primaryColor: '#fff',
                secondaryColor: '#000'
            },
            textures: {
                texture: .35,
                accent: .75
            }
        }
    },
    methods: {
        handleImage(e) {
            const image = e.target.files[0];
            this.createBase64Image(image);
        },
        createBase64Image(image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.backgroundImage = e.target.result;
                this.$emit('changeImage', e.target.result);
            };
            reader.readAsDataURL(image);
        },
        updateImage(img) {
            this.backgroundImage = img;
        },
        updateTeam(id) {
            this.team = id;
        },
        updateTitle(title) {
            this.title = title;
        },
        updatePlayer(player) {
            Object.keys(player).forEach(key => {
                if (player[key].length > 1) {
                    this.player[key] = player[key];
                }
            });
        },
        updateCustomTeam(custom) {
            this.custom = custom;
        },
        updateTextures(textures) {
            this.textures.texture = textures.texture * 0.01;
            this.textures.accent = textures.accent * 0.01;
        }
    },
    computed: {
        nflTeams() {
            return this.$store.state.teams.nflTeams;
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
    background: gray;
    display: flex;
    justify-content: flex-end;
    &__player-image {
        width: 60%;
        height: 100%;
        background-color: gray;
        background-repeat: no-repeat;
        background-size: cover;
    }
    &__bg-cover {
        position: absolute;
        left: -16rem;
        top: 0;
        height: 100%;
        filter: drop-shadow( 10px 0px 3px rgba(0, 0, 0, 0.2));
    }
    &__accent {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-image: url('../../../assets/images/graphics/001/accent.png');
        mix-blend-mode: multiply;
    }
    &__texture {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        background-image: url('../../../assets/images/graphics/001/texture.jpg');
        mix-blend-mode: multiply;
    }
}

.player {
    width: 50%;
    height: 100%;
    position: absolute;
    // background: rgba(0,0,0,0.2);
    left: 0;
    top: 0;
    color: #fff;
    display: flex;
    flex-direction: column;
    &__title {
        width: 100%;
        padding-left: 6rem;
        position: relative;
        top: 7rem;
        font-family: 'Zuume', sans-serif;
        font-size: 9rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .25));
    }
    &__logo {
        position: absolute;
        height: 16rem;
        bottom: 0;
        left: 0;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .5));
    }
}

.name {
    color: #fff;
    position: relative;
    top: 20rem;
    text-align: left;
    width: 100%;
    padding-left: 6rem;
    line-height: 7.75rem;
    & span {
        font-family: 'Zuume', sans-serif;
    }
    &__first {
        font-size: 5rem;
        font-weight: 300;
        font-style: italic;
        letter-spacing: 1.5rem;
        margin-left: 1rem;
    }
    &__last {
        position: relative;
        display: block;
        font-size: 15rem;
        font-weight: bold;
        z-index: 1;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .5));
    }
    &__stat {
        font-size: 3.6rem;
    }
    &__bar {
        position: absolute;
        display: block;
        width: 105%;
        height: 3rem;
        left: 2.5rem;
        z-index: 0;
    }
}

#image-control {
    color: #fff;
    position: absolute;
    z-index: 999;
    font-size: 2rem;
    height: 5rem;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
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