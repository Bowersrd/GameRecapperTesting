<template>
    <div class="content-wrapper">
        <div class="form-wrapper">
            <sidebar-controls
                @updateTeams="updateTeams($event)"
                @updateBorder="updateBorder($event)"
            ></sidebar-controls>
        </div>
        <div class="content">
            <div id="graphic">
                <img src="@/assets/images/graphics/ranking-001/yard-lines.png" alt="Yard line markers for visual appeal" class="graphic-header__yard">
                <div class="graphic-header">
                    <p class="graphic-header__title">Power</p>
                    <img src="@/assets/images/vendors/neonsportz_logo.png" alt="League logo" class="graphic-header__logo">
                    <p class="graphic-header__title">Rankings</p>
                </div>
                <div class="teams-container">
                    <div class="ranking" v-for="(team, index) in teams" :key="team.teamId">
                        <p class="ranking__rank" :style="[border.active ? { outline: `1px solid ${border.color}` } : {}, { backgroundColor: nflTeams.find(tm => tm.id == team.id)[team.color] }]">{{ index + 1 }}</p>
                        <div class="ranking__team" :style="[border.active ? { outline: `1px solid ${border.color}` } : {}, { backgroundColor: nflTeams.find(tm => tm.id == team.id)[team.color] }]">
                            <p class="ranking__name">{{ nflTeams.find(tm => tm.id == team.id).mascot }}</p>
                            <img :src="require(`@/assets/images/logos/${nflTeams.find(tm => tm.id == team.id).abbrev.toLowerCase()}.png`)" alt="League logo" class="ranking__logo">
                        </div>
                    </div>
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
            teams: [
                {
                    id: 13,
                    color: 'primaryColor'
                },
                {
                    id: 2,
                    color: 'primaryColor'
                },
                {
                    id: 6,
                    color: 'primaryColor'
                },
                {
                    id: 20,
                    color: 'primaryColor'
                },
                {
                    id: 18,
                    color: 'primaryColor'
                },
                {
                    id: 7,
                    color: 'primaryColor'
                },
                {
                    id: 1,
                    color: 'primaryColor'
                },
                {
                    id: 21,
                    color: 'primaryColor'
                },
                {
                    id: 28,
                    color: 'primaryColor'
                },
                {
                    id: 31,
                    color: 'primaryColor'
                },
            ],
            border: {
                active: true,
                color: '#EEEEEE'
            }
        }
    },
    methods: {
        getColor(color) {
            var hex2rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
            const result = {r: parseInt(hex2rgb[1], 16), g: parseInt(hex2rgb[2], 16), b: parseInt(hex2rgb[3], 16)};
            return `rgba(${result.r},${result.g},${result.b},1)`
        },
        updateTeams(teams) {
            this.teams = teams;
        },
        updateBorder(border) {
            this.border = border;
        },
        updateTextures(textures) {
            this.textures.strength = textures.strength * 0.01;
            this.textures.image = textures.image;
        }
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
    width: 49.1rem;
    height: 87.1rem;
    min-width: 49.1rem;
    min-height: 87.1rem;
    background: url('../../../assets/images/graphics/ranking-001/pr-bg.png');
    background-position: center;
    display: flex;
    flex-direction: column;
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

.graphic-header {
    width: 100%;
    height: 9rem;
    background-color: #262626;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #eee;;
    &__title {
        color: #eee;
        font-size: 5.8rem;
        font-weight: bold;
        text-transform: uppercase;
        font-family: 'Zuume', sans-serif;
    }
    &__logo {
        height: 140%;
        margin: 3.5rem 1rem 0;
    }
    &__yard {
        position: absolute;
        right: 0;
        top: 9.75rem;
        z-index: 0;
    }
}

.teams-container {
    position: relative;
    width: 100%;
    height: 71rem;
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
}

.ranking {
    display: flex;
    width: 42rem;
    height: 6rem;
    &__rank {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 6rem;
        height: 100%;
        background: #262626;
        font-size: 4rem;
        font-family: 'Zuume', sans-serif;
        color: #eee;
        margin-right: 1rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .25));
    }
    &__team {
        width: 35rem;
        height: 100%;
        background: #262626;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        padding: 0 1.5rem;
        filter: drop-shadow( 3px 3px 5px rgba(0, 0, 0, .25));
    }
    &__name {
        font-size: 4.25rem;
        color: #eee;
        text-transform: uppercase;
        font-family: 'Zuume', sans-serif;
    }
    &__logo {
        height: 200%;
    }
}
</style>