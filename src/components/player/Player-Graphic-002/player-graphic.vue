<template>
    <div class="content-wrapper">
        <div class="form-wrapper">
            <sidebar-controls
                @updateTeam="updateTeam($event)"
                @updateAlert="updateAlert($event)"
                @updateAction="updateAction($event)"
                @updatePlayer="updatePlayer($event)"
                @updateImage="updateImage($event)"
                @updateCustomTeam="updateCustomTeam($event)"
                @updateTextures="updateTextures($event)"
                @updateFlipped="updateFlipped($event)"
            ></sidebar-controls>
        </div>
        <div class="content">
            <div id="graphic">
                <div id="graphic__image" :style="{ backgroundImage: `url('${backgroundImage}')`, backgroundPosition: `${backgroundPos.x}px ${backgroundPos.y}px`, order: flipped ? 1 : 0, boxShadow: flipped ? 'inset 10px 0 9px -7px rgba(0,0,0,0.7)' : 'inset -10px 0 9px -7px rgba(0,0,0,0.7)' }"></div>
                <div id="graphic__texture" :style="{ backgroundImage: 'url(' + require(`@/assets/images/graphics/002/${textures.image}.jpg`) + ')', opacity: textures.strength }"></div>
                <div id="graphic__alert" :style="[flipped ? { right: '43%' } : { left: '43%' }]">
                    <h1 class="graphic-headline" :style="[alert.length <= 11 ? {fontSize: '5rem'} : {fontSize: '4rem'}]">{{ alert }}</h1>
                </div>
                <div id="graphic__content" :style="{ backgroundColor: custom.use ? custom.primaryColor : currentTeam.primaryColor }">
                    <div id="graphic__logo">
                        <img :src="require(`@/assets/images/logos/${currentTeam.abbrev.toLowerCase()}.png`)" alt="Team logo" v-show="!custom.use">
                        <img :src="custom.logo" alt="Team Logo" class="player__logo" v-if="custom.use && custom.logo">
                    </div>
                    <div id="action">
                        <h1 id="action__team">{{ currentTeam.city }} {{ currentTeam.mascot }}</h1>
                        <h2 id="action__alert" :style="{ backgroundColor: custom.use ? custom.secondaryColor : currentTeam.secondaryColor }">{{ action }}</h2>
                    </div>
                    <div id="player" :style="[player.lastName.length <= 9 ? {lineHeight: '6rem'} : {lineHeight: '5.5rem'}]">
                        <h1 id="player__first">{{ player.firstName }}</h1>
                        <h1 id="player__last" :style="[player.lastName.length <= 9 ? {fontSize: '11rem'} : {fontSize: '9.5rem'}]">{{ player.lastName }}</h1>
                    </div>
                </div>
                <div id="image-control" :style="[flipped ? { right: '2rem' } : { left: '2rem' }]">
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
            flipped: false,
            backgroundImage: null,
            backgroundPos: {
                x: 0,
                y: 0
            },
            team: 0,
            alert: 'Breaking',
            action: 're-signing',
            player: {
                firstName: 'firstName',
                lastName: 'lastName'
            },
            custom: {
                use: false,
                logo: null,
                primaryColor: '#aaa',
                secondaryColor: '#000'
            },
            textures: {
                strength: .4,
                image: 0
            }
        }
    },
    methods: {
        updateImage(img) {
            this.backgroundImage = img;
        },
        updateTeam(id) {
            this.team = id;
        },
        updateAlert(alert) {
            this.alert = alert;
        },
        updateAction(action) {
            this.action = action;
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
            this.textures.strength = textures.strength * 0.01;
            this.textures.image = textures.image;
        },
        updateFlipped(flipped) {
            this.flipped = flipped;
        }
    },
    computed: {
        nflTeams() {
            return this.$store.state.teams.nflTeams;
        },
        currentTeam() {
            const team = this.nflTeams.find(tm => tm.id === this.team);
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
    width: 102.4rem;
    height: 76.8rem;
    background: gray;
    display: flex;
    justify-content: space-between;
    &::after {
        content: "";
        width: 97.5%;
        height: 97%;
        position: absolute;
        top: .875rem;
        left: 1.15rem;
        z-index: 998;
    }
    &__image {
        position: relative;
        width: 50%;
        height: 100%;
        background-size: cover;
        background-position: -42rem 0;
        background-repeat: no-repeat;
        filter: grayscale(100%);
    }
    &__alert {
        position: absolute;
        z-index: 998;
        top: 42%;
        width: 28rem;
        height: 9rem;
        background-image: linear-gradient(#fff, #ddd);
        border: 1px solid #ddd;
        filter: drop-shadow( 3px 0px 3px rgba(0, 0, 0, 0.2));
    }
    &__logo {
        height: 50%;
        width: 100%;
        overflow: hidden;
        @include flex-center;
        & img {
            width: 100%;
            filter: drop-shadow(-5px 10px 5px rgba(0, 0, 0, .25));
        }
    }
    &__content {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    &__accent {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 998;
        background-image: url('../../../assets/images/graphics/001/accent.png');
        mix-blend-mode: multiply;
    }
    &__texture {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        mix-blend-mode: screen;
        opacity: 0.4;
        background-size: cover;
    }
}

.graphic-headline {
    position: relative;
    top: .75rem;
    left: 2rem;
    font-size: 5rem;
    letter-spacing: 5px;
    font-family: 'Zuume', sans-serif;
    font-weight: bold;
    color: #212121;
    &::after {
        content: "_";
        position: absolute;
        display: block;
        top: 1.35rem;
    }
}

#player {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: left;
    color: #eee;
    padding: 2rem 3.25rem 0;
    line-height: 6rem;
    z-index: 998;
    &__first {
        font-family: 'Zuume', sans-serif;
        font-weight: 300;
        font-style: italic;
        font-size: 3rem;
        letter-spacing: 1rem;
        padding-left: .5rem;
    }
    &__last {
        font-family: 'Zuume', sans-serif;
        font-size: 11rem;
        filter: drop-shadow(-5px 5px 5px rgba(0, 0, 0, .15));
    }
}

#action {
    text-transform: uppercase;
    color: #eee;
    width: 100%;
    margin-top: 6rem;
    padding-left: 3rem;
    &__team {
        font-size: 2.4rem;
        letter-spacing: .3rem;
        font-weight: 300;
        padding-left: .75rem;
        margin-bottom: .25rem;
    }
    &__alert {
        font-size: 4.5rem;
        background: #111;
        padding: .5rem 1rem;
        filter: drop-shadow(-5px 6px 5px rgba(0, 0, 0, .25));
    }
}

#image-control {
    color: #fff;
    position: absolute;
    z-index: 999;
    font-size: 2rem;
    height: 5rem;
    top: 2rem;
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