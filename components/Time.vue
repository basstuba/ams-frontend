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

@media screen and (max-width: 820px) {
    .time {
        font-size: 6rem;
    }
}

@media screen and (max-width: 431px) {
    .time {
        font-size: 5rem;
    }
}

@media screen and (max-width: 376px) {
    .time {
        font-size: 4rem;
    }
}

@media screen and (max-width: 321px) {
    .time {
        font-size: 3rem;
    }
}
</style>