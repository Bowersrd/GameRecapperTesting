<template>
    <div class="form-container">
        <div class="form-header">
            <span class="form-header__text">Left Team Info</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">Player Background Image</label>
            <input type="file" accept="image/*" @change="handleImage" ref="fileInput">
            <img class="form-row__image" :src="lTeam.backgroundImage" alt="Image of background" v-show="lTeam.backgroundImage">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Choose Team</label>
            <select class="form-row__input" name="team" v-model="lTeam.id" @change="$emit('updateLeftTeam', lTeam.id)" :disabled="lCustom.use">
                <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="awayColor">Preferred Color</label>
            <select class="form-row__input" name="awayTeamColor" v-model="lTeam.color" @change="$emit('updateLeftColor', lTeam.color)">
                <option value="primaryColor">Primary</option>
                <option value="secondaryColor">Secondary</option>
                <option value="neutral">Neutral</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">Players Receiving ({{ lTeam.players.length }})</label>
            <button class="form-row__button" @click="addPlayer('left')">Add Player</button>
            <input class="form-row__input" type="text" placeholder="HB Christian McCaffrey" v-model.lazy="lTeam.players[index].player" @change="$emit('updateLeftPlayers', lTeam.players)" v-for="(player, index) in lTeam.players" :key="player.id">
        </div>
        <div class="form-header">
            <span class="form-header__text">Right Team Info</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">Player Background Image</label>
            <input type="file" accept="image/*" @change="handleRightImage" ref="fileInput">
            <img class="form-row__image" :src="rTeam.backgroundImage" alt="Image of background" v-show="rTeam.backgroundImage">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Choose Team</label>
            <select class="form-row__input" name="team" v-model="rTeam.id" @change="$emit('updateRightTeam', rTeam.id)" :disabled="rCustom.use">
                <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="awayColor">Preferred Color</label>
            <select class="form-row__input" name="awayTeamColor" v-model="rTeam.color" @change="$emit('updateRightColor', rTeam.color)">
                <option value="primaryColor">Primary</option>
                <option value="secondaryColor">Secondary</option>
                <option value="neutral">Neutral</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">Players Receiving ({{ rTeam.players.length }})</label>
            <button class="form-row__button" @click="addPlayer('right')">Add Player</button>
            <input class="form-row__input" type="text" placeholder="2022 1st Round Draft Pick" v-model.lazy="rTeam.players[index].player" @change="$emit('updateRightPlayers', rTeam.players)" v-for="(player, index) in rTeam.players" :key="player.id">
        </div>
        <div class="form-header">
            <span class="form-header__text">Additional Controls</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Choose Texture</label>
            <select class="form-row__input" name="texture" v-model="textures.image" @change="$emit('updateTextures', textures)">
                <option :value="0">Texture 1</option>
                <option :value="1">Texture 2</option>
                <option :value="2">Texture 3</option>
                <option :value="3">Texture 4</option>
                <option :value="4">Texture 5</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">Texture Opacity ({{ textures.strength }}%) - Default is 40%</label>
            <input class="form-row__slider" type="range" min="0" max="100" v-model="textures.strength" @change="$emit('updateTextures', textures)">
        </div>
    </div>
</template>

<script>
export default {
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
                strength: 40,
                image: 0
            }
        }
    },
    methods: {
        addPlayer(side) {
            if (side === 'left') {
                const playerObj = {
                    id: this.lTeam.players.length,
                    player: ''
                }
                this.lTeam.players.push(playerObj);
            } else {
                const playerObj = {
                    id: this.rTeam.players.length,
                    player: ''
                }
                this.rTeam.players.push(playerObj);
            }
        },
        handleImage(e) {
            const image = e.target.files[0];
            this.createBase64Image(image);
        },
        createBase64Image(image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.lTeam.backgroundImage = e.target.result;
                this.$emit('updateLeftImage', e.target.result);
            };
            reader.readAsDataURL(image);
        },
        handleRightImage(e) {
            const image = e.target.files[0];
            this.createBase64RightImage(image);
        },
        createBase64RightImage(image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.rTeam.backgroundImage = e.target.result;
                this.$emit('updateRightImage', e.target.result);
            };
            reader.readAsDataURL(image);
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
.form-row__split {
    padding: 0;
}
</style>