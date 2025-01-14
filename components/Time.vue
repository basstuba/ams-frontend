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
    color: #202124;
    font-size: 6rem;
    letter-spacing: -0.2rem;
}

@media screen and (max-width: 820px) {
    .time {
        font-size: 5rem;
    }
}

@media screen and (max-width: 431px) {
    .time {
        font-size: 4rem;
    }
}

@media screen and (max-width: 376px) {
    .time {
        font-size: 3.5rem;
    }
}

@media screen and (max-width: 321px) {
    .time {
        font-size: 3rem;
    }
}
</style>