<template>
    <div class="form-container">
        <div class="form-header">
            <span class="form-header__text">Graphic Info</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="background">League Logo</label>
            <input type="file" accept="image/*" @change="handleImage" ref="fileInput">
            <!-- <img class="form-row__image" :src="lTeam.backgroundImage" alt="Image of background" v-show="lTeam.backgroundImage"> -->
        </div>
        <div class="form-row form-row--flex" v-for="index in 10" :key="index">
            <div class="form-row__split">
                <label class="form-row__label" for="team">Team {{ index }}</label>
                <select class="form-row__input" name="team" v-model="teams[index - 1].id" @change="$emit('updateTeams', teams)">
                    <option :value="team.id" v-for="team in nflTeams" :key="team.id">{{ team.city }} {{ team.mascot }}</option>
                </select>
            </div>
            <div class="form-row__split">
                <label class="form-row__label" for="awayColor">Preferred Color</label>
                <select class="form-row__input" name="awayTeamColor" v-model="teams[index - 1].color" @change="$emit('updateTeams', teams)">
                    <option value="primaryColor">Primary</option>
                    <option value="secondaryColor">Secondary</option>
                    <option value="neutral">Neutral</option>
                </select>
            </div>
        </div>
        <div class="form-header">
            <span class="form-header__text">Additional Controls</span>
        </div>
        <div class="form-row">
            <label class="form-row__label" for="team">Team Container Border</label>
            <input class="form-row__checkbox" type="checkbox" v-model="border.active" @change="$emit('updateBorder', border)">
            <input class="form-row__color" type="color" v-model="border.color" @change="$emit('updateBorder', border)">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            logo: null,
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

.form-row__checkbox {
    width: 10%;
    height: 2.5rem;
    cursor: pointer;
}

.form-row__color {
    width: 90%;
    cursor: pointer;
}
</style>