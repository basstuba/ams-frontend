<template>
    <div class="monthly">
        <div class="user-name">{{ userData.name }}</div>
        <div class="export-component">
            <Export :exportDate="thisMonth" :exportWorkData="filteredMonthWorks" />
        </div>
        <div class="search">
            <div class="search-date__before">
                <img class="before-icon" @click="getMonthBefore" src="../../assets/images/left-triangle.png" alt="前月">
            </div>
            <div class="search-date">{{ formattedMonth }}</div>
            <div class="search-date__after">
                <img class="after-icon" @click="getMonthAfter" src="../../assets/images/right-triangle.png" alt="翌月">
            </div>
        </div>
        <table class="monthly-table">
            <tr class="data-title">
                <th class="title-name">日付</th>
                <th class="title-name">出勤</th>
                <th class="title-name">退勤</th>
                <th class="title-name">休憩時間</th>
                <th class="title-name">休憩詳細</th>
                <th class="title-name">勤務時間</th>
            </tr>
            <tr class="data-item" v-for="work in workLists" :key="work.id">
                <td class="item-detail">{{ getFormattedWorkDate(work.date) }}</td>
                <td class="item-detail">{{ work.work_start }}</td>
                <td class="item-detail">{{ work.work_end }}</td>
                <td class="item-detail">{{ work.break_total }}</td>
                <td class="item-detail">
                    <button class="modal-open" @click="openModal(work.rests)">詳細</button>
                </td>
                <td class="item-detail">{{ work.work_time }}</td>
            </tr>
            <tr class="total-time">
                <th class="title-name">総労働時間</th>
                <td>&emsp;</td>
                <td>&emsp;</td>
                <td>&emsp;</td>
                <td>&emsp;</td>
                <td class="total-time__count">{{ totalWorkTime }}</td>
            </tr>
        </table>
        <div class="modal-component">
            <Modal v-if="isModalOpen" :modalRestsData="selectedRests" @close="isModalOpen = false" />
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            formattedMonth: null,
            thisMonth: null,
            monthBefore: null,
            monthAfter: null,
            totalWorkTime: null,
            userData: [],
            workLists: [],
            filteredMonthWorks: [],
            selectedRests: [],
            isModalOpen: false,
        }
    },
    methods: {
        async getMonthlyData() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/this_month', {
                    user_id: this.$route.params.id,
                });
                this.thisMonth = data.this_month;
                this.monthBefore = data.month_before;
                this.monthAfter = data.month_after;
                this.userData = data.user_data;
                this.workLists = data.work_lists;
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
                this.getFilteredMonthWorksData();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getMonthBefore() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/month_before', {
                    user_id: this.$route.params.id,
                    month_before: this.monthBefore,
                });
                this.thisMonth = data.this_month;
                this.monthBefore = data.month_before;
                this.monthAfter = data.month_after;
                this.userData = data.user_data;
                this.workLists = data.work_lists;
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
                this.getFilteredMonthWorksData();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getMonthAfter() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/month_after', {
                    user_id: this.$route.params.id,
                    month_after: this.monthAfter,
                });
                this.thisMonth = data.this_month;
                this.monthBefore = data.month_before;
                this.monthAfter = data.month_after;
                this.userData = data.user_data;
                this.workLists = data.work_lists;
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
                this.getFilteredMonthWorksData();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        getFormattedMonthDate() {
            const [year, month] = this.thisMonth.split('-');
            this.formattedMonth = `${parseInt(year)}年${parseInt(month)}月度`;
        },
        getFormattedWorkDate(date) {
            const [year, month, day] = date.split('-');
            return `${parseInt(month)}月${parseInt(day)}日`;
        },
        getTotalWorkTime() {
            const totalSeconds = this.workLists.reduce((sum, work) => {
                const [hours, minutes, seconds] = work.work_time.split(':').map(Number);
                return sum + hours * 3600 + minutes * 60 + seconds;
            }, 0);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            this.totalWorkTime =
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        },
        getFilteredMonthWorksData() {
            const filteredData = this.workLists.map(work => ({
                日付: this.getFormattedWorkDate(work.date),
                勤務開始: work.work_start,
                勤務終了: work.work_end,
                休憩時間: work.break_total,
                勤務時間: work.work_time
            }));

            filteredData.push({
                日付: '総労働時間',
                勤務開始: '',
                勤務終了: '',
                休憩時間: '',
                勤務時間: this.totalWorkTime
            });

            this.filteredMonthWorks = filteredData;
        },
        openModal(rests) {
            this.selectedRests = rests;
            this.isModalOpen = true;
        },
    },
    created() {
        this.getMonthlyData();
    },
};
</script>

<style scoped>
.monthly {
    text-align: center;
    padding: 2rem;
}

.user-name {
    font-size: 3rem;
}

.export-component {
    text-align: right;
    margin: 0.5rem 0;
}

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.search-date__before,
.search-date__after {
    text-align: center;
}

.before-icon,
.after-icon {
    width: 30%;
    display: inline;
    cursor: pointer;
}

.search-date {
    font-size: xx-large;
}

.monthly-table {
    width: 70%;
    margin: 0 auto;
    border-collapse: collapse;
}

.title-name {
    width: 15%;
    color: #63594F;
    font-size: x-large;
    text-align: left;
}

.item-detail {
    font-size: x-large;
    text-align: left;
    border-bottom: 0.1rem solid #94816A;
    padding: 0.5rem 0;
}

.total-time__count {
    font-size: x-large;
    text-align: left;
    padding: 0.5rem 0;
}

.modal-open {
    color: #63594F;
    background-color: #FFD49F;
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    padding: 0.1rem 1rem;
    cursor: pointer;
}

.modal-component {
    width: 25%;
    position: fixed;
    top: 15rem;
    right: 5rem;
}

@media screen and (max-width: 1024px) {
    .monthly-table {
        width: 90%;
    }
}

@media screen and (max-width: 820px) {
    .monthly-table {
        width: 100%;
    }

    .title-name {
        font-size: larger;
    }

    .item-detail {
        font-size: larger;
    }

    .total-time__count {
        font-size: larger;
    }
}
</style>