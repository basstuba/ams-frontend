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