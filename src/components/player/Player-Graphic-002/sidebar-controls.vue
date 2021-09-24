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
            <label class="form-row__label" for="alert">Graphic Headline</label>
            <input class="form-row__input" type="text" placeholder="Breaking, Alert, Etc." v-model.lazy="alert" @change="$emit('updateAlert', alert)">
        </div>
        <div class="form-row">
            <label class="form-row__label" for="alert">Graphic Action</label>
            <input class="form-row__input" type="text" placeholder="Re-Signing, Cut, Etc." v-model.lazy="action" @change="$emit('updateAction', action)">
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
            backgroundImage: null,
            team: 0,
            player: {
                firstName: '',
                lastName: ''
            },
            alert: 'Breaking',
            action: 'Re-Signing',
            custom: {
                use: false,
                logo: null,
                primaryColor: '#aaaaaa',
                secondaryColor: '#111111'
            },
            textures: {
                strength: 40,
                image: 0
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