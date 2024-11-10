<template>
    <div class="daily">
        <h2 class="daily-title">日付別勤怠一覧</h2>
        <div class="export">
            <Export :works="works" />
        </div>
        <div class="search">
            <div class="search-date__before">
                <img class="before-icon" @click="dayBefore" src="../assets/images/left-triangle.png" alt="前日">
            </div>
            <div class="search-date">{{ formattedDate }}</div>
            <div class="search-date__after">
                <img class="after-icon" @click="dayAfter" src="../assets/images/right-triangle.png" alt="翌日">
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
                    <Modal :rests=work.rests />
                </td>
                <td class="item-detail">{{ work.work_time }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            on_the_day: null,
            day_before: null,
            day_after: null,
            works: []
        };
    },
    computed: {
        formattedDate() {
            const [year, month, day] = this.on_the_day.split('-');
            return `${parseInt(month)}月${parseInt(day)}日`;
        },
    },
    methods: {
        async getDailyData() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/yesterday');
                this.on_the_day = data.on_the_day;
                this.day_before = data.day_before;
                this.day_after = data.day_after;
                this.works = data.works;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async dayBefore() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/day_before', {
                    day_before: this.day_before,
                });
                this.on_the_day = data.on_the_day;
                this.day_before = data.day_before;
                this.day_after = data.day_after;
                this.works = data.works;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async dayAfter() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/day_after', {
                    day_after: this.day_after,
                });
                this.on_the_day = data.on_the_day;
                this.day_before = data.day_before;
                this.day_after = data.day_after;
                this.works = data.works;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
    },
    created() {
        this.getDailyData();
    },
};
</script>