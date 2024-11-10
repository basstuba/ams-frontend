<template>
    <div class="register">
        <h2 class="register-title">新規登録</h2>
        <validation-observer ref="obs" v-slot="ObserverProps">
            <form class="register-form" @submit.prevent="ObserverProps.handleSubmit(register)">
                <validation-provider v-slot="{ errors }" rules="required|max:20">
                    <div class="register-item">
                        <img class="item-icon" src="../assets/images/human.png" alt="名前" />
                        <input class="item-input" type="text" v-model="name" placeholder="name" name="お名前"
                            autocomplete="name" />
                    </div>
                    <div class="error">&emsp;{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" rules="required|email">
                    <div class="register-item">
                        <img class="item-icon" src="../assets/images/mail.png" alt="メールアドレス" />
                        <input class="item-input" type="email" v-model="email" placeholder="email" name="メールアドレス"
                            autocomplete="email" />
                    </div>
                    <div class="error">&emsp;{{ errors[0] }}</div>
                </validation-provider>
                <validation-provider v-slot="{ errors }" rules="required|min:8">
                    <div class="register-item">
                        <img class="item-icon" src="../assets/images/key.png" alt="パスワード" />
                        <input class="item-input" type="text" v-model="password" placeholder="password" name="パスワード"
                            autocomplete="current-password" />
                    </div>
                    <div class="error">&emsp;{{ errors[0] }}</div>
                </validation-provider>
                <button class="register-button" type="submit">登録</button>
            </form>
        </validation-observer>
    </div>
</template>

<script>
export default {
    auth: false,
    data() {
        return {
            name: null,
            email: null,
            password: null
        };
    },
    methods: {
        async register() {
            try {
                const response = await this.$axios.post('http://localhost/api/auth/register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                alert(response.data.message);
                this.$router.push('/login');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.error) {
                    alert(`エラーが発生しました: ${error.response.data.error}`);
                } else {
                    alert('予期せぬエラーが発生しました');
                }
            }
        },
    },
};
</script>

<style scoped>
.register {
    width: 40%;
    margin: 3rem auto;
    background-color: #fff;
    border-radius: 0.3rem;
    box-shadow: 0.1rem 0.3rem 0.3rem #8d8d8d;
    text-align: center;
    padding: 2rem;
}

.register-title {
    font-size: xx-large;
    margin-bottom: 1rem;
}

.register-item {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
}

.item-icon {
    width: 10%;
    margin-right: 1rem;
}

.item-input {
    border: none;
    border-bottom: 0.1rem solid #000;
    font-size: larger;
    padding-top: 1rem;
}

.item-input:focus-visible {
    outline: 0;
}

.register-button {
    background-color: #A9F8FF;
    border: none;
    border-radius: 1rem;
    box-shadow: 0.1rem 0.2rem 0.2rem #8d8d8d;
    font-size: x-large;
    padding: 0.3rem 5rem;
    margin-top: 1rem;
    cursor: pointer;
}

.error {
    color: #FF0202;
}
</style>