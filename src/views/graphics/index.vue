<template>
    <div class="section">
        <div id="graphics-container">
            <div class="graphic">
                <img class="graphic__image" src="@/assets/images/graphics/001.jpeg" alt="001 Player Graphic">
                <button class="btn graphic__button" @click="$router.push('/graphics/player/001')">Create Graphic</button>
            </div>
            <div class="graphic">
                <img class="graphic__image" src="@/assets/images/graphics/002.jpeg" alt="002 Player Graphic">
                <button class="btn graphic__button" @click="$router.push('/graphics/player/002')">Create Graphic</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/main.scss";

.section {
    flex-direction: column;
    padding: 10rem 5rem;
}

#graphics-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding-top: 5rem;
}

.graphic {
    @include flex-center;
    flex-direction: column;
    gap: 1vw;
    margin-left: 3rem;
    &__image {
        height: 15vw;
    }
    &__button {
        font-size: 1.8rem;
    }
}   
</style>