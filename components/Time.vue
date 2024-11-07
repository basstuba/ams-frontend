<template>
    <div class="time">{{ currentTime }}</div>
</template>

<script>
export default {
    data() {
        return {
            currentTime: new Date().toLocaleTimeString(),
            timer: null,
        };
    },
    methods: {
        updateCurrentTime() {
            this.currentTime = new Date().toLocaleTimeString();
        },
    },
    mounted() {
        this.timer = setInterval(this.updateCurrentTime, 1000);
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
};
</script>

<style scoped>
.time {
    color: #4F546C;
    font-size: 8rem;
}
</style>