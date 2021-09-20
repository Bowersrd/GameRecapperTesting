<template>
    <div class="form-container">
        <div class="form-header">
            <span class="form-header__text">Recap Setup</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">Player Background Image</label>
            <input type="file" accept="image/*" @change="handleImage" ref="fileInput">
            <img class="form-row__image" :src="backgroundImage" alt="Image of background" v-show="backgroundImage">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Choose Team</label>
            <select class="form-row__input" name="team" v-model="team" @change="$emit('updateTeam', team)" :disabled="custom.use">
                <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
            </select>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Use Custom Team?</label>
            <input type="checkbox" v-model="custom.use" @change="$emit('updateCustomTeam', custom)">
        </div>  
        <div v-show="custom.use">
            <div class="form-header">
                <span class="form-header__text">Custom Team Info</span>
            </div>
            <div class="form-row">
                <label class="form-row__label" for="title">Team Logo</label>
                <input type="file" accept="image/*" @change="handleLogo" ref="fileInput">
                <img class="form-row__image" :src="custom.logo" alt="Image of background" v-show="custom.logo">
            </div>
            <div class="form-row form-row--flex">
                <div class="form-row form-row__split">
                    <label class="form-row__label" for="title">Team Primary Color</label>
                    <input type="color" class="form-row__color" v-model="custom.primaryColor">
                </div>
                <div class="form-row form-row__split">
                    <label class="form-row__label" for="title">Team Secondary Color</label>
                    <input type="color" class="form-row__color" v-model="custom.secondaryColor">    
                </div>
            </div>
        </div>
        <div class="form-header">
            <span class="form-header__text">Player Info</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">First Name</label>
            <input class="form-row__input" type="text" placeholder="Patrick" v-model.lazy="player.firstName" @change="$emit('updatePlayer', player)">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">Last Name</label>
            <input class="form-row__input" type="text" placeholder="Mahomes" v-model.lazy="player.lastName" @change="$emit('updatePlayer', player)">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">Stat Line</label>
            <input class="form-row__input" type="text" placeholder="24/37, 378 Yds, 4 TD, 5 Rush Att, 32 Yds" v-model.lazy="player.statLine" @change="$emit('updatePlayer', player)">
        </div>
        <div class="form-header">
            <span class="form-header__text">Additional Controls</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">Texture Opacity ({{ textures.texture }}%) - Default is 35%</label>
            <input class="form-row__slider" type="range" min="0" max="100" v-model="textures.texture" @change="$emit('updateTextures', textures)">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="title">Accent Opacity ({{ textures.accent }}%) - Default is 75%</label>
            <input class="form-row__slider" type="range" min="0" max="100" v-model="textures.accent" @change="$emit('updateTextures', textures)">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            backgroundImage: null,
            team: 0,
            player: {
                firstName: '',
                lastName: '',
                statLine: ''
            },
            title: 'Player of the Game',
            custom: {
                use: false,
                logo: null,
                primaryColor: '#cccccc',
                secondaryColor: '#111111'
            },
            textures: {
                texture: 35,
                accent: 75
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
                this.$emit('updateImage', e.target.result);
            };
            reader.readAsDataURL(image);
        },
        handleLogo(e) {
            const image = e.target.files[0];
            this.createBase64Logo(image);
        },
        createBase64Logo(image) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.custom.logo = e.target.result;
                this.$emit('updateCustomTeam', this.custom);
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