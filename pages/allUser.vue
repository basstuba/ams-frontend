<template>
    <div class="all-user">
        <h2 class="all-user__title">個人別勤怠一覧</h2>
        <div class="search">
            <input class="search-input" type="text" v-model="keyword" placeholder="名前で検索">
        </div>
        <table class="all-user__table">
            <tr class="data-title">
                <th class="title-name">名前</th>
            </tr>
            <tr class="data-item" v-for="user in getUsers" :key="user.id">
                <td class="item-detail">{{ user.name }}</td>
                <td class="item-button">
                    <button class="button-detail" @click="linkWorkConfirm(user.id)">勤怠確認</button>
                </td>
                <td class="item-button">
                    <button class="button-fixes" @click="linkWorkFixes(user.id)">勤怠修正</button>
                </td>
                <td class="item-button">
                    <button class="button-add" @click="linkWorkAdd(user.id)">勤怠追加</button>
                </td>
            </tr>
        </table>
        <div class="pagination">
            <paginate v-if="(getPageCount > 1)"
                :page-count="getPageCount" :page-range="3" :margin-pages="2" :prev-text="'&lt;'"
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
            keyword: '',
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
        linkWorkFixes(id) {
            this.$router.push(`/fixes/${id}`);
        },
        linkWorkAdd(id) {
            this.$router.push(`/add/${id}`);
        },
        clickCallback(pageNum) {
            this.currentPage = Number(pageNum);
        },
    },
    computed: {
        filteredUsers() {
            if (!this.keyword) return this.users;
            return this.users.filter(user => user.name.includes(this.keyword));
        },
        getUsers() {
            let current = this.currentPage * this.perPage;
            let start = current - this.perPage;

            return this.filteredUsers.slice(start, current);
        },
        getPageCount() {
            return Math.ceil(this.filteredUsers.length / this.perPage);
        },
    },
    created() {
        this.getUsersData();
    },
};
</script>

<style scoped>
.all-user {
    text-align: center;
    padding: 2rem;
}

.all-user__title {
    font-size: 3rem;
    font-weight: 100;
    margin-bottom: 1.5rem;
}

.search-input {
    border: 0.1rem solid #FFD49F;
    font-size: x-large;
    padding: 0.2rem 1rem;
    cursor: pointer;
}

.search-input:focus-visible {
    outline: 0;
}

.all-user__table {
    width: 50%;
    margin: 1rem auto;
    border-collapse: collapse;
}

.title-name {
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

.item-button {
    font-size: x-large;
    text-align: right;
    border-bottom: 0.1rem solid #94816A;
    padding: 0.5rem 0;
}

.button-detail {
    background-color: #FFD49F;
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 3rem;
}

.button-fixes,
.button-add {
    background-color: #FFD49F;
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1.5rem;
}

.pagination {
    width: 30%;
    margin: 2rem auto 0;
}

@media screen and (max-width: 1024px) {
    .all-user__table {
        width: 70%;
    }
}

@media screen and (max-width: 820px) {
    .all-user__table {
        width: 90%;
    }
}
</style>

<style>
.paginate {
    display: flex;
    justify-content: center;
    padding-left: 0;
    list-style: none;
}

.page-item__link,
.prev-item__link,
.next-item__link {
    color: #FCA63C;
    background-color: #fff;
    border: 0.1rem solid #FFD49F;
    display: block;
    font-size: larger;
    padding: 0.5rem 1rem;
}

.page-item__link,
.prev-item__link {
    margin-right: -0.1rem;
}

.page-active__item a {
    color: #fff;
    background-color: #FFD49F;
}
</style>