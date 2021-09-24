<template>
    <div class="section">
        <tradeGraphic>
            <button class="btn" @click="downloadImage">Download</button>
        </tradeGraphic>
    </div>
</template>

<script>
import tradeGraphic from '@/components/trade/Trade-Graphic-001/trade-graphic.vue';

import domtoimage from 'dom-to-image';

export default {
    components: {
        tradeGraphic
    },
    methods: {
        filter (node) {
            return (node.id !== 'image-control' && node.id !== 'image-control-right');
        },
        downloadImage() {
            domtoimage.toJpeg(document.getElementById('graphic'), {filter: this.filter}, { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'Trade Graphic 001.jpeg';
                link.href = dataUrl;
                link.click();
            });
        }
    }
}
</script>