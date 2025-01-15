<template>
    <div class="daily">
        <h2 class="daily-title">日付別勤怠一覧</h2>
        <div class="export-component">
            <Export :exportDate="onTheDay" :exportWorkData="filteredWorks" />
        </div>
        <div class="daily-search">
            <input class="search-input" type="date" v-model="dateSearch" @change="searchDaily">
            <div class="search-select__wrap">
                <select class="search-select" v-model="search.role">
                    <option value="">全ての社員区分</option>
                    <option v-for="role in roles" :key="role.id" :value="role.role_name">
                        {{ role.role_name }}
                    </option>
                </select>
            </div>
            <div class="search-select__wrap">
                <select class="search-select" v-model="search.department">
                    <option value="">全ての所属部門</option>
                    <option v-for="department in departments" :key="department.id" :value="department.department_name">
                        {{ department.department_name }}
                    </option>
                </select>
            </div>
            <button class="search-button" @click="dailyReset">検索リセット</button>
        </div>
        <div class="search">
            <div class="search-date__before">
                <img class="before-icon" @click="getDayBefore" src="@/assets/images/left-triangle.png" alt="前日">
            </div>
            <div class="search-date">{{ formattedDay }}</div>
            <div class="search-date__after">
                <img class="after-icon" @click="getDayAfter" src="@/assets/images/right-triangle.png" alt="翌日">
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
            <tr class="data-item" v-for="work in filteredSearchWorks" :key="work.id">
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
        <div class="data-message" v-if="filteredSearchWorks.length === 0">
            <p class="message__no-data">該当するデータがありません</p>
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
            formattedDay: null,
            onTheDay: null,
            dayBefore: null,
            dayAfter: null,
            works: [],
            filteredWorks: [],
            isModalOpen: false,
            selectedRests: [],
            roles: [],
            departments: [],
            dateSearch: '',
            search: {
                role: '',
                department: '',
            },
        };
    },
    watch: {
        "search.role": "getFilteredWorksData",
        "search.department": "getFilteredWorksData",

        works: {
            handler: "getFilteredWorksData",
            deep: true,
        }
    },
    methods: {
        async getDailyData() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/yesterday');
                this.onTheDay = data.on_the_day;
                this.dayBefore = data.day_before;
                this.dayAfter = data.day_after;
                this.works = data.works;
                this.formattedDate();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getSelectRole() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/select_role');
                this.roles = data.roles;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`社員区分の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async getSelectDepartment() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/select_department');
                this.departments = data.departments;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`所属部門の取得に失敗しました: ${error.response.data.error}`);
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
                this.formattedDate();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`勤怠一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async searchDaily() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/daily_search', {
                    date_search: this.dateSearch,
                });
                this.onTheDay = data.on_the_day;
                this.dayBefore = data.day_before;
                this.dayAfter = data.day_after;
                this.works = data.works;
                this.isModalOpen = false;
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
            this.filteredWorks = this.filteredSearchWorks.map(work => ({
                氏名: work.user.name,
                勤務開始: work.work_start,
                勤務終了: work.work_end,
                休憩時間: work.break_total,
                勤務時間: work.work_time
            }));
        },
        formattedDate() {
            const [year, month, day] = this.onTheDay.split('-');
            this.formattedDay = `${parseInt(month)}月${parseInt(day)}日`;
        },
        openModal(rests) {
            this.selectedRests = rests;
            this.isModalOpen = true;
        },
        dailyReset() {
            this.dateSearch = '';
            this.search = {
                role: '',
                department: '',
            };
        },
    },
    computed: {
        filteredSearchWorks() {
            return this.works.filter(work => {
                return (!this.search.role || work.user.role === this.search.role) &&
                    (!this.search.department || work.user.department === this.search.department);
            });
        },
    },
    created() {
        this.getDailyData();
        this.getSelectRole();
        this.getSelectDepartment();
    },
};
</script>

<style scoped>
.daily {
    text-align: center;
    padding: 2rem;
}

.daily-title {
    font-size: 2rem;
    font-weight: 100;
}

.export-component {
    text-align: right;
}

.daily-search {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.search-input {
    width: 12%;
    border: 0.1rem solid #2563EB;
    font-size: large;
    padding: 0.2rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
}

.search-input:focus-visible {
    outline: 0;
}

.search-select__wrap {
    width: 12%;
    position: relative;
    margin: 0 0.5rem;
}

.search-select__wrap::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    top: 0.7rem;
    right: 1rem;
    border: 8px solid transparent;
    border-top: 15px solid #2563EB;
    pointer-events: none;
}

.search-select {
    width: 100%;
    border: 0.1rem solid #2563EB;
    font-size: medium;
    padding: 0.3rem;
    cursor: pointer;
    appearance: none;
}

.search-select:focus-visible {
    outline: 0;
}

.search-button {
    color: #fff;
    background: linear-gradient(to bottom, #adadad 30%, #545454 90%);
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: smaller;
    padding: 0.3rem 1rem;
    margin: 0 0.5rem;
    cursor: pointer;
}

.search-button:hover {
    background: linear-gradient(to bottom, #c9c9c9 30%, #636363 90%);
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

.daily-table {
    width: 70%;
    margin: 0 auto;
    border-collapse: collapse;
}

.data-title {
    background-color: #F1F1F1;
}

.title-name {
    width: 15%;
    color: #4A4A4A;
    font-size: x-large;
    text-align: left;
    padding: 0.5rem 0;
}

.data-item {
    background-color: #fff;
}

.item-detail {
    font-size: larger;
    text-align: left;
    border-bottom: 0.1rem solid #252525;
    padding: 0.5rem 0;
}

.modal-open {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    padding: 0.1rem 1rem;
    cursor: pointer;
}

.modal-open:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.data-message {
    width: 70%;
    background-color: #fff;
    padding: 0.5rem 0;
    margin: 0 auto;
}

.message__no-data {
    font-size: larger;
}

.modal-component {
    width: 25%;
    position: fixed;
    top: 15rem;
    right: 5rem;
}

@media screen and (max-width: 1024px) {
    .daily-search {
        margin-top: 1rem;
    }

    .search-input {
        width: 15%;
        font-size: medium;
        padding: 0.2rem 0.5rem;
    }

    .search-select__wrap {
        width: 15%;
    }

    .search-select__wrap::after {
        right: 0.5rem;
        border: 5px solid transparent;
        border-top: 10px solid #2563EB;
    }

    .search-select {
        font-size: smaller;
    }

    .search-button {
        font-size: small;
    }

    .daily-table {
        width: 90%;
    }

    .modal-open {
        font-size: smaller;
    }

    .data-message {
        width: 90%;
    }

    .message__no-data {
        font-size: large;
    }

    .modal-component {
        width: 35%;
        right: 2rem;
    }
}

@media screen and (max-width: 820px) {
    .daily-title {
        font-size: 2rem;
    }

    .daily-search {
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .search-input {
        width: 17%;
        font-size: small;
    }

    .search-select__wrap {
        width: 17%;
    }

    .search-select {
        font-size: small;
    }

    .search-button {
        font-size: x-small;
    }

    .search-date {
        font-size: x-large;
    }

    .before-icon,
    .after-icon {
        width: 25%;
    }

    .daily-table {
        width: 100%;
    }

    .title-name {
        font-size: larger;
    }

    .item-detail {
        font-size: medium;
    }

    .modal-open {
        font-size: small;
    }

    .data-message {
        width: 100%;
    }

    .message__no-data {
        font-size: medium;
    }

    .modal-component {
        width: 40%;
        top: 9rem;
    }
}
</style>