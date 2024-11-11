<template>
    <div class="daily">
        <h2 class="daily-title">日付別勤怠一覧</h2>
        <div class="export">
            <Export :exportDate="onTheDay" :exportWorkData="filteredWorks" />
        </div>
        <div class="search">
            <div class="search-date__before">
                <img class="before-icon" @click="getDayBefore" src="../assets/images/left-triangle.png" alt="前日">
            </div>
            <div class="search-date">{{ formattedDay }}</div>
            <div class="search-date__after">
                <img class="after-icon" @click="getDayAfter" src="../assets/images/right-triangle.png" alt="翌日">
            </div>
        </div>
        <table class="daily-table">
            <tr class="data-title">
                <th class="title-name">名前</th>
                <th class="title-name">出勤</th>
                <th class="title-name">退勤</th>
                <th class="title-name">休憩時間</th>
                <th class="title-name">休憩詳細</th>
                <th class="title-name">勤務時間</th>
            </tr>
            <tr class="data-item" v-for="work in works" :key="work.id">
                <td class="item-detail">{{ work.user.name }}</td>
                <td class="item-detail">{{ work.work_start }}</td>
                <td class="item-detail">{{ work.work_end }}</td>
                <td class="item-detail">{{ work.break_total }}</td>
                <td class="item-detail">
                    <button class="modal-open" @click="openModal(work.rests)">詳細</button>
                </td>
                <td class="item-detail">{{ work.work_time }}</td>
            </tr>
        </table>
        <Modal v-if="isModalOpen" :modalRestsData="selectedRests" @close="isModalOpen = false" />
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            formattedDay: null,
            onTheDay: null,
            dayBefore: null,
            dayAfter: null,
            works: [],
            filteredWorks: [],
            isModalOpen: false,
            selectedRests: [],
        };
    },
    methods: {
        async getDailyData() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/yesterday');
                this.onTheDay = data.on_the_day;
                this.dayBefore = data.day_before;
                this.dayAfter = data.day_after;
                this.works = data.works;
                this.getFilteredWorksData();
                this.formattedDate();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getDayBefore() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/day_before', {
                    day_before: this.dayBefore,
                });
                this.onTheDay = data.on_the_day;
                this.dayBefore = data.day_before;
                this.dayAfter = data.day_after;
                this.works = data.works;
                this.isModalOpen = false;
                this.getFilteredWorksData();
                this.formattedDate();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getDayAfter() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/day_after', {
                    day_after: this.dayAfter,
                });
                this.onTheDay = data.on_the_day;
                this.dayBefore = data.day_before;
                this.dayAfter = data.day_after;
                this.works = data.works;
                this.isModalOpen = false;
                this.getFilteredWorksData();
                this.formattedDate();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        getFilteredWorksData() {
            const filteredData = this.works.map(work => ({
                氏名: work.user.name,
                勤務開始: work.work_start,
                勤務終了: work.work_end,
                休憩時間: work.break_total,
                勤務時間: work.work_time
            }));
            this.filteredWorks = filteredData;
        },
        formattedDate() {
            const [year, month, day] = this.onTheDay.split('-');
            this.formattedDay = `${parseInt(month)}月${parseInt(day)}日`;
        },
        openModal(rests) {
            this.selectedRests = rests;
            this.isModalOpen = true;
        },
    },
    created() {
        this.getDailyData();
    },
};
</script>