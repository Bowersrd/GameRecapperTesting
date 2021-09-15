<template>
    <div class="container">
        <div id="recap-container">
            <div id="background" :style="{ backgroundImage: 'url(' + customImage + ')' }"></div>
        </div>
        <input type="file" accept="image/*" @change="handleImage">
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        image: String,
    },
    data() {
        return {
            customImage: null
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
                this.customImage = e.target.result;
            };
            reader.readAsDataURL(image);
        }
    }
}
</script>

<style>
.container {
    width: 50%;
}

#recap-container {
    width: 70rem;
    height: 40rem;
    background: #333;
}

#background {
    width: 100%;
    height: 100%;
    background-size: cover;
}
</style>