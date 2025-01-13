<template>
    <div class="change">
        <h2 class="change-title">従業員情報変更</h2>
        <div class="change-content">
            <div class="change-content__search">
                <label class="search-title" for="changeNumber">社員番号で検索</label>
                <validation-observer ref="obs" v-slot="ObserverProps">
                    <form class="search-form" @submit.prevent="ObserverProps.handleSubmit(numberSearch)">
                        <validation-provider v-slot="{ errors }" rules="required|number_format">
                            <div class="search-item">
                                <input class="search-input" type="text" id="changeNumber" v-model="number"
                                    name="社員番号" placeholder="社員番号を入力してください">
                                <button class="search-button" type="submit">検索</button>
                            </div>
                            <div class="search-error">&emsp;{{ errors[0] }}</div>
                        </validation-provider>
                    </form>
                </validation-observer>
            </div>
            <div class="change-content__main" v-if="searchData && Object.keys(searchData).length > 0">
                <validation-observer ref="obs" v-slot="ObserverProps">
                    <form class="main-form" @submit.prevent="ObserverProps.handleSubmit(() => userUpdate(searchData))">
                        <div class="main-item__display">
                            <div class="display-name">氏名</div>
                            <div class="display-field">{{ searchData.name }}</div>
                        </div>
                        <validation-provider v-slot="{ errors }" rules="required|email">
                            <div class="main-form__item">
                                <label class="item-name" for="changeEmail">メールアドレス</label>
                                <input class="item-input" type="email" id="changeEmail" v-model="searchData.email"
                                    name="メールアドレス">
                            </div>
                            <div class="error">&emsp;{{ errors[0] }}</div>
                        </validation-provider>
                        <validation-provider v-slot="{ errors }" rules="min:8">
                            <div class="main-form__item">
                                <label class="item-name" for="changePassword">パスワード（任意）</label>
                                <input class="item-input" type="text" id="changePassword" v-model="password"
                                    name="パスワード" placeholder="変更の場合は入力してください">
                            </div>
                            <div class="error">&emsp;{{ errors[0] }}</div>
                        </validation-provider>
                        <div class="main-item__display">
                            <div class="display-name">社員番号</div>
                            <div class="display-field">{{ searchData.number }}</div>
                        </div>
                        <validation-provider v-slot="{ errors }" rules="required">
                            <div class="main-form__item">
                                <label class="item-name" for="changeRole">社員区分</label>
                                <div class="item-select__wrap">
                                    <select class="item-select" id="changeRole" v-model="searchData.role" name="社員区分">
                                        <option value="" disabled>選択してください</option>
                                        <option v-for="role in roles" :key="role.id" :value="role.role_name">
                                            {{ role.role_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="error">&emsp;{{ errors[0] }}</div>
                        </validation-provider>
                        <validation-provider v-slot="{ errors }" rules="required">
                            <div class="main-form__item">
                                <label class="item-name" for="changeDepartment">所属部門</label>
                                <div class="item-select__wrap">
                                    <select class="item-select" id="changeDepartment" v-model="searchData.department" name="所属部門">
                                        <option value="" disabled>選択してください</option>
                                        <option v-for="department in departments" :key="department.id"
                                            :value="department.department_name">
                                            {{ department.department_name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="error">&emsp;{{ errors[0] }}</div>
                        </validation-provider>
                        <input type="hidden" v-model="searchData.id">
                        <button class="main-form__button" type="submit">変更</button>
                    </form>
                </validation-observer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            password: '',
            number: '',
            searchData: null,
            roles: [],
            departments: [],
        }
    },
    methods: {
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
        async numberSearch() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/individual_search', {
                    number: this.number,
                });
                this.searchData = data.search_data;
                this.resetPassword();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        async userUpdate(searchData) {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/information_change', {
                    id: searchData.id,
                    email: searchData.email,
                    role: searchData.role,
                    department: searchData.department,
                    ...(this.password && { password: this.password }),
                });
                alert(data.message);
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
        resetPassword() {
            this.password = '';
        },
    },
    created() {
        this.getSelectRole();
        this.getSelectDepartment();
    }
}
</script>

<style scoped>
.change {
    text-align: center;
    padding: 2rem;
}

.change-title {
    font-size: 2rem;
    font-weight: 100;
}

.change-content {
    width: 55%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem 4rem;
    margin: 2rem auto;
}

.search-title {
    font-size: larger;
    font-weight: bold;
}

.search-item {
    margin: 0.5rem 0;
}

.search-input {
    width: 40%;
    background-color: #F9FAFB;
    border: 1px solid #2563EB;
    font-size: large;
    padding: 0.3rem;
    cursor: pointer;
}

.search-input:focus-visible {
    outline: 0;
}

.search-button {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 0.7rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1rem;
    margin-left: 0.5rem;
    cursor: pointer;
}

.search-button:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.search-error {
    color: #FF0202;
}

.main-item__display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
}

.display-name {
    color: #4A4A4A;
    font-size: x-large;
}

.display-field {
    width: 50%;
    text-align: left;
    background-color: #F1F1F1;
    border-bottom: 0.1rem solid #252525;
    font-size: large;
    padding: 0.5rem 0 0 0.5rem;
}

.main-form__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.item-name {
    color: #4A4A4A;
    font-size: x-large;
}

.item-input {
    width: 50%;
    background-color: #F9FAFB;
    border: 1px solid #2563EB;
    font-size: large;
    padding: 0.3rem;
    cursor: pointer;
}

.item-input:focus-visible {
    outline: 0;
}

.item-select__wrap {
    width: 50%;
    position: relative;
}

.item-select__wrap::after {
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

.item-select {
    width: 100%;
    background-color: #F9FAFB;
    border: 1px solid #2563EB;
    font-size: large;
    padding: 0.3rem;
    cursor: pointer;
    appearance: none;
}

.item-select:focus-visible {
    outline: 0;
}

.error {
    color: #FF0202;
    text-align: left;
}

.main-form__button {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.5rem 4rem;
    cursor: pointer;
}

.main-form__button:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

@media screen and (max-width: 1024px) {
    .change-content {
        width: 70%;
    }

    .search-input {
        width: 50%;
    }
}

@media screen and (max-width: 820px) {
    .change-content {
        width: 80%;
    }

    .search-input {
        font-size: smaller;
    }

    .search-button {
        font-size: smaller;
    }

    .display-name,
    .item-name {
        font-size: large;
    }

    .display-field {
        font-size: smaller;
    }

    .item-input,
    .item-select {
        font-size: smaller;
    }

    .item-select__wrap::after {
        right: 0.8rem;
        border: 6px solid transparent;
        border-top: 11px solid #2563EB;
    }

    .main-form__button {
        font-size: large;
    }
}
</style>