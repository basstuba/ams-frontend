<template>
    <div class="fixes">
        <div class="user-name">{{ userData.name }}</div>
        <div class="fixes-content">
            <div class="search__work-day">
                <label class="search-title" for="workSearch">修正する勤務日を入力</label>
                <input class="search-input" type="date" id="workSearch" @change="submitSearchDate" v-model="searchDate">
            </div>
            <div class="work-container" v-for="work in searchWorkData" :key="work.id">
                <div class="work-detail">
                    <div class="work-data__title">
                        <div class="work-data__title-name">日付</div>
                        <div class="work-data__title-name">出勤</div>
                        <div class="work-data__title-name">退勤</div>
                        <div class="work-data__title-name">休憩時間</div>
                        <div class="work-data__title-name">勤務時間</div>
                    </div>
                    <validation-observer ref="obs" v-slot="ObserverProps">
                        <form class="work-data__item-form"
                            @submit.prevent="ObserverProps.handleSubmit(() => workFixes(work))">
                            <div class="work-data__item">
                                <div class="work-data__item-detail">
                                    {{ work.date }}
                                </div>
                                <div class="work-data__item-detail">
                                    <validation-provider v-slot="{ errors }" rules="required|time_format">
                                        <input class="work-data__item-input" type="text" v-model="work.work_start"
                                            name="出勤時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </validation-provider>
                                </div>
                                <div class="work-data__item-detail">
                                    <validation-provider v-slot="{ errors }" rules="required|time_format">
                                        <input class="work-data__item-input" type="text" v-model="work.work_end"
                                            name="退勤時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </validation-provider>
                                </div>
                                <div class="work-data__item-detail">
                                    <validation-provider v-slot="{ errors }" rules="required|time_format">
                                        <input class="work-data__item-input" type="text" v-model="work.break_total"
                                            name="休憩時間">
                                        <div class="error">&emsp;{{ errors[0] }}</div>
                                    </validation-provider>
                                </div>
                                <div class="work-data__item-detail">
                                    {{ work.work_time }}
                                </div>
                                <div class="work-data__item-detail">
                                    <input type="hidden" v-model="work.id" name="workId">
                                    <button class="fixes-button" type="submit">修正</button>
                                </div>
                            </div>
                        </form>
                    </validation-observer>
                </div>
                <div class="rest-detail">
                    <div class="rest-data__title" v-if="work.rests && work.rests.length > 0">
                        <div class="rest-data__title-name">休憩開始</div>
                        <div class="rest-data__title-name">休憩終了</div>
                        <div class="rest-data__title-name">休憩時間</div>
                        <div class="rest-data__title-name">&emsp;</div>
                    </div>
                    <div class="rest-container" v-for="rest in work.rests" :key="rest.id">
                        <validation-observer ref="obs" v-slot="ObserverProps">
                            <form class="rest-data__item-form"
                                @submit.prevent="ObserverProps.handleSubmit(() => restFixes(rest))">
                                <div class="rest-data__item">
                                    <div class="rest-data__item-detail">
                                        <validation-provider v-slot="{ errors }" rules="required|time_format">
                                            <input class="rest-data__item-input" type="text" v-model="rest.break_start"
                                                name="休憩開始時間">
                                            <div class="error">&emsp;{{ errors[0] }}</div>
                                        </validation-provider>
                                    </div>
                                    <div class="rest-data__item-detail">
                                        <validation-provider v-slot="{ errors }" rules="required|time_format">
                                            <input class="rest-data__item-input" type="text" v-model="rest.break_end"
                                                name="休憩終了時間">
                                            <div class="error">&emsp;{{ errors[0] }}</div>
                                        </validation-provider>
                                    </div>
                                    <div class="rest-data__item-detail">
                                        {{ rest.break_time }}
                                    </div>
                                    <div class="rest-data__item-detail">
                                        <input type="hidden" v-model="rest.id" name="restId">
                                        <button class="fixes-button" type="submit">修正</button>
                                    </div>
                                </div>
                            </form>
                        </validation-observer>
                    </div>
                </div>
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
            searchWorkData: [],
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
                console.log(data.search_work_data);
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

<style scoped>
.fixes {
    text-align: center;
    padding: 2rem;
}

.user-name {
    font-size: xx-large;
}

.fixes-content {
    width: 80%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    padding: 2rem;
    margin: 0 auto;
}

.search-title {
    font-size: larger;
    font-weight: bold;
}

.search-input {
    display: block;
    background-color: #F9FAFB;
    border: 0.1rem solid #2563EB;
    font-size: x-large;
    padding: 0.3rem 1rem;
    margin: 0.5rem auto;
    cursor: pointer;
}

.search-input:focus-visible {
    outline: 0;
}

.work-detail {
    width: 80%;
    margin: 2rem auto;
}

.work-data__title,
.rest-data__title {
    background-color: #F1F1F1;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0.5rem 0;
}

.work-data__title-name {
    width: 16%;
    color: #4A4A4A;
    font-size: x-large;
    text-align: left;
}

.work-data__item,
.rest-data__item {
    display: flex;
    justify-content: left;
    align-items: baseline;
    border-bottom: 0.1rem solid #252525;
    margin-top: 1rem;
}

.work-data__item-detail {
    width: 16%;
    text-align: left;
    font-size: larger;
}

.work-data__item-input {
    width: 80%;
    background-color: #F9FAFB;
    border: 0.1rem solid #2563EB;
    padding: 0 0.3rem;
    cursor: pointer;
}

.work-data__item-input:focus-visible,
.rest-data__item-input:focus-visible {
    outline: 0;
}

.error {
    color: #FF0202;
}

.fixes-button {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 0.7rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1rem;
    cursor: pointer;
}

.fixes-button:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.rest-detail {
    width: 60%;
    margin: 2rem auto;
}

.rest-data__title-name {
    width: 25%;
    color: #4A4A4A;
    font-size: x-large;
    text-align: left;
}

.rest-data__item-detail {
    width: 25%;
    text-align: left;
    font-size: larger;
}

.rest-data__item-input {
    width: 70%;
    background-color: #F9FAFB;
    border: 0.1rem solid #2563EB;
    padding: 0 0.3rem;
    cursor: pointer;
}

@media screen and (max-width: 1024px) {
    .search-input {
        font-size: larger;
    }

    .work-detail {
        width: 90%;
    }

    .work-data__title-name,
    .rest-data__title-name {
        font-size: larger;
    }

    .work-data__item-detail,
    .rest-data__item-detail {
        font-size: medium;
    }

    .work-data__item-input {
        width: 90%;
    }

    .rest-data__item-input {
        width: 80%;
    }
}

@media screen and (max-width: 820px) {
    .search-title {
        font-size: large;
    }

    .search-input {
        font-size: large;
    }

    .fixes-content {
        width: 95%;
        padding: 2rem 1rem;
    }

    .work-detail {
        width: 100%;
    }

    .rest-detail {
        width: 80%;
    }

    .fixes-button {
        font-size: smaller;
    }
}
</style>