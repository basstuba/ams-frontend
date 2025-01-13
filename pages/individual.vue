<template>
    <div class="individual">
        <h2 class="individual-title">個別登録</h2>
        <div class="individual-content">
            <validation-observer ref="obs" v-slot="ObserverProps">
                <form class="individual-form" @submit.prevent="ObserverProps.handleSubmit(registration)">
                    <validation-provider v-slot="{ errors }" rules="required|max:20">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationName">氏名</label>
                            <input class="item-input" type="text" id="registrationName" v-model="name" name="氏名"
                                placeholder="氏名を入力してください">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|email">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationEmail">メールアドレス</label>
                            <input class="item-input" type="email" id="registrationEmail" v-model="email" name="メールアドレス"
                                placeholder="メールアドレスを入力してください">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|min:8">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationPassword">パスワード</label>
                            <input class="item-input" type="text" id="registrationPassword" v-model="password"
                                name="パスワード" placeholder="パスワードを入力してください">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required|number_format">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationNumber">社員番号</label>
                            <input class="item-input" type="text" id="registrationNumber" v-model="number" name="社員番号"
                                placeholder="社員番号を入力してください">
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationRole">社員区分</label>
                            <div class="item-select__wrap">
                                <select class="item-select" id="registrationRole" v-model="role" name="社員区分">
                                    <option value="" disabled selected>選択してください</option>
                                    <option v-for="role in roles" :key="role.id" :value="role.role_name">
                                        {{ role.role_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <validation-provider v-slot="{ errors }" rules="required">
                        <div class="individual-form__item">
                            <label class="item-title" for="registrationDepartment">所属部門</label>
                            <div class="item-select__wrap">
                                <select class="item-select" id="registrationDepartment" v-model="department"
                                    name="所属部門">
                                    <option value="" disabled selected>選択してください</option>
                                    <option v-for="department in departments" :key="department.id"
                                        :value="department.department_name">
                                        {{ department.department_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="error">&emsp;{{ errors[0] }}</div>
                    </validation-provider>
                    <div class="action-button">
                        <button class="individual-form__button" type="submit">登録</button>
                        <button class="reset-button" @click="formReset">表示リセット</button>
                    </div>
                </form>
            </validation-observer>
        </div>
    </div>
</template>

<script>
export default {
    layout: 'another',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            number: '',
            role: '',
            department: '',
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
        async registration() {
            try {
                const { data } = await this.$axios.post('http://localhost/api/auth/individual_register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    number: this.number,
                    role: this.role,
                    department: this.department,
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
        formReset() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.number = '';
            this.role = '';
            this.department = '';
            alert('入力欄をリセットしました')
        },
    },
    created() {
        this.getSelectRole();
        this.getSelectDepartment();
    }
}
</script>

<style scoped>
.individual {
    text-align: center;
    padding: 2rem;
}

.individual-title {
    font-size: 2rem;
    font-weight: 100;
}

.individual-content {
    width: 55%;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem 4rem;
    margin: 2rem auto;
}

.individual-form__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.item-title {
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
    position: relative;
    width: 50%;
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

.action-button {
    display: flex;
    justify-content: right;
    align-items: center;
}

.individual-form__button {
    color: #fff;
    background: linear-gradient(to bottom, #5384FF 30%, #0131A8 90%);
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.5rem 4rem;
    margin-right: 1rem;
    cursor: pointer;
}

.individual-form__button:hover {
    background: linear-gradient(to bottom, #6e97ff 30%, #0041e4 90%);
}

.reset-button {
    color: #fff;
    background: linear-gradient(to bottom, #adadad 30%, #545454 90%);
    border: none;
    border-radius: 0.8rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: large;
    padding: 0.3rem 1rem;
    margin: 0 5rem 0 1rem;
    cursor: pointer;
}

.reset-button:hover {
    background: linear-gradient(to bottom, #c9c9c9 30%, #636363 90%);
}

@media screen and (max-width: 1024px) {
    .individual-content {
        width: 70%;
        padding: 2rem;
    }

    .reset-button {
        margin: 0 3rem 0 1rem;
    }
}

@media screen and (max-width: 820px) {
    .individual-content {
        width: 80%;
    }

    .item-title {
        font-size: large;
    }

    .item-select__wrap::after {
        right: 0.8rem;
        border: 6px solid transparent;
        border-top: 11px solid #2563EB;
    }

    .item-input,
    .item-select {
        font-size: smaller;
    }

    .individual-form__button {
        font-size: large;
    }

    .reset-button {
        font-size: smaller;
        margin: 0 2rem 0 0.5rem;
    }
}
</style>