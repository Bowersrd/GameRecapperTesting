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
            <div class="graphic">
                <img class="graphic__image" src="@/assets/images/graphics/trade-001.jpeg" alt="001 Trade Graphic">
                <button class="btn graphic__button" @click="$router.push('/graphics/trade/001')">Create Graphic</button>
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
    @media screen and (max-width: 76.9rem) {
        padding: 8rem 2rem;
    }
}

#graphics-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
    padding-top: 5rem;
    @media screen and (max-width: 76.9rem) {
        flex-direction: column;
        align-items: center;
    }
}

.graphic {
    @include flex-center;
    flex-direction: column;
    gap: 2rem;
    margin-left: 3rem;
    @media screen and (max-width: 76.9rem) {
        margin-bottom: 3rem;
    }
    &__image {
        max-width: 72rem;
        max-height: 40rem;
        height: 80%;
        width: 100%;
    }
    &__button {
        font-size: 1.6rem;
    }
}   
</style>