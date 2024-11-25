<template>
    <div class="button">
        <div class="content-message">&emsp;{{ message }}</div>
        <div class="first-button" v-if="(work.work_start && work.work_end) || (!work.work_start && !work.work_end)">
            <button class="work-start" @click="workStart">勤務開始</button>
        </div>
        <div class="second-button" v-else>
            <button class="break-start" @click="breakStart"
                v-if="(rest.break_start && rest.break_end) || (!rest.break_start && !rest.break_end)">
                休憩開始
            </button>
            <button class="break-end" @click="breakEnd" v-else>休憩終了</button>
            <button class="work-end" @click="workEnd">勤務終了</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: null,
        }
    },
    props: {
        work: {
            type: Object,
            required: true,
        },
        rest: {
            type: Object,
            required: true,
        },
    },
    methods: {
        async workStart() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/work_start', {
                    user_id: this.$auth.user.id,
                });
                this.message = data.message;
                this.$emit('update-work', data.work);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async breakStart() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/break_start', {
                    user_id: this.$auth.user.id,
                });
                this.message = data.message;
                this.$emit('update-break', data.rest);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async breakEnd() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/break_end', {
                    user_id: this.$auth.user.id,
                });
                this.message = data.message;
                this.$emit('update-break', data.rest);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async workEnd() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/work_end', {
                    user_id: this.$auth.user.id,
                });
                this.message = data.message;
                this.$emit('update-work', data.work);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
    },
};
</script>

<style scoped>
.content-message {
    font-size: x-large;
}

.first-button,
.second-button {
    margin-top: 1rem;
    width: 100%;
}

.work-start {
    width: 30%;
    background-color: #A2CEFA;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: 3rem;
    padding: 2rem 0;
    cursor: pointer;
}

.work-start:hover {
    background-color: #60afff;
}

.break-start,
.break-end {
    display: block;
    width: 30%;
    background-color: #DBF1CE;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: 3rem;
    padding: 1rem;
    margin: 0 auto 2rem;
    cursor: pointer;
}

.break-start:hover,
.break-end:hover {
    background-color: #9ad478;
}

.work-end {
    width: 30%;
    background-color: #A2CEFA;
    border: none;
    border-radius: 0.5rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: 3rem;
    padding: 1rem 0;
    cursor: pointer;
}

.work-end:hover {
    background-color: #60afff;
}

@media screen and (max-width: 1024px) {
    .work-start,
    .break-start,
    .break-end,
    .work-end {
        width: 40%;
    }

}

@media screen and (max-width: 820px) {
    .content-message {
        font-size: larger;
    }

    .work-start,
    .break-start,
    .break-end,
    .work-end {
        width: 50%;
    }
}

@media screen and (max-width: 431px) {
    .work-start,
    .break-start,
    .break-end,
    .work-end {
        width: 60%;
        font-size: xx-large;
    }
}

@media screen and (max-width: 321px) {
    .content-message {
        font-size: medium;
    }

    .work-start,
    .break-start,
    .break-end,
    .work-end {
        width: 70%;
    }
}
</style>