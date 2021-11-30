<template>
    <div class="section">
        <rankingGraphic>
            <button class="btn" @click="downloadImage">Download</button>
        </rankingGraphic>
    </div>
</template>

<script>
import rankingGraphic from '@/components/ranking/Ranking-Graphic-001/ranking-graphic.vue';

import domtoimage from 'dom-to-image';

export default {
    components: {
        rankingGraphic
    },
    methods: {
        filter (node) {
            return (node.id !== 'image-control' && node.id !== 'image-control-right');
        },
        downloadImage() {
            domtoimage.toJpeg(document.getElementById('graphic'), {filter: this.filter}, { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'Ranking Graphic 001.jpeg';
                link.href = dataUrl;
                link.click();
            });
        }
    }
}
</script>