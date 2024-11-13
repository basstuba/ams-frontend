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
                <td class="item-detail">{{ work.date }}</td>
                <td class="item-detail">{{ work.work_start }}</td>
                <td class="item-detail">{{ work.work_end }}</td>
                <td class="item-detail">{{ work.break_total }}</td>
                <td class="item-detail">
                    <button class="modal-open" @click="openModal(work.rests)">詳細</button>
                </td>
                <td class="item-detail">{{ work.work_time }}</td>
            </tr>
        </table>
        <div class="item-total">
            <div class="total-title">総労働時間</div>
            <div class="total-count">{{ totalWorkTime }}</div>
        </div>
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
            userData: [],
            totalWorkTime: null,
            workLists: [],
            filteredMonthWorks: [],
            isModalOpen: false,
            selectedRests: [],
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
                this.getFilteredMonthWorksData();
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
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
                this.getFilteredMonthWorksData();
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
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
                this.getFilteredMonthWorksData();
                this.getFormattedMonthDate();
                this.getTotalWorkTime();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        getFilteredMonthWorksData() {
            const filteredData = this.workLists.map(work => ({
                日付: work.date,
                勤務開始: work.work_start,
                勤務終了: work.work_end,
                休憩時間: work.break_total,
                勤務時間: work.work_time
            }));
            this.filteredMonthWorks = filteredData;
        },
        getFormattedMonthDate() {
            const [year, month] = this.thisMonth.split('-');
            this.formattedMonth = `${parseInt(year)}年${parseInt(month)}月度`;
        },
        getTotalWorkTime() {
            const totalSeconds = this.workLists.reduce((sum, work) => {
                const [hours, minutes, seconds] = work.work_time.split(':').map(Number);
                return sum + hours * 3600 + minutes * 60 + seconds;
            }, 0);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            this.totalWorkTime = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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