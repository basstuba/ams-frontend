<template>
    <div class="all-user">
        <h2 class="all-user__title">個人別勤怠一覧</h2>
        <div class="search">
            <input class="search-input" type="text" v-model="search.name" placeholder="名前で検索">
            <input class="search-input" type="text" v-model="search.number" placeholder="社員番号で検索">
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
                    <option v-for="department in departments" :key="department.id"
                        :value="department.department_name">
                        {{ department.department_name }}
                    </option>
                </select>
            </div>
            <button class="search-button" @click="searchReset">検索リセット</button>
        </div>
        <table class="all-user__table">
            <tr class="data-title">
                <th class="title-name">名前</th>
                <th class="title-name">社員番号</th>
                <th class="title-name">社員区分</th>
                <th class="title-name">所属部門</th>
            </tr>
            <tr class="data-item" v-for="user in getUsers" :key="user.id">
                <td class="item-detail">{{ user.name }}</td>
                <td class="item-detail">{{ user.number }}</td>
                <td class="item-detail">{{ user.role }}</td>
                <td class="item-detail">{{ user.department }}</td>
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
            <paginate v-if="(getPageCount > 1)" :page-count="getPageCount" :page-range="3" :margin-pages="2"
                :prev-text="'&lt;'" :next-text="'&gt;'" :click-handler="clickCallback" :container-class="'paginate'"
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
            roles: [],
            departments: [],
            perPage: null,
            currentPage: null,
            search: {
                name: '',
                number: '',
                role: '',
                department: '',
            },
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
        searchReset() {
            this.search = {
                name: '',
                number: '',
                role: '',
                department: '',
            };
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
            return this.users.filter(user => {
                return (!this.search.name || user.name.includes(this.search.name)) &&
                    (!this.search.number || user.number.includes(this.search.number)) &&
                    (!this.search.role || user.role === this.search.role) &&
                    (!this.search.department || user.department === this.search.department);
            });
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
        this.getSelectRole();
        this.getSelectDepartment();
    },
};
</script>

<style scoped>
.all-user {
    text-align: center;
    padding: 2rem;
}

.all-user__title {
    font-size: 2rem;
    font-weight: 100;
    margin-bottom: 1.5rem;
}

.search {
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

.all-user__table {
    width: 70%;
    background-color: #F1F1F1;
    margin: 1rem auto;
    border-collapse: collapse;
}

.title-name {
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

.item-button {
    text-align: right;
    border-bottom: 0.1rem solid #252525;
    padding: 0.5rem 0;
}

.button-detail {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 3rem;
    cursor: pointer;
}

.button-detail:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.button-fixes {
    color: #fff;
    background: linear-gradient(to bottom, #00C91E 30%, #006C10 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1.5rem;
    cursor: pointer;
}

.button-fixes:hover {
    background: linear-gradient(to bottom, #00e022 30%, #009016 90%);
}

.button-add {
    color: #fff;
    background: linear-gradient(to bottom, #FFA049 30%, #C96C00 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1.5rem;
    cursor: pointer;
}

.button-add:hover {
    background: linear-gradient(to bottom, #ffad60 30%, #ff8800 90%);
}

.pagination {
    width: 30%;
    margin: 1.5rem auto 0;
}

@media screen and (max-width: 1024px) {
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

    .all-user__table {
        width: 90%;
    }

    .title-name {
        font-size: larger;
    }

    .item-detail {
        font-size: large;
    }

    .button-detail,
    .button-fixes,
    .button-add {
        font-size: medium;
    }
}

@media screen and (max-width: 820px) {
    .all-user__title {
        font-size: 2rem;
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

    .all-user__table {
        width: 100%;
    }

    .title-name {
        font-size: large;
    }

    .item-detail {
        font-size: medium;
    }

    .button-detail,
    .button-fixes,
    .button-add {
        font-size: smaller;
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
    color: #2563EB;
    background-color: #fff;
    border: 0.1rem solid #2563EB;
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
    background-color: #2563EB;
}

@media screen and (max-width: 820px) {
    .page-item__link,
    .prev-item__link,
    .next-item__link {
        font-size: smaller;
        padding: 0.3rem 0.7rem;
    }
}
</style>