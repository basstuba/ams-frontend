<template>
    <div class="all-user">
        <h2 class="all-user__title">個人別勤怠一覧</h2>
        <div class="search">
            <input class="search-input" type="text">
        </div>
        <table class="all-user__table">
            <tr class="data-title">
                <th class="title-name">名前</th>
            </tr>
            <tr class="data-item" v-for="user in getUsers" :key="user.id">
                <td class="item-detail">{{ user.name }}</td>
                <td class="item-detail">
                    <button @click="linkWorkConfirm(user.id)">勤怠確認</button>
                </td>
            </tr>
        </table>
        <div class="pagination">
            <paginate :page-count="getPageCount" :page-range="3" :margin-pages="2" :prev-text="'&lt;'"
                :next-text="'&gt;'" :click-handler="clickCallback" :container-class="'paginate'"
                :page-class="'page-item'" :page-link-class="'page-item__link'" :active-class="'page-active__item'"
                :prev-class="'prev-item'" :prev-link-class="'prev-item__link'" :next-class="'next-item'"
                :next-link-class="'next-item__link'">
            </paginate>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            users: [],
            perPage: null,
            currentPage: null,
        };
    },
    methods: {
        async getUsersData() {
            try {
                const { data } = await this.$axios.get('http://localhost/api/auth/all_user');
                this.users = data.users;
                this.perPage = 5;
                this.currentPage = 1;
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`従業員一覧の取得に失敗しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        linkWorkConfirm(id) {
            this.$router.push(`/monthly/${id}`);
        },
        clickCallback(pageNum) {
            this.currentPage = Number(pageNum);
        },
    },
    computed: {
        getUsers() {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;

            return this.users.slice(start, current);
        },
        getPageCount() {
            return Math.ceil(this.users.length / this.perPage);
        },
    },
    created() {
        this.getUsersData();
    },
};
</script>