<template>
    <div class="add">
        <div class="user-name">{{ userData.name }}</div>
        <div class="add-content">
            <validation-observer ref="obs" v-slot="ObserverProps">
                <form class="add-form" @submit.prevent="ObserverProps.handleSubmit(workAdd)">
                    <validation-provider v-slot="{ errors }" rules="required">
                        <div class="add-form__item">
                            <label class="add-form__item-title" for="addDate">日付を入力</label>
                            <input class="add-form__item-input" type="date" id="addDate" v-model="date" name="日付">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|time_format">
                        <div class="add-form__item">
                            <label class="add-form__item-title" for="addWorkStart">出勤時間を入力</label>
                            <input class="add-form__item-input" type="text" id="addWorkStart" v-model="workStart"
                                name="出勤時間" placeholder="HH:MM:SS">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|time_format">
                        <div class="add-form__item">
                            <label class="add-form__item-title" for="addWorkEnd">退勤時間を入力</label>
                            <input class="add-form__item-input" type="text" id="addWorkEnd" v-model="workEnd"
                                name="退勤時間" placeholder="HH:MM:SS">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="time_format">
                        <div class="add-form__item">
                            <label class="add-form__item-title" for="addBreakTotal">休憩時間を入力</label>
                            <input class="add-form__item-input" type="text" id="addBreakTotal" v-model="breakTotal"
                                name="休憩時間" placeholder="HH:MM:SS">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <button class="add-form__button" type="submit">追加</button>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            date: '',
            workStart: '',
            workEnd: '',
            breakTotal: '',
            userData: []
        };
    },
    methods: {
        async getUserData() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/user_data', {
                    user_id: this.$route.params.id
                });
                this.userData = data.user_data;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`従業員氏名の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async workAdd() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/work_add', {
                    user_id: this.userData.id,
                    date: this.date,
                    work_start: this.workStart,
                    work_end: this.workEnd,
                    break_total: this.breakTotal
                });
                alert(data.message);
                this.resetForm();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        resetForm() {
            this.date = '';
            this.workStart = '';
            this.workEnd = '';
            this.breakTotal = '';
        },
    },
    created() {
        this.getUserData();
    },
};
</script>

<style scoped>
.add {
    text-align: center;
    padding: 2rem;
}

.user-name {
    font-size: xx-large;
}

.add-content {
    width: 60%;
    background-color: #FFEACE;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    padding: 2rem;
    margin: 2rem auto;
}

.add-form__item {
    width: 70%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
}

.add-form__item-title {
    color: #63594F;
    font-size: xx-large;
}

.add-form__item-input {
    width: 50%;
    border: 0.1rem solid #EBA958;
    font-size: x-large;
    padding: 0.3rem 0.5rem;
    cursor: pointer;
}

.add-form__item-input:focus-visible {
    outline: 0;
}

.error {
    width: 70%;
    color: #FF0202;
    font-size: large;
    text-align: left;
    margin: 0 auto;
}

.add-form__button {
    background-color: #FFD49F;
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: xx-large;
    padding: 0.5rem 4rem;
    cursor: pointer;
}

@media screen and (max-width: 1024px) {
    .add-content {
        width: 80%;
    }
}

@media screen and (max-width: 820px) {
    .add-content {
        width: 90%;
    }

    .add-form__item-title {
        font-size: x-large;
    }

    .add-form__item-input {
        font-size: larger;
    }

    .add-form__button {
        font-size: x-large;
    }
}
</style>