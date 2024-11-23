<template>
    <div class="fixes">
        <div class="user-name">{{ userData.name }}</div>
        <div class="fixes-content">
            <div class="search__work-day">
                <label class="search-title" for="workSearch">修正する勤務日を入力</label>
                <input class="search-input" type="date" id="workSearch" @change="submitSearchDate" v-model="searchDate">
            </div>
            <div class="work-container" v-for="work in searchWorkData" :key="work.id">
                <table class="work-detail">
                    <tr class="work-data__title">
                        <th class="work-data__title-name">日付</th>
                        <th class="work-data__title-name">出勤</th>
                        <th class="work-data__title-name">退勤</th>
                        <th class="work-data__title-name">休憩時間</th>
                        <th class="work-data__title-name">勤務時間</th>
                        <th class="work-data__title-name">&emsp;</th>
                    </tr>
                    <tr class="work-data__item">
                        <validation-observer ref="obs" v-slot="ObserverProps">
                            <form class="work-data__item-form" @submit.prevent="ObserverProps.handleSubmit(() => workFixes(work))">
                                <td class="work-data__item-detail">
                                    {{ work.date }}
                                </td>
                                <validation-provider v-slot="{ errors }" rules="required|time_format">
                                    <td class="work-data__item-detail">
                                        <input class="work-data__item-input" type="text" v-model="work.work_start" name="出勤時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </td>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" rules="required|time_format">
                                    <td class="work-data__item-detail">
                                        <input class="work-data__item-input" type="text" v-model="work.work_end" name="退勤時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </td>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" rules="required|time_format">
                                    <td class="work-data__item-detail">
                                        <input class="work-data__item-input" type="text" v-model="work.break_total" name="休憩時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </td>
                                </validation-provider>
                                <td class="work-data__item-detail">
                                    {{ work.work_time }}
                                </td>
                                <td class="work-data__item-detail">
                                    <input type="hidden" v-model="work.id" name="workId">
                                    <button class="fixes-button" type="submit">修正</button>
                                </td>
                            </form>
                        </validation-observer>
                    </tr>
                </table>
                <table v-if="work.rests" class="rest-detail">
                    <tr class="rest-data__title">
                        <th class="rest-data__title-name">休憩開始</th>
                        <th class="rest-data__title-name">休憩終了</th>
                        <th class="rest-data__title-name">休憩時間</th>
                        <th class="rest-data__title-name">&emsp;</th>
                    </tr>
                    <tr class="rest-data__item" v-for="rest in work.rests" :key="rest.id">
                        <validation-observer ref="obs" v-slot="ObserverProps">
                            <form class="rest-data__item-form" @submit.prevent="ObserverProps.handleSubmit(() => restFixes(rest))">
                                <validation-provider v-slot="{ errors }" rules="required|time_format">
                                    <td class="rest-data__item-detail">
                                        <input class="rest-data__item-input" type="text" v-model="rest.break_start" name="休憩開始時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </td>
                                </validation-provider>
                                <validation-provider v-slot="{ errors }" rules="required|time_format">
                                    <td class="rest-data__item-detail">
                                        <input class="rest-data__item-input" type="text" v-model="rest.break_end" name="休憩終了時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </td>
                                </validation-provider>
                                <td class="rest-data__item-detail">
                                    {{ rest.break_time }}
                                </td>
                                <td class="rest-data__item-detail">
                                    <input type="hidden" v-model="rest.id" name="restId">
                                    <button class="fixes-button" type="submit">修正</button>
                                </td>
                            </form>
                        </validation-observer>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            searchDate: '',
            userData: [],
            searchWorkData: []
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
        async submitSearchDate() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/date_search', {
                    user_id: this.userData.id,
                    search_date: this.searchDate
                });
                this.searchWorkData = data.search_work_data.map(work => ({
                    ...work,
                    break_total: work.break_total ?? '00:00:00'
                }));
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤務日の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async workFixes(work) {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/work_fixes', {
                    work_id: work.id,
                    work_start: work.work_start,
                    work_end: work.work_end,
                    break_total: work.break_total
                });
                this.submitSearchDate();
                alert(data.message);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async restFixes(rest) {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/rest_fixes', {
                    rest_id: rest.id,
                    break_start: rest.break_start,
                    break_end: rest.break_end
                });
                this.submitSearchDate();
                alert(data.message);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
    },
    created() {
        this.getUserData();
    },
};
</script>