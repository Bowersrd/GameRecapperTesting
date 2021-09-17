<template>
    <form id="form-wrapper" @submit.prevent="test">
        <div id="form-container">
            <div class="form-header">
                <span class="form-header__text">Recap Setup</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="background">Background Image</label>
                <input type="file" accept="image/*" @change="handleImage" ref="fileInput">
                <img class="form-row__image" :src="backgroundImage" alt="Image of background" v-show="backgroundImage">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Recap Title</label>
                <input class="form-row__input" type="text" placeholder="League Name, Stadium Name, Etc." v-model.lazy="title" @change="$emit('changeTitle', title)">
            </div>
            <div class="form-header">
                <span class="form-header__text">Away Info</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="awayTeam">Choose Away Team</label>
                <select class="form-row__input" name="awayTeam" v-model="awayTeam" @change="changeTeam('away')">
                    <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
                </select>
            </div>
            <div class="form-row form-row--flex">
                <div class="form-row__split">
                    <label class="form-row__label" for="awayRecord">Team Record</label>
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="W" v-model.lazy="awayRecord.wins" @change="$emit('changeAwayRecord', awayRecord)"> -
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="L" v-model.lazy="awayRecord.losses" @change="$emit('changeAwayRecord', awayRecord)"> -
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="T" v-model.lazy="awayRecord.ties" @change="$emit('changeAwayRecord', awayRecord)">
                </div>
                <div class="form-row__split form-row__split--large">
                    <label class="form-row__label" for="awayColor">Preferred Color</label>
                    <select class="form-row__input" name="awayTeamColor" v-model="awayColor" @change="$emit('changeAwayColor', awayColor)">
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>
            </div>
            <div class="form-header">
                <span class="form-header__text">Home Info</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="homeTeam">Choose Home Team</label>
                <select class="form-row__input" name="homeTeam" v-model="homeTeam" @change="changeTeam('home')">
                    <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
                </select>
            </div>
            <div class="form-row form-row--flex">
                <div class="form-row__split">
                    <label class="form-row__label" for="homeRecord">Team Record</label>
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="W" v-model.lazy="homeRecord.wins" @change="$emit('changeHomeRecord', homeRecord)"> -
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="L" v-model.lazy="homeRecord.losses" @change="$emit('changeHomeRecord', homeRecord)"> -
                    <input class="form-row__input form-row__input--small form-row__input--center" type="number" min="0" placeholder="T" v-model.lazy="homeRecord.ties" @change="$emit('changeHomeRecord', homeRecord)">
                </div>
                <div class="form-row__split form-row__split--large">
                    <label class="form-row__label" for="homeColor">Preferred Color</label>
                    <select class="form-row__input" name="homeTeamColor" v-model="homeColor" @change="$emit('changeHomeColor', homeColor)">
                        <option value="primaryColor">Primary</option>
                        <option value="secondaryColor">Secondary</option>
                        <option value="neutral">Neutral</option>
                    </select>
                </div>
            </div>
            <div class="form-header">
                <span class="form-header__text">Game Info</span>
            </div>
            <div class="form-row form-row--flex">
                <div class="form-row__split">
                    <label class="form-row__label" for="title">Away Score</label>
                    <input class="form-row__input" type="number" min="0" placeholder="Score of Game" v-model.lazy="awayScore" @change="$emit('changeAwayScore', awayScore)">
                </div>
                <div class="form-row__split">
                    <label class="form-row__label" for="title">Home Score</label>
                    <input class="form-row__input" type="number" min="0" placeholder="Score of Game" v-model.lazy="homeScore" @change="$emit('changeHomeScore', homeScore)">
                </div>
            </div>
            <div class="form-header">
                <span class="form-header__text">Away Game Stats</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 1</label>
                <input class="form-row__input" type="text" placeholder="Peyton Manning" v-model.lazy="awayStats[0].name" @change="$emit('changeAwayStats', awayStats)">
                <input class="form-row__input" type="text" placeholder="20/27, 261 Yds, 2 TD" v-model.lazy="awayStats[0].stat" @change="$emit('changeAwayStats', awayStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 2</label>
                <input class="form-row__input" type="text" placeholder="Barry Sanders" v-model.lazy="awayStats[1].name" @change="$emit('changeAwayStats', awayStats)">
                <input class="form-row__input" type="text" placeholder="19 ATT, 127 RUSH YDS, RUSH TD, 4 REC, 23 REC YDS" v-model.lazy="awayStats[1].stat" @change="$emit('changeAwayStats', awayStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 3</label>
                <input class="form-row__input" type="text" placeholder="Marvin Harrison" v-model.lazy="awayStats[2].name" @change="$emit('changeAwayStats', awayStats)">
                <input class="form-row__input" type="text" placeholder="5 REC, 101 REC YDS, REC TD" v-model.lazy="awayStats[2].stat" @change="$emit('changeAwayStats', awayStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 4</label>
                <input class="form-row__input" type="text" placeholder="Jerry Rice" v-model.lazy="awayStats[3].name" @change="$emit('changeAwayStats', awayStats)">
                <input class="form-row__input" type="text" placeholder="4 REC, 58 REC YDS, REC TD" v-model.lazy="awayStats[3].stat" @change="$emit('changeAwayStats', awayStats)">
            </div>
            <div class="form-header">
                <span class="form-header__text">Home Game Stats</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 1</label>
                <input class="form-row__input" type="text" placeholder="Peyton Manning" v-model.lazy="homeStats[0].name" @change="$emit('changeHomeStats', homeStats)">
                <input class="form-row__input" type="text" placeholder="20/27, 261 Yds, 2 TD" v-model.lazy="homeStats[0].stat" @change="$emit('changeHomeStats', homeStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 2</label>
                <input class="form-row__input" type="text" placeholder="Barry Sanders" v-model.lazy="homeStats[1].name" @change="$emit('changeHomeStats', homeStats)">
                <input class="form-row__input" type="text" placeholder="19 ATT, 127 RUSH YDS, RUSH TD, 4 REC, 23 REC YDS" v-model.lazy="homeStats[1].stat" @change="$emit('changeHomeStats', homeStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 3</label>
                <input class="form-row__input" type="text" placeholder="Marvin Harrison" v-model.lazy="homeStats[2].name" @change="$emit('changeHomeStats', homeStats)">
                <input class="form-row__input" type="text" placeholder="5 REC, 101 REC YDS, REC TD" v-model.lazy="homeStats[2].stat" @change="$emit('changeHomeStats', homeStats)">
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Player 4</label>
                <input class="form-row__input" type="text" placeholder="Jerry Rice" v-model.lazy="homeStats[3].name" @change="$emit('changeHomeStats', homeStats)">
                <input class="form-row__input" type="text" placeholder="4 REC, 58 REC YDS, REC TD" v-model.lazy="homeStats[3].stat" @change="$emit('changeHomeStats', homeStats)">
            </div>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            backgroundImage: null,
            title: '',
            awayTeam: 0,
            homeTeam: 14,
            awayRecord: {
                wins: null,
                losses: null,
                ties: null
            },
            homeRecord: {
                wins: null,
                losses: null,
                ties: null
            },
            awayScore: 0,
            homeScore: 0,
            awayColor: 'primaryColor',
            homeColor: 'primaryColor',
            awayStats: [
                {name: '', stat: ''},
                {name: '', stat: ''},
                {name: '', stat: ''},
                {name: '', stat: ''},
            ],
            homeStats: [
                {name: '', stat: ''},
                {name: '', stat: ''},
                {name: '', stat: ''},
                {name: '', stat: ''},
            ],
        }
    },
    methods: {
        selectImage() {
            this.$refs.fileInput.click();
        },
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
        changeTeam(side) {
            side === 'away' ? this.$emit('changeAwayTeam', this.awayTeam) : this.$emit('changeHomeTeam', this.homeTeam);
        },
        test() {
            console.log('Updated')
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
$primary-color: #25394d;
$secondary-color: #0e0f17;
$white: #eee;
$gray: #c9cccc;
$highlight: #feb91f;

#form-wrapper {
    min-width: 42rem;
    width: 42rem;
    height: 100vh;
    background: $white;
    border-right: 2px solid $gray;
    overflow: auto;
}

#form-container {
    width: 100%;
    text-align: left;
    font-size: 1.4rem;
    color: $primary-color;
}

.form-row {
    width: 100%;
    margin-bottom: 2rem;
    padding: 0 2rem;
    &--flex {
        display: flex;
    }
    &__label {
        font-weight: 500;
        margin: 0.5rem 0;
        display: block;
    }
    &__image {
        max-height: 20rem;
        margin-top: 1rem;
    }
    &__input {
        background: $white;
        border: 1px solid $gray;
        padding: 0.75rem 1rem;
        width: 100%;
        font-size: 1.4rem;
        margin: 0.25rem 0;
        &--small {
            width: calc(100% / 3.5);
        }
        &--center {
            text-align: center;
        }
    }
    &__split {
        width: 50%;
        &:first-of-type {
            margin-right: 1rem;
        }
    }
}

.form-header {
    background: #dedede;
    padding: 0.75rem 2rem;
    border-top: 1px solid $gray;
    border-bottom: 1px solid $gray;
    margin-bottom: 1rem;
    &__text {
        font-weight: 500;
        text-transform: uppercase;
    }
}
</style>