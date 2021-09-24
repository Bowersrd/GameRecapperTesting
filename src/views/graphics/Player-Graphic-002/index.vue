<template>
    <div class="section">
        <playerGraphic>
            <button class="btn" @click="downloadImage">Download</button>
        </playerGraphic>
    </div>
</template>

<script>
import playerGraphic from '@/components/player/Player-Graphic-002/player-graphic.vue';

import domtoimage from 'dom-to-image';

export default {
    components: {
        playerGraphic
    },
    methods: {
        filter (node) {
            return (node.id !== 'image-control');
        },
        downloadImage() {
            domtoimage.toJpeg(document.getElementById('graphic'), {filter: this.filter, style: { opacity: 1 }}, { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'Player Graphic 002.jpeg';
                link.href = dataUrl;
                link.click();
            });
        }
    }
}
</script>